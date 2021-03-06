"define metadata";
({
    "description": "OCaml syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "ml",
            "pointer": "#OCamlSyntax",
            "fileexts": [
  "ml",
  "mli"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "matchpatterns": {
    "patterns": [
      {
        "name": "constant.language.universal-match.ocaml",
        "match": "\\b_\\b"
      },
      {
        "name": "punctuation.separator.match-pattern.ocaml",
        "match": "\\|(?=\\s*\\S)"
      },
      {
        "name": "meta.match-option.ocaml",
        "begin": "(\\()(?=(?!=.*?->).*?\\|)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.match-option.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.match-option.ocaml"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "name": "punctuation.separator.match-option.ocaml",
            "match": "\\|"
          },
          {
            "include": "#matchpatterns"
          }
        ]
      },
      {
        "include": "#moduleref"
      },
      {
        "include": "#constants"
      },
      {
        "include": "#variables"
      },
      {
        "include": "$self"
      }
    ]
  },
  "module-signature": {
    "patterns": [
      {
        "name": "meta.module.signature.val.ocaml",
        "begin": "(val)\\s+([a-z_][a-zA-Z0-9_']*)\\s*(:)",
        "beginCaptures": {
          "1": {
            "name": "keyword.other.ocaml"
          },
          "2": {
            "name": "entity.name.type.value-signature.ocaml"
          },
          "3": {
            "name": "punctuation.separator.type-constraint.ocaml"
          }
        },
        "end": "(?=\\b(type|val|external|class|module|end)\\b)|^\\s*$",
        "patterns": [
          {
            "name": "variable.parameter.optional.ocaml",
            "captures": {
              "1": {
                "name": "punctuation.definition.optional-parameter.ocaml"
              },
              "2": {
                "name": "entity.name.tag.label.optional.ocaml"
              },
              "3": {
                "name": "punctuation.separator.optional-parameter.ocaml"
              }
            },
            "match": "(\\?)([a-z][a-zA-Z0-9_]*)\\s*(:)"
          },
          {
            "name": "variable.parameter.labeled.ocaml",
            "begin": "(~)([a-z][a-zA-Z0-9'_]*)\\s*(:)\\s*",
            "beginCaptures": {
              "1": {
                "name": "punctuation.definition.labeled-parameter.ocaml"
              },
              "2": {
                "name": "entity.name.tag.label.ocaml"
              },
              "3": {
                "name": "punctuation.separator.label.ocaml"
              }
            },
            "end": "\\s",
            "patterns": [
              {
                "include": "#variables"
              }
            ]
          },
          {
            "include": "#typedefs"
          }
        ]
      },
      {
        "name": "meta.module.signature.external.ocaml",
        "begin": "(external)\\s+([a-z_][a-zA-Z0-9_']*)\\s*(:)",
        "beginCaptures": {
          "1": {
            "name": "keyword.other.ocaml"
          },
          "2": {
            "name": "entity.name.type.external-signature.ocaml"
          },
          "3": {
            "name": "punctuation.separator.type-constraint.ocaml"
          }
        },
        "end": "(?=\\b(type|val|external|class|module|end)\\b)|^\\s*$",
        "patterns": [
          {
            "name": "variable.parameter.optional.ocaml",
            "captures": {
              "1": {
                "name": "punctuation.definition.optional-parameter.ocaml"
              },
              "2": {
                "name": "entity.name.tag.label.optional.ocaml"
              },
              "3": {
                "name": "punctuation.separator.optional-parameter.ocaml"
              }
            },
            "match": "(\\?)([a-z][a-zA-Z0-9_]*)\\s*(:)"
          },
          {
            "name": "variable.parameter.labeled.ocaml",
            "begin": "(~)([a-z][a-zA-Z0-9'_]*)\\s*(:)\\s*",
            "beginCaptures": {
              "1": {
                "name": "punctuation.definition.labeled-parameter.ocaml"
              },
              "2": {
                "name": "entity.name.tag.label.ocaml"
              },
              "3": {
                "name": "punctuation.separator.label.ocaml"
              }
            },
            "end": "\\s",
            "patterns": [
              {
                "include": "#variables"
              }
            ]
          },
          {
            "include": "#strings"
          },
          {
            "include": "#typedefs"
          }
        ]
      }
    ]
  },
  "storagetypes": {
    "patterns": [
      {
        "name": "storage.type.ocaml",
        "match": "\\b(int|char|float|string|list|array|bool|unit|exn|option|int32|int64|nativeint|format4|lazy_t)\\b"
      },
      {
        "name": "storage.type.variant.polymorphic.ocaml",
        "match": "#[a-z_][a-zA-Z0-9_]*"
      }
    ]
  },
  "typedefs": {
    "patterns": [
      {
        "name": "punctuation.separator.variant-definition.ocaml",
        "match": "\\|"
      },
      {
        "include": "#comments"
      },
      {
        "name": "meta.paren-group.ocaml",
        "begin": "\\(",
        "end": "\\)",
        "patterns": [
          {
            "include": "#typedefs"
          }
        ]
      },
      {
        "name": "keyword.other.ocaml",
        "match": "\\bof\\b"
      },
      {
        "include": "#storagetypes"
      },
      {
        "name": "storage.type.ocaml",
        "match": "(?<=\\s|\\()['a-z_][a-zA-Z0-9_]*\\b"
      },
      {
        "name": "meta.module.type.ocaml",
        "captures": {
          "1": {
            "name": "support.other.module.ocaml"
          },
          "2": {
            "name": "storage.type.module.ocaml"
          }
        },
        "match": "\\b((?:[A-Z][a-zA-Z0-9'_]*)(?:\\.[A-Z][a-zA-Z0-9'_]+)*)(\\.[a-zA-Z0-9'_]+)"
      },
      {
        "name": "meta.polymorphic-variant.definition.ocaml",
        "begin": "(\\[(>|<)?)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.polymorphic-variant.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.polymorphic-variant.ocaml"
          }
        },
        "end": "(\\])",
        "patterns": [
          {
            "include": "#typedefs"
          }
        ]
      },
      {
        "include": "$self"
      },
      {
        "name": "punctuation.separator.algebraic-type.ocaml",
        "match": "\\|"
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
          }
        },
        "match": "\\(\\*\\*?(\\*)\\)"
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
  "lists": {
    "patterns": [
      {
        "name": "meta.list.ocaml",
        "begin": "(\\[)(?!\\||<|>)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.list.end.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.list.begin.ocaml"
          }
        },
        "end": "(?<!\\||>)(])",
        "patterns": [
          {
            "include": "#lists"
          },
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  "variables": {
    "patterns": [
      {
        "name": "variable.parameter.unit.ocaml",
        "match": "\\(\\)"
      },
      {
        "include": "#constants"
      },
      {
        "include": "#moduleref"
      },
      {
        "name": "variable.parameter.labeled.ocaml",
        "begin": "(~)([a-z][a-zA-Z0-9'_]*)(\\s*:\\s*)?",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.labeled-parameter.ocaml"
          },
          "2": {
            "name": "entity.name.tag.label.ocaml"
          },
          "3": {
            "name": "punctuation.separator.label.ocaml"
          }
        },
        "end": "\\s",
        "patterns": [
          {
            "include": "#variables"
          }
        ]
      },
      {
        "name": "variable.parameter.optional.ocaml",
        "captures": {
          "1": {
            "name": "punctuation.definition.optional-parameter.ocaml"
          },
          "2": {
            "name": "entity.name.tag.label.optional.ocaml"
          }
        },
        "match": "(\\?)([a-z][a-zA-Z0-9_]*)"
      },
      {
        "name": "variable.parameter.optional.ocaml",
        "begin": "(\\?)(\\()([a-z_][a-zA-Z0-9'_]*)\\s*(=)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.optional-parameter.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.optional-parameter.ocaml"
          },
          "2": {
            "name": "punctuation.definition.optional-parameter.ocaml"
          },
          "3": {
            "name": "entity.name.tag.label.optional.ocaml"
          },
          "4": {
            "name": "punctuation.separator.optional-parameter-assignment.ocaml"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "meta.parameter.type-constrained.ocaml",
        "begin": "(\\()(?=(~[a-z][a-zA-Z0-9_]*:|(\"(\\\\\"|[^\"])*\")|[^\\(\\)~\"])+(?<!:)(:>|:(?![:=])))",
        "endCaptures": {
          "1": {
            "name": "punctuation.section.type-constraint.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.type-constraint.ocaml"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "name": "storage.type.ocaml",
            "begin": "(?<!:)(:>|:(?![:=]))",
            "beginCaptures": {
              "1": {
                "name": "punctuation.separator.type-constraint.ocaml"
              }
            },
            "end": "(?=\\))",
            "patterns": [
              {
                "name": "meta.paren.group",
                "begin": "\\(",
                "end": "\\)"
              }
            ]
          },
          {
            "include": "#variables"
          }
        ]
      },
      {
        "include": "#comments"
      },
      {
        "name": "meta.paren-group.ocaml",
        "begin": "\\(",
        "end": "\\)",
        "patterns": [
          {
            "include": "#variables"
          }
        ]
      },
      {
        "name": "variable.parameter.tuple.ocaml",
        "begin": "(\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.tuple.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.tuple.ocaml"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "include": "#matchpatterns"
          },
          {
            "include": "#variables"
          },
          {
            "name": "punctuation.separator.tuple.ocaml",
            "match": ","
          }
        ]
      },
      {
        "name": "variable.parameter.record.ocaml",
        "begin": "(\\{)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.record.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.record.ocaml"
          }
        },
        "end": "(\\})",
        "patterns": [
          {
            "include": "#moduleref"
          },
          {
            "name": "meta.recordfield.match.ocaml",
            "begin": "\\b([a-z][a-zA-Z0-9'_]*)\\s*(=)",
            "endCaptures": {
              "1": {
                "name": "punctuation.separator.record.ocaml"
              }
            },
            "beginCaptures": {
              "1": {
                "name": "entity.name.tag.record.ocaml"
              },
              "2": {
                "name": "punctuation.separator.record.field-assignment.ocaml"
              }
            },
            "end": "(;)|(?=\\})",
            "patterns": [
              {
                "include": "#matchpatterns"
              }
            ]
          }
        ]
      },
      {
        "include": "#storagetypes"
      },
      {
        "name": "variable.parameter.ocaml",
        "match": "\\b[a-z_][a-zA-Z0-9'_]*"
      }
    ]
  },
  "arrays": {
    "patterns": [
      {
        "name": "meta.array.ocaml",
        "begin": "(\\[\\|)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.array.end.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.array.begin.ocaml"
          }
        },
        "end": "(\\|])",
        "patterns": [
          {
            "include": "#arrays"
          },
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  "strings": {
    "patterns": [
      {
        "name": "string.quoted.double.ocaml",
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
  "constants": {
    "patterns": [
      {
        "name": "constant.language.pseudo-variable.ocaml",
        "captures": {
          "1": {
            "name": "meta.empty-typing-pair.ocaml"
          },
          "2": {
            "name": "meta.empty-typing-pair.parens.ocaml"
          },
          "3": {
            "name": "meta.empty-typing-pair.ocaml"
          }
        },
        "match": "(?:\\[\\s*(\\])|\\((\\))|\\(\\s*(\\)))"
      },
      {
        "name": "constant.language.boolean.ocaml",
        "match": "\\b(true|false)\\b"
      },
      {
        "name": "constant.numeric.floating-point.ocaml",
        "match": "\\b-?[0-9][0-9_]*((\\.([0-9][0-9_]*([eE][+-]??[0-9][0-9_]*)?)?)|([eE][+-]??[0-9][0-9_]*))"
      },
      {
        "name": "constant.numeric.integer.nativeint.ocaml",
        "match": "\\b(-?((0(x|X)[0-9a-fA-F][0-9a-fA-F_]*)|(0(o|O)[0-7][0-7_]*)|(0(b|B)[01][01_]*)|([0-9][0-9_]*)))n"
      },
      {
        "name": "constant.numeric.integer.int64.ocaml",
        "match": "\\b(-?((0(x|X)[0-9a-fA-F][0-9a-fA-F_]*)|(0(o|O)[0-7][0-7_]*)|(0(b|B)[01][01_]*)|([0-9][0-9_]*)))L"
      },
      {
        "name": "constant.numeric.integer.int32.ocaml",
        "match": "\\b(-?((0(x|X)[0-9a-fA-F][0-9a-fA-F_]*)|(0(o|O)[0-7][0-7_]*)|(0(b|B)[01][01_]*)|([0-9][0-9_]*)))l"
      },
      {
        "name": "constant.numeric.integer.ocaml",
        "match": "\\b(-?((0(x|X)[0-9a-fA-F][0-9a-fA-F_]*)|(0(o|O)[0-7][0-7_]*)|(0(b|B)[01][01_]*)|([0-9][0-9_]*)))"
      },
      {
        "name": "constant.character.ocaml",
        "match": "'(.|\\\\(x[a-fA-F0-9][a-fA-F0-9]|[0-2]\\d\\d|[bnrt'\"\\\\]))'"
      }
    ]
  },
  "moduleref": {
    "patterns": [
      {
        "name": "meta.module-reference.ocaml",
        "beginCaptures": {
          "1": {
            "name": "support.other.module.ocaml"
          },
          "2": {
            "name": "punctuation.separator.module-reference.ocaml"
          }
        },
        "match": "\\b([A-Z][a-zA-Z0-9'_]*)(\\.)"
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.module.binding",
    "captures": {
      "1": {
        "name": "keyword.other.module-binding.ocaml"
      },
      "2": {
        "name": "keyword.other.module-definition.ocaml"
      },
      "3": {
        "name": "support.other.module.ocaml"
      },
      "4": {
        "name": "punctuation.separator.module-binding.ocmal"
      }
    },
    "match": "\\b(let)\\s+(module)\\s+([A-Z][a-zA-Z0-9'_]*)\\s*(=)"
  },
  {
    "name": "meta.function.ocaml",
    "begin": "\\b(let|and)\\s+(?!\\(\\*)((rec\\s+)([a-z_][a-zA-Z0-9_']*)\\b|([a-z_][a-zA-Z0-9_']*|\\([^)]+\\))(?=\\s)((?=\\s*=\\s*(?=fun(?:ction)\\b))|(?!\\s*=)))",
    "endCaptures": {
      "1": {
        "name": "punctuation.separator.function.type-constraint.ocaml"
      },
      "2": {
        "name": "storage.type.ocaml"
      },
      "3": {
        "name": "keyword.operator.ocaml"
      },
      "4": {
        "name": "keyword.operator.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.function-definition.ocaml"
      },
      "3": {
        "name": "keyword.other.funtion-definition.ocaml"
      },
      "4": {
        "name": "entity.name.function.ocaml"
      },
      "5": {
        "name": "entity.name.function.ocaml"
      }
    },
    "end": "(?:(:)\\s*([^=]+))?(?:(=)|(=)\\s*(?=fun(?:ction)\\b))",
    "patterns": [
      {
        "include": "#variables"
      }
    ]
  },
  {
    "name": "meta.function.anonymous.ocaml",
    "begin": "(\\()(?=fun\\s)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.function.anonymous.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.function.anonymous.ocaml"
      }
    },
    "end": "(\\))",
    "patterns": [
      {
        "name": "meta.function.anonymous.definition.ocaml",
        "begin": "(?<=\\()(fun)\\s",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.function-definition.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.other.function-definition.ocaml"
          }
        },
        "end": "(->)",
        "patterns": [
          {
            "include": "#variables"
          }
        ]
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.type-definition-group.ocaml",
    "begin": "^\\s*(?=type\\s)",
    "end": "\\b(?=let|end)|^\\s*$",
    "patterns": [
      {
        "name": "meta.type-definition.ocaml",
        "begin": "\\b(type|and)\\s+([^=]*)(=)?",
        "beginCaptures": {
          "1": {
            "name": "keyword.other.type-definition.ocaml"
          },
          "2": {
            "name": "storage.type.user-defined.ocaml"
          },
          "3": {
            "name": "punctuation.separator.type-definition.ocaml"
          }
        },
        "end": "(?=\\b(type|and|let|end)\\b)|(?=^\\s*$)",
        "patterns": [
          {
            "include": "#typedefs"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.pattern-match.ocaml",
    "begin": "\\b(with|function)(?=(\\s*$|.*->))\\b|((?<!\\|)(\\|)(?!\\|)(?=.*->))",
    "endCaptures": {
      "1": {
        "name": "punctuation.separator.match-definition.ocaml"
      },
      "2": {
        "name": "keyword.control.match-condition.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.match-definition.ocaml"
      },
      "2": {
        "name": "keyword.other.function-definition.ocaml"
      },
      "3": {
        "name": "keyword.control.match-definition.ocaml"
      }
    },
    "end": "(?:(->)|\\b(when)\\b|\\s(?=\\|))",
    "patterns": [
      {
        "include": "#matchpatterns"
      }
    ]
  },
  {
    "name": "meta.class.type-definition.ocaml",
    "captures": {
      "1": {
        "name": "keyword.other.class-type-definition.ocaml"
      },
      "2": {
        "name": "entity.name.type.class-type.ocaml"
      },
      "4": {
        "name": "storage.type.user-defined.ocaml"
      }
    },
    "match": "^[ \\t]*(class\\s+type\\s+)((\\[\\s*('[A-Za-z][a-zA-Z0-9_']*(?:\\s*,\\s*'[A-Za-z][a-zA-Z0-9_']*)*)\\s*\\]\\s+)?[a-z_][a-zA-Z0-9'_]*)"
  },
  {
    "name": "meta.class.ocaml",
    "begin": "^[ \\t]*(class)(?:\\s+(?!(?:virtual)\\s+))((\\[\\s*('[A-Za-z][a-zA-Z0-9_']*(?:\\s*,\\s*'[A-Za-z][a-zA-Z0-9_']*)*)\\s*\\]\\s+)?[a-z_][a-zA-Z0-9'_]*)",
    "endCaptures": {
      "1": {
        "name": "keyword.operator.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.class-definition.ocaml"
      },
      "2": {
        "name": "entity.name.type.class.ocaml"
      },
      "4": {
        "name": "storage.type.user-defined.ocaml"
      }
    },
    "end": "(=)",
    "patterns": [
      {
        "include": "#variables"
      }
    ]
  },
  {
    "name": "meta.class.virtual.ocaml",
    "begin": "^[ \\t]*(class\\s+virtual\\s+)((\\[\\s*('[A-Za-z][a-zA-Z0-9_']*(?:\\s*,\\s*'[A-Za-z][a-zA-Z0-9_']*)*)\\s*\\]\\s+)?[a-z_][a-zA-Z0-9'_]*)",
    "endCaptures": {
      "1": {
        "name": "keyword.operator.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.class-definition.ocaml"
      },
      "2": {
        "name": "entity.name.type.class.ocaml"
      },
      "4": {
        "name": "storage.type.user-defined.ocaml"
      }
    },
    "end": "(=)",
    "patterns": [
      {
        "include": "#variables"
      }
    ]
  },
  {
    "name": "meta.class.virtual.type-definition.ocaml",
    "captures": {
      "1": {
        "name": "keyword.other.class-type-definition.ocaml"
      },
      "2": {
        "name": "entity.name.type.class-type.ocaml"
      },
      "4": {
        "name": "storage.type.user-defined.ocaml"
      }
    },
    "match": "^[ \\t]*(class\\s+type\\s+virtual)((\\[\\s*('[A-Za-z][a-zA-Z0-9_']*(?:\\s*,\\s*'[A-Za-z][a-zA-Z0-9_']*)*)\\s*\\]\\s+)?[a-z_][a-zA-Z0-9'_]*)"
  },
  {
    "name": "meta.record.ocaml",
    "begin": "(\\{)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.record.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.record.ocaml"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "name": "keyword.other.language.ocaml",
        "match": "\\bwith\\b"
      },
      {
        "name": "meta.record.definition.ocaml",
        "begin": "(\\bmutable\\s+)?\\b([a-z_][a-zA-Z0-9_']*)\\s*(:)",
        "endCaptures": {
          "1": {
            "name": "keyword.operator.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.other.storage.modifier.ocaml"
          },
          "2": {
            "name": "source.ocaml"
          },
          "3": {
            "name": "punctuation.definition.record.ocaml"
          }
        },
        "end": "(;|(?=}))",
        "patterns": [
          {
            "include": "#typedefs"
          }
        ]
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.object.ocaml",
    "begin": "\\b(object)\\s*(?:(\\()(_?[a-z]+)(\\)))?\\s*$",
    "endCaptures": {
      "1": {
        "name": "keyword.control.object.ocaml"
      },
      "2": {
        "name": "punctuation.terminator.expression.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.object-definition.ocaml"
      },
      "2": {
        "name": "punctuation.definition.self-binding.ocaml"
      },
      "3": {
        "name": "entity.name.type.self-binding.ocaml"
      },
      "4": {
        "name": "punctuation.definition.self-binding.ocaml"
      }
    },
    "end": "\\b(end)\\b",
    "patterns": [
      {
        "name": "meta.method.ocaml",
        "begin": "\\b(method)\\s+(virtual\\s+)?(private\\s+)?([a-z_][a-zA-Z0-9'_]*)",
        "endCaptures": {
          "1": {
            "name": "keyword.operator.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.other.method-definition.ocaml"
          },
          "2": {
            "name": "keyword.other.method-definition.ocaml"
          },
          "3": {
            "name": "keyword.other.method-restriction.ocaml"
          },
          "4": {
            "name": "entity.name.function.method.ocaml"
          }
        },
        "end": "(=|:)",
        "patterns": [
          {
            "include": "#variables"
          }
        ]
      },
      {
        "name": "meta.object.type-constraint.ocaml",
        "begin": "(constraint)\\s+([a-z_'][a-zA-Z0-9'_]*)\\s+(=)",
        "endCaptures": {
          "1": {
            "name": "storage.type.polymorphic-variant.ocaml"
          },
          "2": {
            "name": "storage.type.ocaml"
          },
          "3": {
            "name": "storage.type.user-defined.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.other.language.ocaml"
          },
          "2": {
            "name": "storage.type.user-defined.ocaml"
          },
          "3": {
            "name": "keyword.operator.ocaml"
          }
        },
        "end": "(#[a-z_][a-zA-Z0-9'_]*)|(int|char|float|string|list|array|bool|unit|exn|option|int32|int64|nativeint|format4|lazy_t)|([a-z_][a-zA-Z0-9'_]*)\\s*$"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.method-call.ocaml",
    "captures": {
      "1": {
        "name": "punctuation.separator.method-call.ocaml"
      }
    },
    "match": "(?<=\\w|\\)|')(#)[a-z_][a-zA-Z0-9'_]*"
  },
  {
    "name": "meta.module.ocaml",
    "captures": {
      "1": {
        "name": "keyword.other.module-definition.ocaml"
      },
      "2": {
        "name": "entity.name.type.module.ocaml"
      },
      "3": {
        "name": "punctuation.separator.module-definition.ocaml"
      },
      "4": {
        "name": "entity.name.type.module-type.ocaml"
      }
    },
    "match": "^[ \\t]*(module)\\s+([A-Z_][a-zA-Z0-9'_]*)(?:\\s*(:)\\s*([A-Z][a-zA-Z0-9'_]*)?)?"
  },
  {
    "name": "meta.module.type.ocaml",
    "captures": {
      "1": {
        "name": "keyword.other.module-type-definition.ocaml"
      },
      "2": {
        "name": "entity.name.type.module-type.ocaml"
      }
    },
    "match": "^[ \\t]*(module\\s+type\\s+)([A-Z][a-zA-Z0-9'_]*)"
  },
  {
    "name": "meta.module.signature.ocaml",
    "begin": "\\b(sig)\\b",
    "endCaptures": {
      "1": {
        "name": "keyword.other.module.signature.ocaml"
      },
      "2": {
        "name": "punctuation.terminator.expression.ocaml"
      },
      "3": {
        "name": "keyword.operator.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.module.signature.ocaml"
      }
    },
    "end": "\\b(end)\\b",
    "patterns": [
      {
        "include": "#module-signature"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.module.structure.ocaml",
    "begin": "\\b(struct)\\b",
    "endCaptures": {
      "1": {
        "name": "keyword.other.module.structure.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.module.structure.ocaml"
      }
    },
    "end": "\\b(end)\\b",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "include": "#moduleref"
  },
  {
    "name": "meta.module.open.ocaml",
    "begin": "\\b(open)\\s+([A-Z][a-zA-Z0-9'_]*)(?=(\\.[A-Z][a-zA-Z0-9_]*)*)",
    "beginCaptures": {
      "1": {
        "name": "keyword.other.ocaml"
      },
      "2": {
        "name": "support.other.module.ocaml"
      }
    },
    "end": "(\\s|$)",
    "patterns": [
      {
        "name": "support.other.module.ocaml",
        "captures": {
          "1": {
            "name": "punctuation.separator.module-reference.ocaml"
          }
        },
        "match": "(\\.)([A-Z][a-zA-Z0-9'_]*)"
      }
    ]
  },
  {
    "name": "meta.exception.ocaml",
    "captures": {
      "1": {
        "name": "keyword.other.ocaml"
      },
      "2": {
        "name": "entity.name.type.exception.ocaml"
      }
    },
    "match": "\\b(exception)\\s+([A-Z][a-zA-Z0-9'_]*)\\b"
  },
  {
    "name": "source.camlp4.embedded.ocaml",
    "begin": "(?=(\\[<)(?![^\\[]+?[^>]]))",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.camlp4-stream.ocaml"
      }
    },
    "end": "(>])",
    "patterns": [
      {
        "include": "source.camlp4.ocaml"
      }
    ]
  },
  {
    "include": "#strings"
  },
  {
    "include": "#constants"
  },
  {
    "include": "#comments"
  },
  {
    "include": "#lists"
  },
  {
    "include": "#arrays"
  },
  {
    "name": "meta.type-constraint.ocaml",
    "begin": "(\\()(?=(~[a-z][a-zA-Z0-9_]*:|(\"(\\\\\"|[^\"])*\")|[^\\(\\)~\"])+(?<!:)(:>|:(?![:=])))",
    "endCaptures": {
      "1": {
        "name": "punctuation.separator.type-constraint.ocaml"
      },
      "2": {
        "name": "storage.type.ocaml"
      },
      "3": {
        "name": "punctuation.section.type-constraint.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.type-constraint.ocaml"
      }
    },
    "end": "(?<!:)(:>|:(?![:=]))(.*?)(\\))",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "keyword.other.directive.ocaml",
    "match": "^[ \\t]*#[a-zA-Z]+"
  },
  {
    "name": "keyword.other.directive.line-number.ocaml",
    "match": "^[ \\t]*#[0-9]*"
  },
  {
    "include": "#storagetypes"
  },
  {
    "name": "keyword.other.storage.modifier.ocaml",
    "match": "\\b(mutable|ref)\\b"
  },
  {
    "name": "entity.name.type.variant.polymorphic.ocaml",
    "match": "`[A-Za-z][a-zA-Z0-9'_]*\\b"
  },
  {
    "name": "entity.name.type.variant.ocaml",
    "match": "\\b[A-Z][a-zA-Z0-9'_]*\\b"
  },
  {
    "name": "keyword.operator.symbol.ocaml",
    "match": "!=|:=|>|<"
  },
  {
    "name": "keyword.operator.infix.floating-point.ocaml",
    "match": "[*+/-]\\."
  },
  {
    "name": "keyword.operator.prefix.floating-point.ocaml",
    "match": "~-\\."
  },
  {
    "name": "punctuation.definition.list.constructor.ocaml",
    "match": "::"
  },
  {
    "name": "punctuation.terminator.expression.ocaml",
    "match": ";;"
  },
  {
    "name": "punctuation.separator.ocaml",
    "match": ";"
  },
  {
    "name": "punctuation.separator.function-return.ocaml",
    "match": "->"
  },
  {
    "name": "keyword.operator.infix.ocaml",
    "match": "[=<>@^&+\\-*/$%|][|!$%&*+./:<=>?@^~-]*"
  },
  {
    "name": "keyword.operator.prefix.ocaml",
    "match": "\\bnot\\b|!|[!\\?~][!$%&*+./:<=>?@^~-]+"
  },
  {
    "name": "entity.name.tag.label.ocaml",
    "captures": {
      "1": {
        "name": "punctuation.separator.argument-label.ocaml"
      }
    },
    "match": "~[a-z][a-z0-9'_]*(:)?"
  },
  {
    "name": "meta.begin-end-group.ocaml",
    "begin": "\\b(begin)\\b",
    "endCaptures": {
      "1": {
        "name": "keyword.control.begin-end.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.begin-end.ocaml"
      }
    },
    "end": "\\b(end)\\b",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.for-loop.ocaml",
    "begin": "\\b(for)\\b",
    "endCaptures": {
      "1": {
        "name": "keyword.control.for-loop.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.for-loop.ocaml"
      }
    },
    "end": "\\b(done)\\b",
    "patterns": [
      {
        "name": "keyword.control.loop.ocaml",
        "match": "\\bdo\\b"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.while-loop.ocaml",
    "begin": "\\b(while)\\b",
    "endCaptures": {
      "1": {
        "name": "keyword.control.while-loop.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.while-loop.ocaml"
      }
    },
    "end": "\\b(done)\\b",
    "patterns": [
      {
        "name": "keyword.control.loop.ocaml",
        "match": "\\bdo\\b"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.paren-group.ocaml",
    "begin": "\\(",
    "end": "\\)",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "keyword.operator.ocaml",
    "match": "\\b(and|land|lor|lsl|lsr|lxor|mod|or)\\b"
  },
  {
    "name": "keyword.control.ocaml",
    "match": "\\b(downto|if|else|match|then|to|when|with|try)\\b"
  },
  {
    "name": "keyword.other.ocaml",
    "match": "\\b(as|assert|class|constraint|exception|functor|in|include|inherit|initializer|lazy|let|mod|module|mutable|new|object|open|private|rec|sig|struct|type|val|virtual)\\b"
  },
  {
    "include": "#module-signature"
  },
  {
    "name": "invalid.illegal.unrecognized-character.ocaml",
    "match": "(’|‘|“|”)"
  }
];

exports.OCamlSyntax = new TextmateSyntax(repositories, patterns);
