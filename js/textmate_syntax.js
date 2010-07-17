"define metadata";
({
    "description": "Create syntaxes based off of Textmate syntax files",
    "environments": { "worker": true },
    "dependencies": { 
        "syntax_directory": "0.0.0", 
        "underscore": "0.0.0",
        "syntax_worker": "0.0.0"
    }
})
"end";

var promise = require('bespin:promise');
var _ = require('underscore')._;
var console = require('bespin:console').console;
var syntaxDirectory = require('syntax_directory').syntaxDirectory;

var RegExp2 = function(pattern) {
    this._filters = [];
    this._source  = pattern;

    // free-spacing mode
    if (this._source.match(/^\(\?x\)/)) {
        this._source = this._source.substring('(?x)'.length);
        this._source = _(this._source.split(/$/m)).map((function(l){
            var cur = -1;
            while ((cur = l.indexOf('#', cur + 1)) >= 0) {
                if (!this._isEscaped(l, cur)) {
                    l = l.substring(0, cur);
                    break;
                }
            }
            var m = l.match(/^\s*(.*?)\s*$/);
            return m ? m[1] : l;
        }).bind(this)).join('');

        var re = /\s+|\[|\]/g;
        re.lastIndex = 0;
        var charClass = false; var m;
        while (m = re.exec(this._source)) {
            if (m[0] == '[') {
                if (!this._isEscaped(this._source, m.index))
                    charClass = true;

            } else if (m[0] == ']') {
                if (!this._isEscaped(this._source, m.index))
                    charClass = false;                
 
            } else {
                if (this._isEscaped(this._source, m.index)) {
                    this._source = this._source.substring(0, m.index) + m[0].charAt(0) +
                            this._source.substring(m.index+1);
                
                } else if (!charClass) {
                    this._source = this._source.substring(0, m.index) + this._source.substring(m.index+1);
                }
            }
        }
    }

    // negative lookbehinds
    this._applyFilter('?<!', {
        capture: false,
        rewriteGroup: function(subPattern) { return '('+subPattern+')?'; },
        exec: function(m, groupNum) { return m[groupNum] ? null : m; }
    });

    // positive lookbehinds
    this._applyFilter('?<=', {
        capture: false,
        exec: function(m, groupNum) {
            if (m[groupNum] != null) {
                var newMatch = m.slice();
                newMatch[0] = m[0].substring(m[groupNum].length)
                newMatch.index = m.index + m[groupNum].length;
                m = newMatch;
            }
            return m;
        }
    });

    // case insensitivity modifier
    this._applyFilter('?i:'); // TODO: perform case-insensitivity match

    // atomic groups
    this._applyFilter('?>');

    /*if (this._source != pattern)
        console.debug('translated pattern: ' + this._source);
    if (this._filters.length > 0)
        console.debug('lookarounds: ' + JSON.stringify(this._filters));*/
    
    this._filters.sort(function(a,b){ return a.group - b.group; });
    this._re = new RegExp(this._source);
};

