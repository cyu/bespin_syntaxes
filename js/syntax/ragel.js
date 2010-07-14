"define metadata";
({
    "description": "Ragel syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "rl",
            "pointer": "#RagelSyntax",
            "fileexts": [
  "rl",
  "ragel"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "regexp": {
    "patterns": [
      {
        "name": "string.regexp.character-class.ragel",
        "begin": "\\[",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.ragel"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.ragel"
          }
        },
        "end": "\\]\\s*[*?]?"
      },
      {
        "name": "string.regexp.classic.ragel",
        "begin": "\\/",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.ragel"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.ragel"
          }
        },
        "end": "\\/\\s*[*?]?"
      }
    ]
  },
  "string_escaped_char": {
    "patterns": [
      {
        "name": "constant.character.escape.ragel",
        "match": "\\\\(\\\\|[abefnprtv'\"?]|[0-3]\\d{,2}|[4-7]\\d?|x[a-fA-F0-9]{,2})"
      },
      {
        "name": "invalid.illegal.unknown-escape.ragel",
        "match": "\\\\."
      }
    ]
  },
  "action_name": {
    "patterns": [
      {
        "name": "entity.name.type.action-reference.ragel",
        "captures": {
          "1": {
            "name": "punctuation.definition.entity.ragel"
          }
        },
        "match": "([@$>%])\\s*([\\w\\d]+)"
      }
    ]
  },
  "comments": {
    "patterns": [
      {
        "name": "comment.line.ragel",
        "begin": "#",
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.comment.ragel"
          }
        },
        "end": "$\\n?"
      }
    ]
  },
  "embedded_code": {
    "patterns": [
      {
        "name": "source.c",
        "begin": "\\{",
        "beginCaptures": {
          "0": {
            "name": "punctuation.section.embedded.c"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "source.c"
          }
        ]
      }
    ]
  },
  "operators": {
    "patterns": [
      {
        "name": "keyword.operator.contatenation.ragel",
        "match": "(\\:\\>\\>?|\\<\\:)"
      }
    ]
  },
  "string_placeholder": {
    "patterns": [
      {
        "name": "constant.other.placeholder.ragel",
        "match": "(?x)%\n\t\t\t\t\t\t(\\d+\\$)?                             # field (argument #)\n\t\t\t\t\t\t[#0\\- +']*                           # flags\n\t\t\t\t\t\t[,;:_]?                              # separator character (AltiVec)\n\t\t\t\t\t\t((-?\\d+)|\\*(-?\\d+\\$)?)?              # minimum field width\n\t\t\t\t\t\t(\\.((-?\\d+)|\\*(-?\\d+\\$)?)?)?         # precision\n\t\t\t\t\t\t(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)? # length modifier\n\t\t\t\t\t\t[diouxXDOUeEfFgGaACcSspn%]           # conversion type\n\t\t\t\t\t"
      },
      {
        "name": "invalid.illegal.placeholder.ragel",
        "match": "%"
      }
    ]
  },
  "source_ragel": {
    "patterns": [
      {
        "include": "#keywords"
      },
      {
        "include": "#regexp"
      },
      {
        "include": "#string"
      },
      {
        "include": "#comments"
      },
      {
        "include": "#embedded_code"
      },
      {
        "name": "meta.function.action.ragel",
        "begin": "(action)\\s+([\\w\\d]+)\\s+({)",
        "endCaptures": {
          "1": {
            "name": "punctuation.section.function.ragel"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.other.action.ragel"
          },
          "2": {
            "name": "entity.name.type.action.ragel"
          },
          "3": {
            "name": "punctuation.section.function.ragel"
          }
        },
        "end": "(})",
        "patterns": [
          {
            "include": "source.c"
          }
        ]
      },
      {
        "name": "meta.machine-definition.ragel",
        "begin": "([\\w\\d]+)\\s*(=)",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.machine-definition.ragel"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "entity.name.type.machine-definition.ragel"
          },
          "2": {
            "name": "punctuation.separator.key-value.ragel"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#regexp"
          },
          {
            "include": "#string"
          },
          {
            "include": "#action_name"
          },
          {
            "include": "#embedded_code"
          },
          {
            "include": "#operators"
          },
          {
            "include": "#comments"
          }
        ]
      },
      {
        "name": "meta.machine-instantiation.ragel",
        "begin": "([\\w\\d]+)\\s*(:=)",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.machine-instantiation.ragel"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "entity.name.type.machine-instantiation.ragel"
          },
          "2": {
            "name": "punctuation.separator.key-value.ragel"
          }
        },
        "end": ";",
        "patterns": [
          {
            "include": "#regexp"
          },
          {
            "include": "#string"
          },
          {
            "include": "#action_name"
          },
          {
            "include": "#embedded_code"
          },
          {
            "include": "#operators"
          },
          {
            "include": "#comments"
          },
          {
            "name": "meta.ragel.longest-match",
            "begin": "\\|\\*",
            "end": "\\*\\|",
            "patterns": [
              {
                "include": "#source_ragel"
              }
            ]
          }
        ]
      }
    ]
  },
  "string": {
    "patterns": [
      {
        "name": "string.quoted.double.ragel",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.ragel"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.ragel"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "include": "#string_escaped_char"
          },
          {
            "include": "#string_placeholder"
          }
        ]
      },
      {
        "name": "string.quoted.single.ragel",
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.ragel"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.ragel"
          }
        },
        "end": "'",
        "patterns": [
          {
            "include": "#string_escaped_char"
          }
        ]
      }
    ]
  },
  "keywords": {
    "patterns": [
      {
        "name": "keyword.other.ragel",
        "match": "\\b(machine|action|context|include|variable|access|write|contained)\\b"
      }
    ]
  }
};

var patterns = [
  {
    "name": "source.ragel",
    "begin": "%%{",
    "captures": {
      "0": {
        "name": "punctuation.section.embedded.ragel"
      }
    },
    "end": "}%%",
    "patterns": [
      {
        "include": "#source_ragel"
      }
    ]
  },
  {
    "name": "source.ragel",
    "begin": "%%$",
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.ragel"
      }
    },
    "end": "$",
    "patterns": [
      {
        "include": "#source_ragel"
      }
    ]
  },
  {
    "name": "support.function.ragel",
    "begin": "%%",
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.ragel"
      }
    },
    "end": "$",
    "patterns": [
      {
        "include": "#keywords"
      }
    ]
  },
  {
    "include": "source.c"
  }
];

exports.RagelSyntax = new TextmateSyntax(repositories, patterns);
