"define metadata";
({
    "description": "OCamlyacc syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "mly",
            "pointer": "#OCamlyaccSyntax",
            "fileexts": [
  "mly"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "rule-patterns": {
    "patterns": [
      {
        "name": "meta.rule-match.ocaml",
        "begin": "((?<!\\||:)(\\||:)(?!\\||:))",
        "beginCaptures": {
          "0": {
            "name": "punctuation.separator.rule.ocamlyacc"
          }
        },
        "end": "\\s*(?=\\||;)",
        "patterns": [
          {
            "include": "#precs"
          },
          {
            "include": "#semantic-actions"
          },
          {
            "include": "#references"
          },
          {
            "include": "#comments"
          }
        ]
      }
    ]
  },
  "semantic-actions": {
    "patterns": [
      {
        "name": "meta.action.semantic.ocamlyacc",
        "begin": "[^\\']({)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.action.semantic.ocamlyacc"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.action.semantic.ocamlyacc"
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
        "name": "comment.block.ocamlyacc",
        "begin": "/\\*",
        "end": "\\*/",
        "patterns": [
          {
            "include": "#comments"
          }
        ]
      },
      {
        "name": "comment.block.string.quoted.double.ocamlyacc",
        "begin": "(?=[^\\\\])(\")",
        "end": "\"",
        "patterns": [
          {
            "name": "comment.block.string.constant.character.escape.ocamlyacc",
            "match": "\\\\(x[a-fA-F0-9][a-fA-F0-9]|[0-2]\\d\\d|[bnrt'\"\\\\])"
          }
        ]
      }
    ]
  },
  "declaration-matches": {
    "patterns": [
      {
        "name": "meta.token.declaration.ocamlyacc",
        "begin": "(%)(token)",
        "beginCaptures": {
          "1": {
            "name": "keyword.other.decorator.token.ocamlyacc"
          },
          "2": {
            "name": "keyword.other.token.ocamlyacc"
          }
        },
        "end": "^\\s*($|(^\\s*(?=%)))",
        "patterns": [
          {
            "include": "#symbol-types"
          },
          {
            "name": "entity.name.type.token.ocamlyacc",
            "match": "[A-Z][A-Za-z0-9_]*"
          },
          {
            "include": "#comments"
          }
        ]
      },
      {
        "name": "meta.token.associativity.ocamlyacc",
        "begin": "(%)(left|right|nonassoc)",
        "beginCaptures": {
          "1": {
            "name": "keyword.other.decorator.token.associativity.ocamlyacc"
          },
          "2": {
            "name": "keyword.other.token.associativity.ocamlyacc"
          }
        },
        "end": "(^\\s*$)|(^\\s*(?=%))",
        "patterns": [
          {
            "name": "entity.name.type.token.ocamlyacc",
            "match": "[A-Z][A-Za-z0-9_]*"
          },
          {
            "name": "entity.name.function.non-terminal.reference.ocamlyacc",
            "match": "[a-z][A-Za-z0-9_]*"
          },
          {
            "include": "#comments"
          }
        ]
      },
      {
        "name": "meta.start-symbol.ocamlyacc",
        "begin": "(%)(start)",
        "beginCaptures": {
          "1": {
            "name": "keyword.other.decorator.start-symbol.ocamlyacc"
          },
          "2": {
            "name": "keyword.other.start-symbol.ocamlyacc"
          }
        },
        "end": "(^\\s*$)|(^\\s*(?=%))",
        "patterns": [
          {
            "name": "entity.name.function.non-terminal.reference.ocamlyacc",
            "match": "[a-z][A-Za-z0-9_]*"
          },
          {
            "include": "#comments"
          }
        ]
      },
      {
        "name": "meta.symbol-type.ocamlyacc",
        "begin": "(%)(type)",
        "beginCaptures": {
          "1": {
            "name": "keyword.other.decorator.symbol-type.ocamlyacc"
          },
          "2": {
            "name": "keyword.other.symbol-type.ocamlyacc"
          }
        },
        "end": "$\\s*(?!%)",
        "patterns": [
          {
            "include": "#symbol-types"
          },
          {
            "name": "entity.name.type.token.reference.ocamlyacc",
            "match": "[A-Z][A-Za-z0-9_]*"
          },
          {
            "name": "entity.name.function.non-terminal.reference.ocamlyacc",
            "match": "[a-z][A-Za-z0-9_]*"
          },
          {
            "include": "#comments"
          }
        ]
      }
    ]
  },
  "rules": {
    "patterns": [
      {
        "name": "meta.non-terminal.ocamlyacc",
        "begin": "[a-z][a-zA-Z_]*",
        "endCaptures": {
          "0": {
            "name": "punctuation.separator.rule.ocamlyacc"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "entity.name.function.non-terminal.ocamlyacc"
          }
        },
        "end": ";",
        "patterns": [
          {
            "include": "#rule-patterns"
          }
        ]
      }
    ]
  },
  "symbol-types": {
    "patterns": [
      {
        "name": "meta.token.type-declaration.ocamlyacc",
        "begin": "<",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.type-declaration.end.ocamlyacc"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.type-declaration.begin.ocamlyacc"
          }
        },
        "end": ">",
        "patterns": [
          {
            "include": "source.ocaml"
          }
        ]
      }
    ]
  },
  "precs": {
    "patterns": [
      {
        "name": "meta.precidence.declaration",
        "captures": {
          "1": {
            "name": "keyword.other.decorator.precedence.ocamlyacc"
          },
          "2": {
            "name": "keyword.other.precedence.ocamlyacc"
          },
          "4": {
            "name": "entity.name.function.non-terminal.reference.ocamlyacc"
          },
          "5": {
            "name": "entity.name.type.token.reference.ocamlyacc"
          }
        },
        "match": "(%)(prec)\\s+(([a-z][a-zA-Z0-9_]*)|(([A-Z][a-zA-Z0-9_]*)))"
      }
    ]
  },
  "references": {
    "patterns": [
      {
        "name": "entity.name.function.non-terminal.reference.ocamlyacc",
        "match": "[a-z][a-zA-Z0-9_]*"
      },
      {
        "name": "entity.name.type.token.reference.ocamlyacc",
        "match": "[A-Z][a-zA-Z0-9_]*"
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.header.ocamlyacc",
    "begin": "(%{)\\s*$",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.header.end.ocamlyacc"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.header.begin.ocamlyacc"
      }
    },
    "end": "^\\s*(%})",
    "patterns": [
      {
        "include": "source.ocaml"
      }
    ]
  },
  {
    "name": "meta.declarations.ocamlyacc",
    "begin": "(?<=%})\\s*$",
    "end": "(?:^)(?=%%)",
    "patterns": [
      {
        "include": "#comments"
      },
      {
        "include": "#declaration-matches"
      }
    ]
  },
  {
    "name": "meta.rules.ocamlyacc",
    "begin": "(%%)\\s*$",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.rules.end.ocamlyacc"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.rules.begin.ocamlyacc"
      }
    },
    "end": "^\\s*(%%)",
    "patterns": [
      {
        "include": "#comments"
      },
      {
        "include": "#rules"
      }
    ]
  },
  {
    "include": "source.ocaml"
  },
  {
    "include": "#comments"
  },
  {
    "name": "invalid.illegal.unrecognized-character.ocaml",
    "match": "(’|‘|“|”)"
  }
];

exports.OCamlyaccSyntax = new TextmateSyntax(repositories, patterns);