RegExp2.prototype = {
    exec: function(str) {
        var m = this._re.exec(str);
        if (m) {
            if (this._filters.length > 0) {
                var nonCaptures = 0;
                for (var i=0; i<this._filters.length; i++) {
                    var filter = this._filters[i];

                    if ((filter.group - nonCaptures) >= m.length)
                        console.error('no group $' + (filter.group - nonCaptures) + ': ' + this._source + ' = ' + JSON.stringify(m));

                    if (filter.exec) {
                        try {
                            m = filter.exec(m, filter.group - nonCaptures);
                        } catch (e) {
                            console.error('error applying processing filter: $' +
                                    (filter.group - nonCaptures) + ', ' + this._source);
                        }
                    }

                    if (!m) {
                        break;

                    } else if (!filter.capture) {
                        m.splice(filter.group - nonCaptures, 1);
                        nonCaptures++;
                    }
                }
            }
        }
        return m;
    },

    _applyFilter: function(prefix, opts) {
        if (typeof opts === 'undefined') opts = {};
        opts = _({capture:true}).extend(opts);

        var prefixIdx = this._source.indexOf(prefix);
        if (prefixIdx < 0) return;

        var group = 0;
        var re = /\((?!(\?:|\?!|\?=))/g;
        re.lastIndex = 0;
        var m = re.exec(this._source);
        while (m) {
            var prefixGroup = (m.index == (prefixIdx - 1));
            if (!this._isEscaped(this._source, m.index)) {
                group++;
                if (prefixGroup) {
                    var end = this._findGroupTerminator(this._source, prefixIdx + prefix.length);
                    
                    var sourceRewrite = [this._source.substring(0, m.index)];
                    var subPattern = this._source.substring(prefixIdx + prefix.length, end);
                    sourceRewrite.push(opts.rewriteGroup ? opts.rewriteGroup(subPattern) : '('+subPattern+')');
                    sourceRewrite.push(this._source.substring(end + 1));
                    this._source = sourceRewrite.join('');

                    this._filters.push({ group:group, exec:opts.exec, capture:opts.capture });
                }
            }
            if (prefixGroup) {
                prefixIdx = this._source.indexOf(prefix, prefixIdx + 1);
                if (prefixIdx < 0) return;
            }

            m = re.exec(this._source);
        }
    },

    _findGroupTerminator: function(str, from) {
        var pos = from + 1;
        var subGroups = 0;
        while (pos < str.length) {
            if (str.charAt(pos) == '(' && !this._isEscaped(str, pos)) {
                subGroups++;
            } else if (str.charAt(pos) == ')' && !this._isEscaped(str, pos)) {
                if (subGroups > 0)
                    subGroups--;
                else
                    break;
            }
            pos++;
        }

        return pos;
    },

    _isEscaped:function(str, from) {
        var cur = from - 1;
        var slashCount = 0;
        while (cur >= 0 && str.charAt(cur--) == '\\')
            slashCount++;
        return (slashCount % 2) == 1;
    }
};

Object.defineProperties(RegExp2.prototype, {
    global: {
        get: function() {
            return this._re.global;
        },
        set: function(v) {
            this._re.global = v;
        }
    },
    ignoreCase: {
       	get: function() {
       	    return this._re.ignoreCase;
       	},
        set: function(v) {
            this._re.ignoreCase = v;
        }
    },
    lastIndex: {
        get: function() {
            return this._re.lastIndex;
        },
        set: function(v) {
            this._re.lastIndex = v;
        }
    },
    multiline: {
        get: function() {
            return this._re.multiline;
        },
        set: function(v) {
            this._re.multiline = v;
        }
    }
});

var State = function(stack) {
    this._stack = stack;
};

State.parse = function(stateString) {
    return new State(stateString.split(':'));
};

State.prototype = {
    parent:function() {
        return new State(this._stack.slice(0, this._stack.length - 1));
    },
    newState:function(newStateValue) {
        var newState = this.parent();
        newState._stack.push(newStateValue);
        return newState;
    },
    nextState:function(nextStateValue) {
        if (this.isStartState())
            return new State([nextStateValue]);

        var state = new State(this._stack.slice());
        state._stack.push(nextStateValue);
        return state;
    },
    current:function() {
        return (this._stack.length > 0) ? this._stack[this._stack.length - 1] : 'start';
    },
    isCaptureState:function() {
        return this.current().charAt(0) == '$';
    },
    isStartState:function() {
        return this.current() == 'start';
    },
    toString:function() {
        var s = this._stack.join(':');
        return (s == '') ? 'start' : s;
    }
};

var Segment = function(fullState, line, col) {
    this.fullState = fullState;
    this.line = line;
    this.col = col;
    this.context = fullState[0];
    this.state = State.parse(fullState[1]);
    this.str = line.substring(col); // TODO: sticky flag where available

    var m = this.str.match(/[^\s]/);
    this.wordBegin = m ? m.index : 0;
};

var CapturesMatch = function(name, end, captures) {
    this.name = name;
    this.end = end;
    this.captures = captures;    
};

CapturesMatch.prototype = {
    nextState:function(segment) {
        var output = _(this.captures).map(function(v){
            return [v.tag, v.index, v.end].join(',');
        });

        output.unshift((this.name ? this.name : '') + ',' + this.end);
        
        return segment.state.newState('$' + output.join('|'));
    }
};

exports.TextmateSyntax = function(repositories, patterns) {
    this.repositories = repositories;
    this.patterns = patterns;

    this._lookups = {};
    _(this.patterns).each(function(pattern) {
        var lookupName = pattern.hasOwnProperty('name') ? pattern.name : '__anonymous';
        var lookup = this._lookups[lookupName];
        if (lookup) {
            if (!_.isArray(lookup)) {
                lookup._path = lookupName + '[0]';
                this._lookups[lookupName] = lookup = [lookup];
            }
            pattern._path = lookupName + '[' + lookup.length + ']';
            lookup.push(pattern);
        } else {
            this._lookups[lookupName] = pattern;
        }
    }, this);
};

/** This syntax controller exposes a simple regex- and line-based parser. */
exports.TextmateSyntax.prototype = {
    _tagMappings: [
        [/^(comment\.|punctuation\.definition\.comment\.)/, 'comment'],
        [/^(keyword\.|variable\.language\.|constant\.language\.)/, 'keyword'],
        [/^(string\.|punctuation.definition.string\.)/, 'string']
    ],

    get: function(fullState, line, col) {
        var seg = new Segment(fullState, line, col);
        var token = { start: col, state: fullState };
        var result = null;

        //console.debug('line fragment: ' + seg.str + ', fullState: ' + JSON.stringify(fullState));
        if (seg.state.isStartState()) {
            result = this._processPatterns(this.patterns, seg, token);

        } else if (seg.state.isCaptureState()) {
            var splitData = seg.state.current().substring(1).split('|');
            var nameEnd = splitData.shift().split(',');
            var captures = _(splitData).map(function(v){
                var arr = v.split(',');
                return {
                    tag: arr[0],
                    index: arr[1],
                    end: arr[2]
                };
            });
            var capturesMatch = new CapturesMatch(
                nameEnd[0] == '' ? null : nameEnd[0],
                Number(nameEnd[1]), captures);
            
            var captureResult = this._processCaptures(capturesMatch, seg, token);
            result = { state: [ seg.context, captureResult.nextState.toString() ], token: token };

        } else {
            var pattern = this._lookupPattern(seg.state);
            if (pattern) {
                if (pattern.hasOwnProperty('end')) {
                    var regex = this._regex(pattern, 'end');
                    var match = regex.exec(seg.str);
                    //console.debug('  > end: ' + pattern.name + ' ' + JSON.stringify(pattern.patterns));
                    if (!match || match.index > seg.wordBegin) {
                        if (pattern.hasOwnProperty('patterns')) {
                            var subpatterns = _(pattern.patterns).chain().map(function(pattern, index){
                                if (pattern.hasOwnProperty('include')) {
                                    if (pattern.include == '$base' || pattern.include == '$self')
                                        return this.patterns;
                                    else {
                                        var repoName = pattern.include.substring(1);
                                        var repo = this.repositories[repoName];
                                        if (!repo._processed) {
                                            if (repo.hasOwnProperty('patterns')) {
                                                _(repo.patterns).each(function(v, i){
                                                    v._path = repoName + '@' + i;
                                                });
                                            }
                                            repo._processed = true;
                                        }
                                        
                                        if (repo.hasOwnProperty('patterns') &&
                                                    !repo.hasOwnProperty('match') &&
                                                    !repo.hasOwnProperty('begin')) {
                                            return repo.patterns;
                                        } else {
                                            repo._path = repoName + '@';
                                        }
                                        return repo;
                                    }
                                } else {
                                    if (!pattern._processed) {
                                        pattern._path = '[' + index + ']';
                                        pattern._processed = true;
                                    }
                                    return pattern;
                                }
                            }, this).flatten().value();
                            result = this._processPatterns(subpatterns, seg, token);

                        } else if (pattern.hasOwnProperty('contentName')) {
                            token.end = seg.col + (match ? match.index : seg.str.length);
                            token.tag = pattern.contentName;
                            result = { state: seg.fullState, token: token };
                        }
                    }
                } else {
                    console.error('no end regex found for nested state: ' + JSON.stringify(pattern));
                }
            } else {
                console.error('pattern not found for nested state: ' + seg.state.current());
            }

            if (!result && match) {
                var len = match[0].length;
                token.end = col + match.index + len;
                if (pattern.hasOwnProperty('endCaptures')) {
                    token.tag = pattern.endCaptures.hasOwnProperty('1') ?
                            pattern.endCaptures['1'].name : pattern.endCaptures['0'].name;
                } else {
                    token.tag = pattern.name;
                }

                result = { state: [ seg.context, seg.state.parent().toString() ], token: token };
            }
        }

        if (result && result.token && result.token.tag) {
            var tag = result.token.tag;
            for (var i=0; i<this._tagMappings.length; i++) {
                if (tag.match(this._tagMappings[i][0])) {
                    result.token.tag = this._tagMappings[i][1];
                    break;
                }
            }
            
            if (tag == result.token.tag) result.token.tag = 'plain';
            
            /*var debug = [
                line.substring(result.token.start, result.token.end),
                result.token.tag, tag, result.state[1]
            ];
            console.debug(JSON.stringify(debug));*/
        }

        return result;
    },

    _lookupPattern:function(state) {
        var patternPath = state.current().split('@');
        if (patternPath.length > 1) { // repository pattern
            var repo = this.repositories[patternPath[0]];
            return (patternPath[1] == '') ? repo : repo.patterns[Number(patternPath[1])];
        }
        
        var arrayMatch = patternPath[0].match(/^(.*?)\[(\d+)\]/);
        if (arrayMatch) {
            if (arrayMatch[1] == '') {
                var parentPattern = this._lookupPattern(state.parent());
                return parentPattern.patterns[arrayMatch[2]];
            } else {
                return this._lookups[arrayMatch[1]][Number(arrayMatch[2])];
            }
        }

        return this._lookups[patternPath[0]];
    },

    _closestStartPattern:function(patterns, seg) {
        var closest = null;
        _(patterns).each(function(pattern) {
            var regex = null;
            if (pattern.hasOwnProperty('match'))
                regex = this._regex(pattern, 'match');
            else if (pattern.hasOwnProperty('begin'))
                regex = this._regex(pattern, 'begin');

            if (regex) {
                var match = regex.exec(seg.str);
                if (match != null) {
                    if (match.index <= seg.wordBegin) {
                        closest = { pattern: pattern, match: match };
                        _.breakLoop();
    
                    } else if (closest == null || match.index < closest.match.index) {
                        closest = { pattern: pattern, match: match };
                    }
                }
            }
        }, this);

        return closest;
    },

    _processPatterns:function(patterns, seg, token) {
        var result, nextState = null;
        var closest = this._closestStartPattern(patterns, seg);

        if (closest != null) {        
            var pattern = closest.pattern;
            var match = closest.match;
    
            if (match.index > seg.wordBegin) {
                token.end = seg.col + match.index;
                token.tag = (seg.state.isStartState()) ? 'plain' : seg.state.current();
    
                result = { state: seg.fullState, token: token };
    
            } else if (pattern.hasOwnProperty('match')) {
                var len = 0;
                if (pattern.hasOwnProperty('captures')) {
                    var captureResult = this._setupCaptures(pattern, 'captures', match, seg, token);
                    len = captureResult.len;
                    nextState = [ seg.context, captureResult.nextState.toString() ];
                    
                } else {
                    len = match[0].length;
                    token.end = seg.col + match.index + len;
                    token.tag = pattern.name;
                }

                if (len == 0)
                    throw new Error("TextmateSyntax: Infinite loop detected: " +
                            "zero-length match that didn't change state");

                if (nextState == null)
                    nextState = seg.fullState;

                result = { state: nextState, token: token };
    
            } else if (pattern.hasOwnProperty('begin')) {
                var regex = this._regex(pattern, 'begin');
    
                var match = regex.exec(seg.str);
                if (match == null || match.index > seg.wordBegin) return;
                //console.debug('  > begin: ' + JSON.stringify(pattern));
                
                var nextState = null;
                if (pattern.hasOwnProperty('beginCaptures')) {
                    var capturesResult = this._setupCaptures(pattern, 'beginCaptures', match, seg, token);
                    nextState = this._nextState(pattern, seg);
                    if (capturesResult.nextState.isCaptureState()) {
                        nextState = nextState.nextState(capturesResult.nextState.current());
                    }

                } else {
                    token.end = seg.col + match.index + match[0].length;

                    if (pattern.hasOwnProperty('captures')) {
                        token.tag = pattern.captures.hasOwnProperty('1') ?
                                pattern.captures['1'].name : pattern.captures['0'].name;
                    } else {
                        token.tag = pattern.name;
                    }

                    nextState = this._nextState(pattern, seg);
                }

                result = { state: [ seg.context, nextState.toString() ], token: token };

            } else {
                console.error('unsupported pattern: ' + JSON.stringify(pattern));
            }
        }
        return result;
    },

    _regex:function(pattern, value) {
        var val = pattern[value];

        if (!val)
            console.error('regex \'' + value + '\' not found in pattern: ' + JSON.stringify(pattern));
        
        if (typeof val.global !== 'undefined')
            return val;
        else
            return pattern[value] = new RegExp2(val);
    },

    _nextState:function(pattern, segment) {
        var nxt = '';
        if (pattern.hasOwnProperty('_path')) {
            nxt = pattern._path;

        } else if (pattern.hasOwnProperty('name')) {
            nxt = pattern.name;

        } else {
            throw new Error('unknown next state: ' + JSON.stringify(pattern));
        }
        
        return segment.state.nextState(nxt);
    },

    _setupCaptures:function(pattern, capturesName, match, segment, token) {
        var pos = 0;
        var captures = _(pattern[capturesName]).
                chain().keys().
                sortBy(function(v){ return Number(v); }).
                map(function(v){
                    var groupNum = Number(v);
                    var capture = pattern[capturesName][v];
                    var index = segment.str.indexOf(match[groupNum], pos);
                    if (index >= 0) {
                        pos = index + match[groupNum].length;
                        return {
                            index: segment.col + index,
                            end: segment.col + index + match[groupNum].length,
                            tag: capture.name
                        };
                    }
                    return null;
                }).compact();

        var capturesMatch = new CapturesMatch(
                pattern.name,
                segment.col + match.index + match[0].length,
                captures.value());

        return this._processCaptures(capturesMatch, segment, token);
    },

    _processCaptures:function(capturesMatch, segment, token) {
        var len, nextState = null;

        if (capturesMatch.captures.length == 0) {
            len = capturesMatch.end - segment.col;
            token.end = capturesMatch.end;
            token.tag = capturesMatch.name ? capturesMatch.name : 'plain';
            nextState = segment.state.parent();

        } else {
            var first = capturesMatch.captures[0];
            if ((first.index - segment.col) <= segment.wordBegin) {
                capturesMatch.captures.shift();
                len = first.end - first.index;
                token.end = first.end;
                token.tag = first.tag;
            
            } else {
                len = first.index - segment.col;
                token.end = segment.col + first.index;
                token.tag = capturesMatch.name ? capturesMatch.name : 'plain';
            }

            if (capturesMatch.captures.length != 0 || token.end < capturesMatch.end) {
                nextState = capturesMatch.nextState(segment);
        
            } else {            
                nextState = segment.state.parent();
            }
        }
        
        return {nextState: nextState, len: len};
    }
};
