var SC = require('sproutcore/runtime').SC;
var Promise = require('bespin:promise').Promise;

/**
 * @class
 *
 * This syntax controller exposes an extended version of Bespin's simple regex- and line-based parser.
 */
exports.ExtendedSyntax = SC.Object.extend({
    _stickySupported: null,

    _parseActions: function(actions) {
        if (SC.none(actions)) {
            return [];
         }

        return actions.split(" ").map(function(action) {
            var parts = action.split(":");
            return parts.length === 1 ? [ 'transition', parts[0] ] : parts;
        });
    },

    _transition: function(range, state) {
        var newState = state;
        range.actions.forEach(function(action) {
            if (action[0] === 'transition') {
                newState = action[1];
            }
        });

        return newState;
    },

    _findNode: function(state, parent) {
        var found = null;

        if (state[0] == 'start') {
            found = { patterns: this.get("patterns") };

        } else {
            if (SC.none(parent)) {
                parent = { patterns: this.get("patterns") };
            }

            for (var i = 0; i < parent.patterns.length; i++) {
                if (parent.patterns[i].name == state[0]) {
                    found = parent.patterns[i];
                    break;
                }
            }
        }

        if (found != null && state.length > 1) {
            state.splice(0,1);
            return this._findNode(state, found);
        }

        return found;
    },

    _initNode: function(n, stickySupported) {
        var regexes = [ n.match, n.begin, n.end ];
        for (var j = 0; j < regexes.length; j++) {
            var regex = regexes[j];
            if (regex) {
                if (stickySupported === null) {
                    stickySupported = regex.sticky !== undefined;
                }

                if (stickySupported) {
                    regex.sticky = true;
                }
            }
        }

        if (n.patterns !== undefined) {
            for (var j = 0; j < n.patterns.length; j++) {
                this._initNode(n.patterns[j]);
            }
        }

        return stickySupported;
    },

    patterns: null,
    repository: null,

    init: function() {
        var stickySupported = null;

        // Set the sticky flag on the regexes, if we can.
        var nodes = this.get('patterns');
        for (var i = 0; i < nodes.length; i++) {
            stickySupported = this._initNode(nodes[i], stickySupported);
        }

        this._stickySupported = stickySupported;
    },

    syntaxInfoForLineFragment: function(context, state, line, start, end) {
        if (end !== null && end < line.length) {
            line = line.substring(0, end);
        }

        var promise = new Promise();
        var attrs = [];
        var stickySupported = this._stickySupported;
        var column = start;

        while (column !== line.length) {
            var str = stickySupported ? line : line.substring(column);

            var node = this._findNode(state.split(':'));
            if (node == null) {
                throw new Error("StandardSyntax: no such states '%@'".
                    fmt(state));
            }

            var range = { start: column, state: state };
            var newState;

            for (var i = 0; i < node.patterns.length; i++) {
                var pattern = node.patterns[i];

                if (pattern.match) {
                    var match = pattern.match;

                    if (stickySupported) {
                        match.lastIndex = column;
                    }

                    var result = match.exec(str);
                    if (result === null) {
                        continue;
                    }

                    if (column != result.index) {
                        attrs.push({
                            start:      column,
                            end:        result.index,
                            state:      state,
                            tag:        node.name,
                            actions:    []
                        });
                    }

                    range.start   = result.index;
                    range.end     = result.index;
                    range.state   = state;
                    range.actions = [];

                    if (node.captures) {
                        if (node.captures['0']) {
                            range.end = result.index + result[0].length;
                            range.tag = node.captures['0'].name;

                        } else {
                            for (var j = 1; j < result.length; j++) {
                                var cap = node.captures[String(j)];
                                if (cap) {
                                    var group     = result[j];
                                    var groupIdx  = result[0].indexOf(group);
                                    attrs.push({
                                        start:      result.index + groupIdx,
                                        end:        result.index + groupIdx + group.length,
                                        state:      state,
                                        tag:        cap.name,
                                        actions:    []
                                    });
                                }
                            }
                        }
                    }

                    if (range.tag === undefined) {
                        range.tag = node.name;
                        range.end = range.start + result[0].length;
                    }

                    range.actions = this._parseActions(alt.then);
                }     else { // begin/end patterns
                        range.tag = alt.name;
                    }
                

                

                

                newState = this._transition(range, state);

                if (resultLength === 0 && newState === state) {
                    // Emit a helpful diagnostic rather than going into an
                    // infinite loop, to aid syntax writers...
                    throw new Error("Syntax regex matches the empty " +
                        "string and the state didn't change: " + regex.
                        toSource());
                }

                state = newState;
                break;
            }

            if (range.tag === undefined) {
                // The (inefficient) default case.
                range.end = column + 1;
                range.tag = 'plain';
                range.actions = [];
            }

            if (range.start !== range.end) {
                // Only push the range if it spans at least one character.
                attrs.push(range);
            }

            column = range.end;
        }

        if (end === null) {
            // Style the newline.
            attrs.push({
                start:      column,
                end:        null,
                state:      state,
                tag:        'plain',
                actions:    []
            });
        }

        var next = { context: context, state: state };
        promise.resolve({ attrs: attrs, next: next });
        return promise;
    }
});

