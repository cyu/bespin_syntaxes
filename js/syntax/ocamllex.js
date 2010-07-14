"define metadata";
({
    "description": "OCamllex syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "mll",
            "pointer": "#OCamllexSyntax",
            "fileexts": [
  "mll"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "actions": {
    "patterns": [
      {
        "name": "meta.action.ocamllex",
        "begin": "[^\\']({)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.action.end.ocamllex"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.action.begin.ocamllex"
          }
        },
        "end": "(})",
        "patterns": [
          {
            "include": "source.ocaml"
          }
        ]
      }
    ]
  },
  "comments": {
    "patterns": [
      {
        "name": "comment.block.ocaml",
        "captures": {
          "1": {
            "name": "comment.block.empty.ocaml"
          },
          "2": {
            "name": "comment.block.empty.ocaml"
          }
        },
        "match": "\\(\\*(?:(\\*)| ( )\\*)\\)"
      },
      {
        "name": "comment.block.ocaml",
        "begin": "\\(\\*",
        "end": "\\*\\)",
        "patterns": [
          {
            "include": "#comments"
          }
        ]
      },
      {
        "name": "comment.block.string.quoted.double.ocaml",
        "begin": "(?=[^\\\\])(\")",
        "end": "\"",
        "patterns": [
          {
            "name": "comment.block.string.constant.character.escape.ocaml",
            "match": "\\\\(x[a-fA-F0-9][a-fA-F0-9]|[0-2]\\d\\d|[bnrt'\"\\\\])"
          }
        ]
      }
    ]
  },
  "match-patterns": {
    "patterns": [
      {
        "name": "meta.pattern.sub-pattern.ocamllex",
        "begin": "(\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.sub-pattern.end.ocamllex"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.sub-pattern.begin.ocamllex"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "include": "#match-patterns"
          }
        ]
      },
      {
        "name": "entity.name.type.pattern.reference.stupid-goddamn-hack.ocamllex",
        "match": "[a-z][a-zA-Z0-9'_]"
      },
      {
        "name": "keyword.other.pattern.ocamllex",
        "match": "\\bas\\b"
      },
      {
        "name": "constant.language.eof.ocamllex",
        "match": "eof"
      },
      {
        "name": "constant.language.universal-match.ocamllex",
        "match": "_"
      },
      {
        "name": "meta.pattern.character-class.ocamllex",
        "begin": "(\\[)(\\^?)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.character-class.end.ocamllex"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.character-class.begin.ocamllex"
          },
          "2": {
            "name": "punctuation.definition.character-class.negation.ocamllex"
          }
        },
        "end": "(])(?!\\')",
        "patterns": [
          {
            "name": "punctuation.separator.character-class.range.ocamllex",
            "match": "-"
          },
          {
            "include": "#chars"
          }
        ]
      },
      {
        "name": "keyword.operator.pattern.modifier.ocamllex",
        "match": "\\*|\\+|\\?"
      },
      {
        "name": "keyword.operator.pattern.alternation.ocamllex",
        "match": "\\|"
      },
      {
        "include": "#chars"
      },
      {
        "include": "#strings"
      }
    ]
  },
  "strings": {
    "patterns": [
      {
        "name": "string.quoted.double.ocamllex",
        "begin": "(?=[^\\\\])(\")",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.ocaml"
          }
        },
        "end": "(\")",
        "patterns": [
          {
            "name": "punctuation.separator.string.ignore-eol.ocaml",
            "match": "\\\\$[ \\t]*"
          },
          {
            "name": "constant.character.string.escape.ocaml",
            "match": "\\\\(x[a-fA-F0-9][a-fA-F0-9]|[0-2]\\d\\d|[bnrt'\"\\\\])"
          },
          {
            "name": "constant.character.regexp.escape.ocaml",
            "match": "\\\\[\\|\\(\\)1-9$^.*+?\\[\\]]"
          },
          {
            "name": "invalid.illegal.character.string.escape",
            "match": "\\\\(?!(x[a-fA-F0-9][a-fA-F0-9]|[0-2]\\d\\d|[bnrt'\"\\\\]|[\\|\\(\\)1-9$^.*+?\\[\\]]|$[ \\t]*))(?:.)"
          }
        ]
      }
    ]
  },
  "chars": {
    "patterns": [
      {
        "name": "constant.character.ocamllex",
        "captures": {
          "1": {
            "name": "punctuation.definition.char.begin.ocamllex"
          },
          "4": {
            "name": "punctuation.definition.char.end.ocamllex"
          }
        },
        "match": "(')([^\\\\]|\\\\(x[a-fA-F0-9][a-fA-F0-9]|[0-2]\\d\\d|[bnrt'\"\\\\]))(')"
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.embedded.ocaml",
    "begin": "^\\s*({)",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.embedded.ocaml.end.ocamllex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.embedded.ocaml.begin.ocamllex"
      }
    },
    "end": "^\\s*(})",
    "patterns": [
      {
        "include": "source.ocaml"
      }
    ]
  },
  {
    "name": "meta.pattern-definition.ocaml",
    "begin": "\\b(let)\\s+([a-z][a-zA-Z0-9'_]*)\\s+=",
    "beginCaptures": {
      "1": {
        "name": "keyword.other.pattern-definition.ocamllex"
      },
      "2": {
        "name": "entity.name.type.pattern.stupid-goddamn-hack.ocamllex"
      }
    },
    "end": "^(?:\\s*let)|(?:\\s*(rule|$))",
    "patterns": [
      {
        "include": "#match-patterns"
      }
    ]
  },
  {
    "name": "meta.pattern-match.ocaml",
    "begin": "(rule|and)\\s+([a-z][a-zA-Z0-9_]*)\\s+(=)\\s+(parse)(?=\\s*$)|((?<!\\|)(\\|)(?!\\|))",
    "endCaptures": {
      "3": {
        "name": "keyword.other.entry-definition.ocamllex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.ocamllex"
      },
      "2": {
        "name": "entity.name.function.entrypoint.ocamllex"
      },
      "3": {
        "name": "keyword.operator.ocamllex"
      },
      "4": {
        "name": "keyword.other.ocamllex"
      },
      "5": {
        "name": "punctuation.separator.match-pattern.ocamllex"
      }
    },
    "end": "(?:^\\s*((and)\\b|(?=\\|)|$))",
    "patterns": [
      {
        "include": "#match-patterns"
      },
      {
        "include": "#actions"
      }
    ]
  },
  {
    "include": "#strings"
  },
  {
    "include": "#comments"
  },
  {
    "name": "keyword.operator.symbol.ocamllex",
    "match": "="
  },
  {
    "name": "meta.paren-group.ocamllex",
    "begin": "\\(",
    "end": "\\)",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "invalid.illegal.unrecognized-character.ocamllex",
    "match": "(’|‘|“|”)"
  }
];

exports.OCamllexSyntax = new TextmateSyntax(repositories, patterns);
