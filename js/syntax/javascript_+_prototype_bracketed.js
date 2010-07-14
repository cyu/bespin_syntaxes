"define metadata";
({
    "description": "Prototype & Script.aculo.us (JavaScript) Bracketed syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "Prototype & Script.aculo.us (JavaScript) Bracketed",
            "pointer": "#Prototype & Script.aculo.us (JavaScript) BracketedSyntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "conditional-compilation": {
    "patterns": [
      {
        "name": "comment.block.conditional.js",
        "begin": "/\\*(?=@)",
        "captures": {
          "0": {
            "name": "punctuation.definition.comment.js"
          }
        },
        "end": "(?<=@)\\*/",
        "patterns": [
          {
            "include": "$base"
          }
        ]
      },
      {
        "name": "keyword.control.conditional.js",
        "captures": {
          "1": {
            "name": "punctuation.definition.keyword.js"
          }
        },
        "match": "(@)(if|elif|else|end)"
      },
      {
        "name": "keyword.operator.conditional.js",
        "captures": {
          "1": {
            "name": "punctuation.definition.keyword.js"
          }
        },
        "match": "(@)(cc_on|set)"
      },
      {
        "name": "variable.other.conditional.js",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.js"
          }
        },
        "match": "(@)(_win32|_win16|_mac|_alpha|_x86|_mc680x0|_PowerPC|_jscript_build|_jscript_version|_jscript|_debug|_fast|[a-zA-Z]\\w+)"
      }
    ]
  },
  "round-brackets": {
    "patterns": [
      {
        "name": "meta.group.braces.curly.function.js.prototype",
        "begin": "(?<=\\))\\s*+(\\{)",
        "captures": {
          "1": {
            "name": "punctuation.section.function.js.prototype"
          },
          "2": {
            "name": "punctuation.separator.objects.js.prototype"
          }
        },
        "end": "(\\})(,)?\\s*",
        "patterns": [
          {
            "include": "$base"
          }
        ]
      },
      {
        "name": "meta.group.braces.curly",
        "begin": "(\\{)",
        "captures": {
          "1": {
            "name": "punctuation.section.scope.js"
          },
          "2": {
            "name": "punctuation.separator.objects.js.prototype"
          }
        },
        "end": "(\\})(,)?\\s*",
        "patterns": [
          {
            "captures": {
              "1": {
                "name": "invalid.illegal.delimiter.object.comma.js"
              }
            },
            "match": "(,)\\s*+(?=\\})"
          },
          {
            "captures": {
              "1": {
                "name": "string.quoted.double.js.prototype"
              },
              "2": {
                "name": "punctuation.definition.string.js.prototype"
              },
              "3": {
                "name": "constant.other.object.key.js.prototype"
              },
              "4": {
                "name": "punctuation.definition.string.js.prototype"
              },
              "5": {
                "name": "punctuation.separator.objects.js.prototype"
              }
            },
            "match": "((\")([^\"]*)(\")\\s*)(:)\\s*+(?!function)"
          },
          {
            "captures": {
              "1": {
                "name": "string.quoted.single.js.prototype"
              },
              "2": {
                "name": "punctuation.definition.string.js.prototype"
              },
              "3": {
                "name": "constant.other.object.key.js.prototype"
              },
              "4": {
                "name": "punctuation.definition.string.js.prototype"
              },
              "5": {
                "name": "punctuation.separator.objects.js.prototype"
              }
            },
            "match": "((')([^']*)(')\\s*)(:)\\s*+(?!function)"
          },
          {
            "captures": {
              "1": {
                "name": "constant.other.object.key.js.prototype"
              },
              "2": {
                "name": "punctuation.separator.objects.js.prototype"
              }
            },
            "match": "\\b(\\w+\\b\\s*)(:)\\s*+(?!function)"
          },
          {
            "include": "$base"
          }
        ]
      },
      {
        "name": "meta.group.braces.round",
        "begin": "(\\()(?!\\))",
        "captures": {
          "1": {
            "name": "punctuation.section.scope.js"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "include": "$base"
          }
        ]
      },
      {
        "name": "meta.group.braces.square",
        "begin": "(\\[)(?!\\])",
        "captures": {
          "1": {
            "name": "punctuation.section.scope.js"
          }
        },
        "end": "(\\])",
        "patterns": [
          {
            "include": "$base"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.source.embedded.return-value",
    "begin": "<%=",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.js"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.js"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "source.ruby.rails.embedded.html",
        "begin": "(?<=<%=)",
        "end": "(?=%>)",
        "patterns": [
          {
            "include": "source.ruby.rails"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.source.embedded",
    "begin": "<%(?![=#])",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.js"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.js"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "source.ruby.rails.embedded.html",
        "begin": "(?<=<%)",
        "end": "(?=%>)",
        "patterns": [
          {
            "include": "source.ruby.rails"
          }
        ]
      }
    ]
  },
  {
    "include": "#conditional-compilation"
  },
  {
    "include": "#round-brackets"
  },
  {
    "include": "source.js.prototype"
  }
];

exports.Prototype & Script.aculo.us (JavaScript) BracketedSyntax = new TextmateSyntax(repositories, patterns);
