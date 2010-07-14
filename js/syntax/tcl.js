"define metadata";
({
    "description": "Tcl syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "tcl",
            "pointer": "#TclSyntax",
            "fileexts": [
  "tcl"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "regexp": {
    "comment": "matches a single word, named as a regexp, then swallows the rest of the command",
    "begin": "(?=\\S)(?![\\n;\\]])",
    "end": "(?=[\\n;\\]])",
    "patterns": [
      {
        "name": "string.regexp.tcl",
        "begin": "(?=[^ \\t\\n;])",
        "end": "(?=[ \\t\\n;])",
        "patterns": [
          {
            "include": "#braces"
          },
          {
            "include": "#bare-string"
          },
          {
            "include": "#escape"
          },
          {
            "include": "#variable"
          }
        ]
      },
      {
        "begin": "[ \\t]",
        "comment": "swallow the rest of the command",
        "end": "(?=[\\n;\\]])",
        "patterns": [
          {
            "include": "#variable"
          },
          {
            "include": "#embedded"
          },
          {
            "include": "#escape"
          },
          {
            "include": "#braces"
          },
          {
            "include": "#string"
          }
        ]
      }
    ]
  },
  "bare-string": {
    "comment": "matches a single quote-enclosed word without scoping",
    "begin": "(?:^|(?<=\\s))\"",
    "endCaptures": {
      "1": {
        "name": "invalid.illegal.tcl"
      }
    },
    "end": "\"([^\\s\\]]*)",
    "patterns": [
      {
        "include": "#escape"
      },
      {
        "include": "#variable"
      }
    ]
  },
  "braces": {
    "comment": "matches a single brace-enclosed word",
    "begin": "(?:^|(?<=\\s))\\{",
    "endCaptures": {
      "1": {
        "name": "invalid.illegal.tcl"
      }
    },
    "end": "\\}([^\\s\\]]*)",
    "patterns": [
      {
        "name": "constant.character.escape.tcl",
        "match": "\\\\[{}\\n]"
      },
      {
        "include": "#inner-braces"
      }
    ]
  },
  "escape": {
    "name": "constant.character.escape.tcl",
    "match": "\\\\(\\d{1,3}|x[a-fA-F0-9]+|u[a-fA-F0-9]{1,4}|.|\\n)"
  },
  "inner-braces": {
    "comment": "matches a nested brace in a brace-enclosed word",
    "begin": "\\{",
    "end": "\\}",
    "patterns": [
      {
        "name": "constant.character.escape.tcl",
        "match": "\\\\[{}\\n]"
      },
      {
        "include": "#inner-braces"
      }
    ]
  },
  "string": {
    "comment": "matches a single quote-enclosed word with scoping",
    "begin": "(?:^|(?<=\\s))(?=\")",
    "name": "string.quoted.double.tcl",
    "applyEndPatternLast": 1,
    "end": "",
    "patterns": [
      {
        "include": "#bare-string"
      }
    ]
  },
  "embedded": {
    "begin": "\\[",
    "name": "source.tcl.embedded",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.tcl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.tcl"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "source.tcl"
      }
    ]
  },
  "variable": {
    "name": "variable.other.tcl",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.tcl"
      }
    },
    "match": "(\\$)([a-zA-Z0-9_:]+(\\([^\\)]+\\))?|\\{[^\\}]*\\})"
  }
};

var patterns = [
  {
    "begin": "(?<=^|;)\\s*((#))",
    "beginCaptures": {
      "1": {
        "name": "comment.line.number-sign.tcl"
      },
      "2": {
        "name": "punctuation.definition.comment.tcl"
      }
    },
    "end": "\\n",
    "contentName": "comment.line.number-sign.tcl",
    "patterns": [
      {
        "match": "(\\\\\\\\|\\\\\\n)"
      }
    ]
  },
  {
    "captures": {
      "1": {
        "name": "keyword.control.tcl"
      }
    },
    "match": "(?<=^|[\\[{;])\\s*(if|while|for|catch|return|break|continue|switch|exit|foreach)\\b"
  },
  {
    "captures": {
      "1": {
        "name": "keyword.control.tcl"
      }
    },
    "match": "(?<=^|})\\s*(then|elseif|else)\\b"
  },
  {
    "captures": {
      "1": {
        "name": "keyword.other.tcl"
      },
      "2": {
        "name": "entity.name.function.tcl"
      }
    },
    "match": "^\\s*(proc)\\s+([^\\s]+)"
  },
  {
    "captures": {
      "1": {
        "name": "keyword.other.tcl"
      }
    },
    "match": "(?<=^|[\\[{;])\\s*(after|append|array|auto_execok|auto_import|auto_load|auto_mkindex|auto_mkindex_old|auto_qualify|auto_reset|bgerror|binary|cd|clock|close|concat|dde|encoding|eof|error|eval|exec|expr|fblocked|fconfigure|fcopy|file|fileevent|filename|flush|format|gets|glob|global|history|http|incr|info|interp|join|lappend|library|lindex|linsert|list|llength|load|lrange|lreplace|lsearch|lset|lsort|memory|msgcat|namespace|open|package|parray|pid|pkg::create|pkg_mkIndex|proc|puts|pwd|re_syntax|read|registry|rename|resource|scan|seek|set|socket|SafeBase|source|split|string|subst|Tcl|tcl_endOfWord|tcl_findLibrary|tcl_startOfNextWord|tcl_startOfPreviousWord|tcl_wordBreakAfter|tcl_wordBreakBefore|tcltest|tclvars|tell|time|trace|unknown|unset|update|uplevel|upvar|variable|vwait)\\b"
  },
  {
    "begin": "(?<=^|[\\[{;])\\s*(regexp|regsub)\\b\\s*",
    "comment": "special-case regexp/regsub keyword in order to handle the expression",
    "beginCaptures": {
      "1": {
        "name": "keyword.other.tcl"
      }
    },
    "end": "[\\n;\\]]",
    "patterns": [
      {
        "name": "constant.character.escape.tcl",
        "match": "\\\\(?:.|\\n)"
      },
      {
        "comment": "switch for regexp",
        "match": "-\\w+\\s*"
      },
      {
        "begin": "--\\s*",
        "comment": "end of switches",
        "applyEndPatternLast": 1,
        "end": "",
        "patterns": [
          {
            "include": "#regexp"
          }
        ]
      },
      {
        "include": "#regexp"
      }
    ]
  },
  {
    "include": "#escape"
  },
  {
    "include": "#variable"
  },
  {
    "name": "string.quoted.double.tcl",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.tcl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.tcl"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#escape"
      },
      {
        "include": "#variable"
      },
      {
        "include": "#embedded"
      }
    ]
  }
];

exports.TclSyntax = new TextmateSyntax(repositories, patterns);
