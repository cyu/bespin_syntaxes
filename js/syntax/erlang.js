"define metadata";
({
    "description": "Erlang syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "erl",
            "pointer": "#ErlangSyntax",
            "fileexts": [
  "erl",
  "hrl"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "comment": {
    "begin": "(%)",
    "name": "comment.line.erlang",
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.comment.erlang"
      }
    },
    "end": "$\\n?"
  },
  "number": {
    "begin": "(?=\\d)",
    "end": "(?!\\d)",
    "patterns": [
      {
        "name": "constant.numeric.float.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.integer-float.erlang"
          },
          "3": {
            "name": "punctuation.separator.float-exponent.erlang"
          }
        },
        "match": "\\d++(\\.)\\d++(([eE][\\+\\-])?\\d++)?"
      },
      {
        "name": "constant.numeric.integer.binary.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "2(#)[0-1]++"
      },
      {
        "name": "constant.numeric.integer.base-3.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "3(#)[0-2]++"
      },
      {
        "name": "constant.numeric.integer.base-4.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "4(#)[0-3]++"
      },
      {
        "name": "constant.numeric.integer.base-5.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "5(#)[0-4]++"
      },
      {
        "name": "constant.numeric.integer.base-6.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "6(#)[0-5]++"
      },
      {
        "name": "constant.numeric.integer.base-7.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "7(#)[0-6]++"
      },
      {
        "name": "constant.numeric.integer.octal.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "8(#)[0-7]++"
      },
      {
        "name": "constant.numeric.integer.base-9.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "9(#)[0-8]++"
      },
      {
        "name": "constant.numeric.integer.decimal.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "10(#)\\d++"
      },
      {
        "name": "constant.numeric.integer.base-11.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "11(#)[\\daA]++"
      },
      {
        "name": "constant.numeric.integer.base-12.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "12(#)[\\da-bA-B]++"
      },
      {
        "name": "constant.numeric.integer.base-13.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "13(#)[\\da-cA-C]++"
      },
      {
        "name": "constant.numeric.integer.base-14.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "14(#)[\\da-dA-D]++"
      },
      {
        "name": "constant.numeric.integer.base-15.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "15(#)[\\da-eA-E]++"
      },
      {
        "name": "constant.numeric.integer.hexadecimal.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "16(#)\\h++"
      },
      {
        "name": "constant.numeric.integer.base-17.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "17(#)[\\da-gA-G]++"
      },
      {
        "name": "constant.numeric.integer.base-18.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "18(#)[\\da-hA-H]++"
      },
      {
        "name": "constant.numeric.integer.base-19.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "19(#)[\\da-iA-I]++"
      },
      {
        "name": "constant.numeric.integer.base-20.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "20(#)[\\da-jA-J]++"
      },
      {
        "name": "constant.numeric.integer.base-21.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "21(#)[\\da-kA-K]++"
      },
      {
        "name": "constant.numeric.integer.base-22.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "22(#)[\\da-lA-L]++"
      },
      {
        "name": "constant.numeric.integer.base-23.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "23(#)[\\da-mA-M]++"
      },
      {
        "name": "constant.numeric.integer.base-24.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "24(#)[\\da-nA-N]++"
      },
      {
        "name": "constant.numeric.integer.base-25.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "25(#)[\\da-oA-O]++"
      },
      {
        "name": "constant.numeric.integer.base-26.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "26(#)[\\da-pA-P]++"
      },
      {
        "name": "constant.numeric.integer.base-27.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "27(#)[\\da-qA-Q]++"
      },
      {
        "name": "constant.numeric.integer.base-28.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "28(#)[\\da-rA-R]++"
      },
      {
        "name": "constant.numeric.integer.base-29.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "29(#)[\\da-sA-S]++"
      },
      {
        "name": "constant.numeric.integer.base-30.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "30(#)[\\da-tA-T]++"
      },
      {
        "name": "constant.numeric.integer.base-31.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "31(#)[\\da-uA-U]++"
      },
      {
        "name": "constant.numeric.integer.base-32.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "32(#)[\\da-vA-V]++"
      },
      {
        "name": "constant.numeric.integer.base-33.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "33(#)[\\da-wA-W]++"
      },
      {
        "name": "constant.numeric.integer.base-34.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "34(#)[\\da-xA-X]++"
      },
      {
        "name": "constant.numeric.integer.base-35.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "35(#)[\\da-yA-Y]++"
      },
      {
        "name": "constant.numeric.integer.base-36.erlang",
        "captures": {
          "1": {
            "name": "punctuation.separator.base-integer.erlang"
          }
        },
        "match": "36(#)[\\da-zA-Z]++"
      },
      {
        "name": "invalid.illegal.integer.erlang",
        "match": "\\d++#[\\da-zA-Z]++"
      },
      {
        "name": "constant.numeric.integer.decimal.erlang",
        "match": "\\d++"
      }
    ]
  },
  "macro-usage": {
    "name": "meta.macro-usage.erlang",
    "captures": {
      "1": {
        "name": "keyword.operator.macro.erlang"
      },
      "2": {
        "name": "entity.name.function.macro.erlang"
      }
    },
    "match": "(\\?\\??)\\s*+([a-zA-Z\\d@_]++)"
  },
  "internal-expression-punctuation": {
    "captures": {
      "1": {
        "name": "punctuation.separator.clause-head-body.erlang"
      },
      "2": {
        "name": "punctuation.separator.clauses.erlang"
      },
      "3": {
        "name": "punctuation.separator.expressions.erlang"
      }
    },
    "match": "(->)|(;)|(,)"
  },
  "list": {
    "begin": "(\\[)",
    "name": "meta.structure.list.erlang",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.list.end.erlang"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.list.begin.erlang"
      }
    },
    "end": "(\\])",
    "patterns": [
      {
        "name": "punctuation.separator.list.erlang",
        "match": "\\||\\|\\||,"
      },
      {
        "include": "#everything-else"
      }
    ]
  },
  "character": {
    "patterns": [
      {
        "name": "constant.character.erlang",
        "captures": {
          "1": {
            "name": "punctuation.definition.character.erlang"
          },
          "2": {
            "name": "constant.character.escape.erlang"
          },
          "3": {
            "name": "punctuation.definition.escape.erlang"
          },
          "5": {
            "name": "punctuation.definition.escape.erlang"
          }
        },
        "match": "(\\$)((\\\\)([bdefnrstv\\\\'\"]|(\\^)[@-_]|[0-7]{1,3}))"
      },
      {
        "name": "invalid.illegal.character.erlang",
        "match": "\\$\\\\\\^?.?"
      },
      {
        "name": "constant.character.erlang",
        "captures": {
          "1": {
            "name": "punctuation.definition.character.erlang"
          }
        },
        "match": "(\\$)\\S"
      },
      {
        "name": "invalid.illegal.character.erlang",
        "match": "\\$.?"
      }
    ]
  },
  "symbolic-operator": {
    "name": "keyword.operator.symbolic.erlang",
    "match": "\\+\\+|\\+|--|-|\\*|/=|/|=/=|=:=|==|=<|=|<-|<|>=|>|!"
  },
  "binary": {
    "begin": "(<<)",
    "name": "meta.structure.binary.erlang",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.binary.end.erlang"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.binary.begin.erlang"
      }
    },
    "end": "(>>)",
    "patterns": [
      {
        "captures": {
          "1": {
            "name": "punctuation.separator.binary.erlang"
          },
          "2": {
            "name": "punctuation.separator.value-size.erlang"
          }
        },
        "match": "(,)|(:)"
      },
      {
        "include": "#internal-type-specifiers"
      },
      {
        "include": "#everything-else"
      }
    ]
  },
  "internal-function-list": {
    "begin": "(\\[)",
    "name": "meta.structure.list.function.erlang",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.list.end.erlang"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.list.begin.erlang"
      }
    },
    "end": "(\\])",
    "patterns": [
      {
        "begin": "([a-z][a-zA-Z\\d@_]*+)\\s*+(/)",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.list.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "entity.name.function.erlang"
          },
          "2": {
            "name": "punctuation.separator.function-arity.erlang"
          }
        },
        "end": "(,)|(?=\\])",
        "patterns": [
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "include": "#everything-else"
      }
    ]
  },
  "directive": {
    "patterns": [
      {
        "name": "meta.directive.erlang",
        "begin": "^\\s*+(-)\\s*+([a-z][a-zA-Z\\d@_]*+)\\s*+(\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.erlang"
          },
          "2": {
            "name": "punctuation.section.directive.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.directive.begin.erlang"
          },
          "2": {
            "name": "keyword.control.directive.erlang"
          },
          "3": {
            "name": "punctuation.definition.parameters.begin.erlang"
          }
        },
        "end": "(\\))\\s*+(\\.)",
        "patterns": [
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "name": "meta.directive.erlang",
        "captures": {
          "1": {
            "name": "punctuation.section.directive.begin.erlang"
          },
          "2": {
            "name": "keyword.control.directive.erlang"
          },
          "3": {
            "name": "punctuation.section.directive.end.erlang"
          }
        },
        "match": "^\\s*+(-)\\s*+([a-z][a-zA-Z\\d@_]*+)\\s*+(\\.)"
      }
    ]
  },
  "internal-type-specifiers": {
    "begin": "(/)",
    "beginCaptures": {
      "1": {
        "name": "punctuation.separator.value-type.erlang"
      }
    },
    "end": "(?=,|:|>>)",
    "patterns": [
      {
        "captures": {
          "1": {
            "name": "storage.type.erlang"
          },
          "2": {
            "name": "storage.modifier.signedness.erlang"
          },
          "3": {
            "name": "storage.modifier.endianness.erlang"
          },
          "4": {
            "name": "storage.modifier.unit.erlang"
          },
          "5": {
            "name": "punctuation.separator.type-specifiers.erlang"
          }
        },
        "match": "(integer|float|binary)|(signed|unsigned)|(big|little|native)|(unit)|(-)"
      }
    ]
  },
  "module-directive": {
    "name": "meta.directive.module.erlang",
    "captures": {
      "6": {
        "name": "punctuation.section.directive.end.erlang"
      },
      "1": {
        "name": "punctuation.section.directive.begin.erlang"
      },
      "2": {
        "name": "keyword.control.directive.module.erlang"
      },
      "3": {
        "name": "punctuation.definition.parameters.begin.erlang"
      },
      "4": {
        "name": "entity.name.type.class.module.definition.erlang"
      },
      "5": {
        "name": "punctuation.definition.parameters.end.erlang"
      }
    },
    "match": "^\\s*+(-)\\s*+(module)\\s*+(\\()\\s*+([a-z][a-zA-Z\\d@_]*+)\\s*+(\\))\\s*+(\\.)"
  },
  "internal-record-body": {
    "begin": "(\\{)",
    "name": "meta.structure.record.erlang",
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.class.record.begin.erlang"
      }
    },
    "end": "(?=\\})",
    "patterns": [
      {
        "begin": "(([a-z][a-zA-Z\\d@_]*+)|(_))\\s*+(=)",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.class.record.erlang"
          }
        },
        "beginCaptures": {
          "2": {
            "name": "variable.other.field.erlang"
          },
          "3": {
            "name": "variable.language.omitted.field.erlang"
          },
          "4": {
            "name": "keyword.operator.assignment.erlang"
          }
        },
        "end": "(,)|(?=\\})",
        "patterns": [
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "captures": {
          "1": {
            "name": "variable.other.field.erlang"
          },
          "2": {
            "name": "punctuation.separator.class.record.erlang"
          }
        },
        "match": "([a-z][a-zA-Z\\d@_]*+)\\s*+(,)?"
      },
      {
        "include": "#everything-else"
      }
    ]
  },
  "macro-directive": {
    "patterns": [
      {
        "name": "meta.directive.ifdef.erlang",
        "captures": {
          "6": {
            "name": "punctuation.section.directive.end.erlang"
          },
          "1": {
            "name": "punctuation.section.directive.begin.erlang"
          },
          "2": {
            "name": "keyword.control.directive.ifdef.erlang"
          },
          "3": {
            "name": "punctuation.definition.parameters.begin.erlang"
          },
          "4": {
            "name": "entity.name.function.macro.erlang"
          },
          "5": {
            "name": "punctuation.definition.parameters.end.erlang"
          }
        },
        "match": "^\\s*+(-)\\s*+(ifdef)\\s*+(\\()\\s*+([a-zA-z\\d@_]++)\\s*+(\\))\\s*+(\\.)"
      },
      {
        "name": "meta.directive.ifndef.erlang",
        "captures": {
          "6": {
            "name": "punctuation.section.directive.end.erlang"
          },
          "1": {
            "name": "punctuation.section.directive.begin.erlang"
          },
          "2": {
            "name": "keyword.control.directive.ifndef.erlang"
          },
          "3": {
            "name": "punctuation.definition.parameters.begin.erlang"
          },
          "4": {
            "name": "entity.name.function.macro.erlang"
          },
          "5": {
            "name": "punctuation.definition.parameters.end.erlang"
          }
        },
        "match": "^\\s*+(-)\\s*+(ifndef)\\s*+(\\()\\s*+([a-zA-z\\d@_]++)\\s*+(\\))\\s*+(\\.)"
      },
      {
        "name": "meta.directive.undef.erlang",
        "captures": {
          "6": {
            "name": "punctuation.section.directive.end.erlang"
          },
          "1": {
            "name": "punctuation.section.directive.begin.erlang"
          },
          "2": {
            "name": "keyword.control.directive.undef.erlang"
          },
          "3": {
            "name": "punctuation.definition.parameters.begin.erlang"
          },
          "4": {
            "name": "entity.name.function.macro.erlang"
          },
          "5": {
            "name": "punctuation.definition.parameters.end.erlang"
          }
        },
        "match": "^\\s*+(-)\\s*+(undef)\\s*+(\\()\\s*+([a-zA-z\\d@_]++)\\s*+(\\))\\s*+(\\.)"
      }
    ]
  },
  "expression": {
    "patterns": [
      {
        "name": "meta.expression.if.erlang",
        "begin": "\\b(if)\\b",
        "endCaptures": {
          "1": {
            "name": "keyword.control.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.control.if.erlang"
          }
        },
        "end": "\\b(end)\\b",
        "patterns": [
          {
            "include": "#internal-expression-punctuation"
          },
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "name": "meta.expression.case.erlang",
        "begin": "\\b(case)\\b",
        "endCaptures": {
          "1": {
            "name": "keyword.control.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.control.case.erlang"
          }
        },
        "end": "\\b(end)\\b",
        "patterns": [
          {
            "include": "#internal-expression-punctuation"
          },
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "name": "meta.expression.receive.erlang",
        "begin": "\\b(receive)\\b",
        "endCaptures": {
          "1": {
            "name": "keyword.control.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.control.receive.erlang"
          }
        },
        "end": "\\b(end)\\b",
        "patterns": [
          {
            "include": "#internal-expression-punctuation"
          },
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "captures": {
          "6": {
            "name": "punctuation.separator.function-arity.erlang"
          },
          "1": {
            "name": "keyword.control.fun.erlang"
          },
          "3": {
            "name": "entity.name.type.class.module.erlang"
          },
          "4": {
            "name": "punctuation.separator.module-function.erlang"
          },
          "5": {
            "name": "entity.name.function.erlang"
          }
        },
        "match": "\\b(fun)\\s*+(([a-z][a-zA-Z\\d@_]*+)\\s*+(:)\\s*+)?([a-z][a-zA-Z\\d@_]*+)\\s*(/)"
      },
      {
        "name": "meta.expression.fun.erlang",
        "begin": "\\b(fun)\\b",
        "endCaptures": {
          "1": {
            "name": "keyword.control.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.control.fun.erlang"
          }
        },
        "end": "\\b(end)\\b",
        "patterns": [
          {
            "begin": "(?=\\()",
            "endCaptures": {
              "1": {
                "name": "punctuation.separator.clauses.erlang"
              }
            },
            "end": "(;)|(?=\\bend\\b)",
            "patterns": [
              {
                "include": "#internal-function-parts"
              }
            ]
          },
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "name": "meta.expression.try.erlang",
        "begin": "\\b(try)\\b",
        "endCaptures": {
          "1": {
            "name": "keyword.control.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.control.try.erlang"
          }
        },
        "end": "\\b(end)\\b",
        "patterns": [
          {
            "include": "#internal-expression-punctuation"
          },
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "name": "meta.expression.begin.erlang",
        "begin": "\\b(begin)\\b",
        "endCaptures": {
          "1": {
            "name": "keyword.control.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.control.begin.erlang"
          }
        },
        "end": "\\b(end)\\b",
        "patterns": [
          {
            "include": "#internal-expression-punctuation"
          },
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "name": "meta.expression.query.erlang",
        "begin": "\\b(query)\\b",
        "endCaptures": {
          "1": {
            "name": "keyword.control.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.control.query.erlang"
          }
        },
        "end": "\\b(end)\\b",
        "patterns": [
          {
            "include": "#everything-else"
          }
        ]
      }
    ]
  },
  "function": {
    "begin": "^\\s*+([a-z][a-zA-Z\\d@_]*+)\\s*+(?=\\()",
    "name": "meta.function.erlang",
    "endCaptures": {
      "1": {
        "name": "punctuation.terminator.function.erlang"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "entity.name.function.definition.erlang"
      }
    },
    "end": "(\\.)",
    "patterns": [
      {
        "begin": "(?=\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.clauses.erlang"
          }
        },
        "end": "(;)|(?=\\.)",
        "patterns": [
          {
            "include": "#internal-function-parts"
          }
        ]
      },
      {
        "captures": {
          "1": {
            "name": "entity.name.function.erlang"
          }
        },
        "match": "^\\s*+([a-z][a-zA-Z\\d@_]*+)\\s*+(?=\\()"
      },
      {
        "include": "#everything-else"
      }
    ]
  },
  "internal-function-parts": {
    "patterns": [
      {
        "begin": "(?=\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.clause-head-body.erlang"
          }
        },
        "end": "(->)",
        "patterns": [
          {
            "begin": "(\\()",
            "endCaptures": {
              "1": {
                "name": "punctuation.definition.parameters.end.erlang"
              }
            },
            "beginCaptures": {
              "1": {
                "name": "punctuation.definition.parameters.begin.erlang"
              }
            },
            "end": "(\\))",
            "patterns": [
              {
                "name": "punctuation.separator.parameters.erlang",
                "match": ","
              },
              {
                "include": "#everything-else"
              }
            ]
          },
          {
            "name": "punctuation.separator.guards.erlang",
            "match": ",|;"
          },
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "name": "punctuation.separator.expressions.erlang",
        "match": ","
      },
      {
        "include": "#everything-else"
      }
    ]
  },
  "record-usage": {
    "patterns": [
      {
        "name": "meta.record-usage.erlang",
        "captures": {
          "1": {
            "name": "keyword.operator.record.erlang"
          },
          "2": {
            "name": "entity.name.type.class.record.erlang"
          },
          "3": {
            "name": "punctuation.separator.record-field.erlang"
          },
          "4": {
            "name": "variable.other.field.erlang"
          }
        },
        "match": "(#)\\s*+([a-z][a-zA-Z\\d@_]*+)\\s*+(\\.)\\s*+([a-z][a-zA-Z\\d@_]*+)"
      },
      {
        "name": "meta.record-usage.erlang",
        "begin": "(#)\\s*+([a-z][a-zA-Z\\d@_]*+)",
        "endCaptures": {
          "1": {
            "name": "meta.structure.record.erlang"
          },
          "2": {
            "name": "punctuation.definition.class.record.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "keyword.operator.record.erlang"
          },
          "2": {
            "name": "entity.name.type.class.record.erlang"
          }
        },
        "end": "((\\}))",
        "patterns": [
          {
            "include": "#internal-record-body"
          }
        ]
      }
    ]
  },
  "define-directive": {
    "patterns": [
      {
        "name": "meta.directive.define.erlang",
        "begin": "^\\s*+(-)\\s*+(define)\\s*+(\\()\\s*+([a-zA-Z\\d@_]++)\\s*+(,)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.erlang"
          },
          "2": {
            "name": "punctuation.section.directive.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.directive.begin.erlang"
          },
          "2": {
            "name": "keyword.control.directive.define.erlang"
          },
          "3": {
            "name": "punctuation.definition.parameters.begin.erlang"
          },
          "4": {
            "name": "entity.name.function.macro.definition.erlang"
          },
          "5": {
            "name": "punctuation.separator.parameters.erlang"
          }
        },
        "end": "(\\))\\s*+(\\.)",
        "patterns": [
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "name": "meta.directive.define.erlang",
        "begin": "(?=^\\s*+-\\s*+define\\s*+\\(\\s*+[a-zA-Z\\d@_]++\\s*+\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.erlang"
          },
          "2": {
            "name": "punctuation.section.directive.end.erlang"
          }
        },
        "end": "(\\))\\s*+(\\.)",
        "patterns": [
          {
            "begin": "^\\s*+(-)\\s*+(define)\\s*+(\\()\\s*+([a-zA-Z\\d@_]++)\\s*+(\\()",
            "endCaptures": {
              "1": {
                "name": "punctuation.definition.parameters.end.erlang"
              },
              "2": {
                "name": "punctuation.separator.parameters.erlang"
              }
            },
            "beginCaptures": {
              "1": {
                "name": "punctuation.section.directive.begin.erlang"
              },
              "2": {
                "name": "keyword.control.directive.define.erlang"
              },
              "3": {
                "name": "punctuation.definition.parameters.begin.erlang"
              },
              "4": {
                "name": "entity.name.function.macro.definition.erlang"
              },
              "5": {
                "name": "punctuation.definition.parameters.begin.erlang"
              }
            },
            "end": "(\\))\\s*(,)",
            "patterns": [
              {
                "name": "punctuation.separator.parameters.erlang",
                "match": ","
              },
              {
                "include": "#everything-else"
              }
            ]
          },
          {
            "name": "punctuation.separator.define.erlang",
            "match": "\\|\\||\\||:|;|,|\\.|->"
          },
          {
            "include": "#everything-else"
          }
        ]
      }
    ]
  },
  "string": {
    "begin": "(\")",
    "name": "string.quoted.double.erlang",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.string.end.erlang"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.string.begin.erlang"
      }
    },
    "end": "(\")",
    "patterns": [
      {
        "name": "constant.character.escape.erlang",
        "captures": {
          "1": {
            "name": "punctuation.definition.escape.erlang"
          },
          "3": {
            "name": "punctuation.definition.escape.erlang"
          }
        },
        "match": "(\\\\)([bdefnrstv\\\\'\"]|(\\^)[@-_]|[0-7]{1,3})"
      },
      {
        "name": "invalid.illegal.string.erlang",
        "match": "\\\\\\^?.?"
      },
      {
        "name": "constant.other.placeholder.erlang",
        "captures": {
          "6": {
            "name": "punctuation.separator.placeholder-parts.erlang"
          },
          "12": {
            "name": "punctuation.separator.placeholder-parts.erlang"
          },
          "8": {
            "name": "punctuation.separator.placeholder-parts.erlang"
          },
          "1": {
            "name": "punctuation.definition.placeholder.erlang"
          },
          "3": {
            "name": "punctuation.separator.placeholder-parts.erlang"
          },
          "10": {
            "name": "punctuation.separator.placeholder-parts.erlang"
          },
          "4": {
            "name": "punctuation.separator.placeholder-parts.erlang"
          }
        },
        "match": "(~)((\\-)?\\d++|(\\*))?((\\.)(\\d++|(\\*)))?((\\.)((\\*)|.))?[~cfegswpWPBX#bx\\+ni]"
      },
      {
        "name": "constant.other.placeholder.erlang",
        "captures": {
          "1": {
            "name": "punctuation.definition.placeholder.erlang"
          },
          "2": {
            "name": "punctuation.separator.placeholder-parts.erlang"
          }
        },
        "match": "(~)(\\*)?(\\d++)?[~du\\-#fsacl]"
      },
      {
        "name": "invalid.illegal.string.erlang",
        "match": "~.?"
      }
    ]
  },
  "everything-else": {
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "include": "#record-usage"
      },
      {
        "include": "#macro-usage"
      },
      {
        "include": "#expression"
      },
      {
        "include": "#keyword"
      },
      {
        "include": "#textual-operator"
      },
      {
        "include": "#function-call"
      },
      {
        "include": "#tuple"
      },
      {
        "include": "#list"
      },
      {
        "include": "#binary"
      },
      {
        "include": "#parenthesized-expression"
      },
      {
        "include": "#character"
      },
      {
        "include": "#number"
      },
      {
        "include": "#atom"
      },
      {
        "include": "#string"
      },
      {
        "include": "#symbolic-operator"
      },
      {
        "include": "#variable"
      }
    ]
  },
  "function-call": {
    "begin": "(?=[a-z][a-zA-Z\\d@_]*+\\s*+(\\(|:\\s*+[a-z][a-zA-Z\\d@_]*+\\s*+\\())",
    "name": "meta.function-call.erlang",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.erlang"
      }
    },
    "end": "(\\))",
    "patterns": [
      {
        "begin": "((erlang)\\s*+(:)\\s*+)?(is_atom|is_binary|is_constant|is_float|is_function|is_integer|is_list|is_number|is_pid|is_port|is_reference|is_tuple|is_record|abs|element|hd|length|node|round|self|size|tl|trunc)\\s*+(\\()",
        "beginCaptures": {
          "2": {
            "name": "entity.name.type.class.module.erlang"
          },
          "3": {
            "name": "punctuation.separator.module-function.erlang"
          },
          "4": {
            "name": "entity.name.function.guard.erlang"
          },
          "5": {
            "name": "punctuation.definition.parameters.begin.erlang"
          }
        },
        "end": "(?=\\))",
        "patterns": [
          {
            "name": "punctuation.separator.parameters.erlang",
            "match": ","
          },
          {
            "include": "#everything-else"
          }
        ]
      },
      {
        "begin": "(([a-z][a-zA-Z\\d@_]*+)\\s*+(:)\\s*+)?([a-z][a-zA-Z\\d@_]*+)\\s*+(\\()",
        "beginCaptures": {
          "2": {
            "name": "entity.name.type.class.module.erlang"
          },
          "3": {
            "name": "punctuation.separator.module-function.erlang"
          },
          "4": {
            "name": "entity.name.function.erlang"
          },
          "5": {
            "name": "punctuation.definition.parameters.begin.erlang"
          }
        },
        "end": "(?=\\))",
        "patterns": [
          {
            "name": "punctuation.separator.parameters.erlang",
            "match": ","
          },
          {
            "include": "#everything-else"
          }
        ]
      }
    ]
  },
  "record-directive": {
    "begin": "^\\s*+(-)\\s*+(record)\\s*+(\\()\\s*+([a-z][a-zA-Z\\d@_]*+)\\s*+(,)",
    "name": "meta.directive.record.erlang",
    "endCaptures": {
      "1": {
        "name": "meta.structure.record.erlang"
      },
      "2": {
        "name": "punctuation.definition.class.record.end.erlang"
      },
      "3": {
        "name": "punctuation.definition.parameters.end.erlang"
      },
      "4": {
        "name": "punctuation.section.directive.end.erlang"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.directive.begin.erlang"
      },
      "2": {
        "name": "keyword.control.directive.import.erlang"
      },
      "3": {
        "name": "punctuation.definition.parameters.begin.erlang"
      },
      "4": {
        "name": "entity.name.type.class.record.definition.erlang"
      },
      "5": {
        "name": "punctuation.separator.parameters.erlang"
      }
    },
    "end": "((\\}))\\s*+(\\))\\s*+(\\.)",
    "patterns": [
      {
        "include": "#internal-record-body"
      }
    ]
  },
  "keyword": {
    "name": "keyword.control.erlang",
    "match": "\\b(after|begin|case|catch|cond|end|fun|if|let|of|query|try|receive|when)\\b"
  },
  "parenthesized-expression": {
    "begin": "(\\()",
    "name": "meta.expression.parenthesized",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.expression.end.erlang"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.expression.begin.erlang"
      }
    },
    "end": "(\\))",
    "patterns": [
      {
        "include": "#everything-else"
      }
    ]
  },
  "atom": {
    "patterns": [
      {
        "name": "constant.other.symbol.quoted.single.erlang",
        "begin": "(')",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.symbol.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.symbol.begin.erlang"
          }
        },
        "end": "(')",
        "patterns": [
          {
            "name": "constant.other.symbol.escape.erlang",
            "captures": {
              "1": {
                "name": "punctuation.definition.escape.erlang"
              },
              "3": {
                "name": "punctuation.definition.escape.erlang"
              }
            },
            "match": "(\\\\)([bdefnrstv\\\\'\"]|(\\^)[@-_]|[0-7]{1,3})"
          },
          {
            "name": "invalid.illegal.atom.erlang",
            "match": "\\\\\\^?.?"
          }
        ]
      },
      {
        "name": "constant.other.symbol.unquoted.erlang",
        "match": "[a-z][a-zA-Z\\d@_]*+"
      }
    ]
  },
  "variable": {
    "captures": {
      "1": {
        "name": "variable.other.erlang"
      },
      "2": {
        "name": "variable.language.omitted.erlang"
      }
    },
    "match": "(_[a-zA-Z\\d@_]++|[A-Z][a-zA-Z\\d@_]*+)|(_)"
  },
  "textual-operator": {
    "name": "keyword.operator.textual.erlang",
    "match": "\\b(andalso|band|and|bxor|xor|bor|orelse|or|bnot|not|bsl|bsr|div|rem)\\b"
  },
  "tuple": {
    "begin": "(\\{)",
    "name": "meta.structure.tuple.erlang",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.tuple.end.erlang"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.tuple.begin.erlang"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "name": "punctuation.separator.tuple.erlang",
        "match": ","
      },
      {
        "include": "#everything-else"
      }
    ]
  },
  "import-export-directive": {
    "patterns": [
      {
        "name": "meta.directive.import.erlang",
        "begin": "^\\s*+(-)\\s*+(import)\\s*+(\\()\\s*+([a-z][a-zA-Z\\d@_]*+)\\s*+(,)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.erlang"
          },
          "2": {
            "name": "punctuation.section.directive.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.directive.begin.erlang"
          },
          "2": {
            "name": "keyword.control.directive.import.erlang"
          },
          "3": {
            "name": "punctuation.definition.parameters.begin.erlang"
          },
          "4": {
            "name": "entity.name.type.class.module.erlang"
          },
          "5": {
            "name": "punctuation.separator.parameters.erlang"
          }
        },
        "end": "(\\))\\s*+(\\.)",
        "patterns": [
          {
            "include": "#internal-function-list"
          }
        ]
      },
      {
        "name": "meta.directive.export.erlang",
        "begin": "^\\s*+(-)\\s*+(export)\\s*+(\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.erlang"
          },
          "2": {
            "name": "punctuation.section.directive.end.erlang"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.directive.begin.erlang"
          },
          "2": {
            "name": "keyword.control.directive.export.erlang"
          },
          "3": {
            "name": "punctuation.definition.parameters.begin.erlang"
          }
        },
        "end": "(\\))\\s*+(\\.)",
        "patterns": [
          {
            "include": "#internal-function-list"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "include": "#module-directive"
  },
  {
    "include": "#import-export-directive"
  },
  {
    "include": "#record-directive"
  },
  {
    "include": "#define-directive"
  },
  {
    "include": "#macro-directive"
  },
  {
    "include": "#directive"
  },
  {
    "include": "#function"
  },
  {
    "include": "#everything-else"
  }
];

exports.ErlangSyntax = new TextmateSyntax(repositories, patterns);
