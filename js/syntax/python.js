"define metadata";
({
    "description": "Python syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "py",
            "pointer": "#PythonSyntax",
            "fileexts": [
  "py",
  "rpy",
  "cpy",
  "SConstruct",
  "Sconstruct",
  "sconstruct",
  "SConscript"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "builtin_exceptions": {
    "name": "support.type.exception.python",
    "match": "(?x)\\b((Arithmetic|Assertion|Attribute|EOF|Environment|FloatingPoint|IO|Import|Indentation|Index|Key|Lookup|Memory|Name|OS|Overflow|NotImplemented|Reference|Runtime|Standard|Syntax|System|Tab|Type|UnboundLocal|Unicode(Translate|Encode|Decode)?|Value|ZeroDivision)Error|(Deprecation|Future|Overflow|PendingDeprecation|Runtime|Syntax|User)?Warning|KeyboardInterrupt|NotImplemented|StopIteration|SystemExit|(Base)?Exception)\\b"
  },
  "builtin_types": {
    "name": "support.type.python",
    "match": "(?x)\\b(\n\t\t\t\tbasestring|bool|buffer|classmethod|complex|dict|enumerate|file|\n\t\t\t\tfloat|frozenset|int|list|long|object|open|property|reversed|set|\n\t\t\t\tslice|staticmethod|str|super|tuple|type|unicode|xrange\n\t\t\t)\\b"
  },
  "dotted_name": {
    "begin": "(?=[A-Za-z_][A-Za-z0-9_]*(?:\\.[A-Za-z_][A-Za-z0-9_]*)*)",
    "end": "(?![A-Za-z0-9_\\.])",
    "patterns": [
      {
        "begin": "(\\.)(?=[A-Za-z_][A-Za-z0-9_]*)",
        "end": "(?![A-Za-z0-9_])",
        "patterns": [
          {
            "include": "#magic_function_names"
          },
          {
            "include": "#magic_variable_names"
          },
          {
            "include": "#illegal_names"
          },
          {
            "include": "#generic_names"
          }
        ]
      },
      {
        "begin": "(?<!\\.)(?=[A-Za-z_][A-Za-z0-9_]*)",
        "end": "(?![A-Za-z0-9_])",
        "patterns": [
          {
            "include": "#builtin_functions"
          },
          {
            "include": "#builtin_types"
          },
          {
            "include": "#builtin_exceptions"
          },
          {
            "include": "#illegal_names"
          },
          {
            "include": "#magic_function_names"
          },
          {
            "include": "#magic_variable_names"
          },
          {
            "include": "#language_variables"
          },
          {
            "include": "#generic_names"
          }
        ]
      }
    ]
  },
  "entity_name_class": {
    "patterns": [
      {
        "include": "#illegal_names"
      },
      {
        "include": "#generic_names"
      }
    ]
  },
  "keyword_arguments": {
    "begin": "\\b([a-zA-Z_][a-zA-Z_0-9]*)\\s*(=)(?!=)",
    "endCaptures": {
      "1": {
        "name": "punctuation.separator.parameters.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "variable.parameter.function.python"
      },
      "2": {
        "name": "keyword.operator.assignment.python"
      }
    },
    "end": "\\s*(?:(,)|(?=$\\n?|[\\)]))",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  "docstrings": {
    "patterns": [
      {
        "name": "comment.block.python",
        "begin": "^\\s*(?=[uU]?[rR]?\"\"\")",
        "end": "(?<=\"\"\")",
        "patterns": [
          {
            "include": "#string_quoted_double"
          }
        ]
      },
      {
        "name": "comment.block.python",
        "begin": "^\\s*(?=[uU]?[rR]?''')",
        "end": "(?<=''')",
        "patterns": [
          {
            "include": "#string_quoted_single"
          }
        ]
      }
    ]
  },
  "magic_variable_names": {
    "comment": "magic variables which a class/module may have.",
    "name": "support.variable.magic.python",
    "match": "\\b__(all|bases|class|debug|dict|doc|file|members|metaclass|methods|name|slots|weakref)__\\b"
  },
  "builtin_functions": {
    "name": "support.function.builtin.python",
    "match": "(?x)\\b(\n                __import__|all|abs|any|apply|callable|chr|cmp|coerce|compile|delattr|dir|\n                divmod|eval|execfile|filter|getattr|globals|hasattr|hash|hex|id|\n                input|intern|isinstance|issubclass|iter|len|locals|map|max|min|oct|\n                ord|pow|range|raw_input|reduce|reload|repr|round|setattr|sorted|\n                sum|unichr|vars|zip\n\t\t\t)\\b"
  },
  "illegal_names": {
    "name": "invalid.illegal.name.python",
    "match": "\\b(and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield)\\b"
  },
  "generic_names": {
    "match": "[A-Za-z_][A-Za-z0-9_]*"
  },
  "constant_placeholder": {
    "name": "constant.other.placeholder.python",
    "match": "(?i:%(\\([a-z_]+\\))?#?0?\\-?[ ]?\\+?([0-9]*|\\*)(\\.([0-9]*|\\*))?[hL]?[a-z%])"
  },
  "line_continuation": {
    "captures": {
      "1": {
        "name": "punctuation.separator.continuation.line.python"
      },
      "2": {
        "name": "invalid.illegal.unexpected-text.python"
      }
    },
    "match": "(\\\\)(.*)$\\n?"
  },
  "strings": {
    "patterns": [
      {
        "include": "#string_quoted_double"
      },
      {
        "include": "#string_quoted_single"
      }
    ]
  },
  "entity_name_function": {
    "patterns": [
      {
        "include": "#magic_function_names"
      },
      {
        "include": "#illegal_names"
      },
      {
        "include": "#generic_names"
      }
    ]
  },
  "string_quoted_double": {
    "patterns": [
      {
        "name": "string.quoted.double.block.unicode-raw.python",
        "begin": "((?i:ur))(\"\"\")",
        "comment": "single quoted unicode-raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\"\"\")(\")\"\"|\"\"\")",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_unicode_char"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.double.block.raw.python",
        "begin": "([rR])(\"\"\")",
        "comment": "double quoted raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\"\"\")(\")\"\"|\"\"\")",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.double.block.unicode.python",
        "begin": "([uU])(\"\"\")",
        "comment": "double quoted unicode string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\"\"\")(\")\"\"|\"\"\")",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_unicode_char"
          },
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.quoted.double.single-line.unicode-raw.python",
        "begin": "((?i:ur))(\")",
        "comment": "double-quoted raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          },
          "3": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\")(\")|\")|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_unicode_char"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.double.single-line.raw.python",
        "begin": "([rR])(\")",
        "comment": "double-quoted raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          },
          "3": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\")(\")|\")|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.double.single-line.raw.python",
        "begin": "([rR])(\")",
        "comment": "double-quoted raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          },
          "3": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\")(\")|\")|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.double.single-line.unicode.python",
        "begin": "([uU])(\")",
        "comment": "double quoted unicode string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          },
          "3": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\")(\")|\")|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_unicode_char"
          },
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.quoted.double.block.python",
        "begin": "(\"\"\")",
        "comment": "double quoted string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\"\"\")(\")\"\"|\"\"\")",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.quoted.double.single-line.python",
        "begin": "(\")",
        "comment": "double quoted string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.double.python"
          },
          "3": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=\")(\")|\")|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          }
        ]
      }
    ]
  },
  "string_quoted_single": {
    "patterns": [
      {
        "name": "string.quoted.single.single-line.python",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.begin.python"
          },
          "2": {
            "name": "punctuation.definition.string.end.python"
          },
          "3": {
            "name": "meta.empty-string.single.python"
          }
        },
        "match": "(?<!')(')(('))(?!')"
      },
      {
        "name": "string.quoted.single.block.unicode-raw.python",
        "begin": "((?i:ur))(''')",
        "comment": "single quoted unicode-raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.single.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=''')(')''|''')",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_unicode_char"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.single.block.raw.python",
        "begin": "([rR])(''')",
        "comment": "single quoted raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.single.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=''')(')''|''')",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.single.block.unicode.python",
        "begin": "([uU])(''')",
        "comment": "single quoted unicode string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.single.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=''')(')''|''')",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_unicode_char"
          },
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.quoted.single.single-line.unicode-raw.python",
        "begin": "((?i:ur))(')",
        "comment": "single quoted raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "(')|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_unicode_char"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.single.single-line.raw.python",
        "begin": "([rR])(')",
        "comment": "single quoted raw string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "(')|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          },
          {
            "include": "source.regexp.python"
          }
        ]
      },
      {
        "name": "string.quoted.single.single-line.unicode.python",
        "begin": "([uU])(')",
        "comment": "single quoted unicode string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "storage.type.string.python"
          },
          "2": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "(')|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_unicode_char"
          },
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.quoted.single.block.python",
        "begin": "(''')",
        "comment": "single quoted string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "meta.empty-string.single.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "((?<=''')(')''|''')",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.quoted.single.single-line.python",
        "begin": "(')",
        "comment": "single quoted string",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.python"
          },
          "2": {
            "name": "invalid.illegal.unclosed-string.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.python"
          }
        },
        "end": "(')|(\\n)",
        "patterns": [
          {
            "include": "#constant_placeholder"
          },
          {
            "include": "#escaped_char"
          }
        ]
      }
    ]
  },
  "escaped_unicode_char": {
    "captures": {
      "1": {
        "name": "constant.character.escape.unicode.16-bit-hex.python"
      },
      "2": {
        "name": "constant.character.escape.unicode.32-bit-hex.python"
      },
      "3": {
        "name": "constant.character.escape.unicode.name.python"
      }
    },
    "match": "(\\\\U[0-9A-Fa-f]{8})|(\\\\u[0-9A-Fa-f]{4})|(\\\\N\\{[a-zA-Z ]+\\})"
  },
  "language_variables": {
    "name": "variable.language.python",
    "match": "\\b(self|cls)\\b"
  },
  "function_name": {
    "patterns": [
      {
        "include": "#magic_function_names"
      },
      {
        "include": "#magic_variable_names"
      },
      {
        "include": "#builtin_exceptions"
      },
      {
        "include": "#builtin_functions"
      },
      {
        "include": "#builtin_types"
      },
      {
        "include": "#generic_names"
      }
    ]
  },
  "escaped_char": {
    "captures": {
      "11": {
        "name": "constant.character.escape.return.python"
      },
      "6": {
        "name": "constant.character.escape.single-quote.python"
      },
      "12": {
        "name": "constant.character.escape.tab.python"
      },
      "7": {
        "name": "constant.character.escape.bell.python"
      },
      "13": {
        "name": "constant.character.escape.vertical-tab.python"
      },
      "8": {
        "name": "constant.character.escape.backspace.python"
      },
      "9": {
        "name": "constant.character.escape.formfeed.python"
      },
      "1": {
        "name": "constant.character.escape.hex.python"
      },
      "2": {
        "name": "constant.character.escape.octal.python"
      },
      "3": {
        "name": "constant.character.escape.newline.python"
      },
      "10": {
        "name": "constant.character.escape.linefeed.python"
      },
      "4": {
        "name": "constant.character.escape.backlash.python"
      },
      "5": {
        "name": "constant.character.escape.double-quote.python"
      }
    },
    "match": "(\\\\x[0-9A-F]{2})|(\\\\[0-7]{3})|(\\\\\\n)|(\\\\\\\\)|(\\\\\\\")|(\\\\')|(\\\\a)|(\\\\b)|(\\\\f)|(\\\\n)|(\\\\r)|(\\\\t)|(\\\\v)"
  },
  "magic_function_names": {
    "comment": "these methods have magic interpretation by python and are generally called indirectly through syntactic constructs",
    "name": "support.function.magic.python",
    "match": "(?x)\\b(__(?:\n\t\t\t\t\t\tabs|add|and|call|cmp|coerce|complex|contains|del|delattr|\n\t\t\t\t\t\tdelete|delitem|delslice|div|divmod|enter|eq|exit|float|\n\t\t\t\t\t\tfloordiv|ge|get|getattr|getattribute|getitem|getslice|gt|\n\t\t\t\t\t\thash|hex|iadd|iand|idiv|ifloordiv|ilshift|imod|imul|init|\n\t\t\t\t\t\tint|invert|ior|ipow|irshift|isub|iter|itruediv|ixor|le|len|\n\t\t\t\t\t\tlong|lshift|lt|mod|mul|ne|neg|new|nonzero|oct|or|pos|pow|\n\t\t\t\t\t\tradd|rand|rdiv|rdivmod|repr|rfloordiv|rlshift|rmod|rmul|ror|\n\t\t\t\t\t\trpow|rrshift|rshift|rsub|rtruediv|rxor|set|setattr|setitem|\n\t\t\t\t\t\tsetslice|str|sub|truediv|unicode|xor\n\t\t\t\t\t)__)\\b"
  }
};

var patterns = [
  {
    "name": "comment.line.number-sign.python",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.python"
      }
    },
    "match": "(#).*$\\n?"
  },
  {
    "name": "constant.numeric.integer.long.hexadecimal.python",
    "match": "\\b(?i:(0x\\h*)L)"
  },
  {
    "name": "constant.numeric.integer.hexadecimal.python",
    "match": "\\b(?i:(0x\\h*))"
  },
  {
    "name": "constant.numeric.integer.long.octal.python",
    "match": "\\b(?i:(0[0-7]+)L)"
  },
  {
    "name": "constant.numeric.integer.octal.python",
    "match": "\\b(0[0-7]+)"
  },
  {
    "name": "constant.numeric.complex.python",
    "match": "\\b(?i:(((\\d+(\\.(?=[^a-zA-Z_])\\d*)?|(?<=[^0-9a-zA-Z_])\\.\\d+)(e[\\-\\+]?\\d+)?))J)"
  },
  {
    "name": "constant.numeric.float.python",
    "match": "\\b(?i:(\\d+\\.\\d*(e[\\-\\+]?\\d+)?))(?=[^a-zA-Z_])"
  },
  {
    "name": "constant.numeric.float.python",
    "match": "(?<=[^0-9a-zA-Z_])(?i:(\\.\\d+(e[\\-\\+]?\\d+)?))"
  },
  {
    "name": "constant.numeric.float.python",
    "match": "\\b(?i:(\\d+e[\\-\\+]?\\d+))"
  },
  {
    "name": "constant.numeric.integer.long.decimal.python",
    "match": "\\b(?i:([1-9]+[0-9]*|0)L)"
  },
  {
    "name": "constant.numeric.integer.decimal.python",
    "match": "\\b([1-9]+[0-9]*|0)"
  },
  {
    "captures": {
      "1": {
        "name": "storage.modifier.global.python"
      }
    },
    "match": "\\b(global)\\b"
  },
  {
    "captures": {
      "1": {
        "name": "keyword.control.import.python"
      },
      "2": {
        "name": "keyword.control.import.from.python"
      }
    },
    "match": "\\b(?:(import)|(from))\\b"
  },
  {
    "name": "keyword.control.flow.python",
    "comment": "keywords that delimit flow blocks",
    "match": "\\b(elif|else|except|finally|for|if|try|while|with)\\b"
  },
  {
    "name": "keyword.control.flow.python",
    "comment": "keywords that alter flow from within a block",
    "match": "\\b(break|continue|pass|raise|return|yield)\\b"
  },
  {
    "name": "keyword.operator.logical.python",
    "comment": "keyword operators that evaluate to True or False",
    "match": "\\b(and|in|is|not|or)\\b"
  },
  {
    "comment": "keywords that haven't fit into other groups (yet).",
    "captures": {
      "1": {
        "name": "keyword.other.python"
      }
    },
    "match": "\\b(as|assert|del|exec|print)\\b"
  },
  {
    "name": "keyword.operator.assignment.augmented.python",
    "match": "\\+\\=|-\\=|\\*\\=|/\\=|//\\=|%\\=|&\\=|\\|\\=|\\^\\=|>>\\=|<<\\=|\\*\\*\\="
  },
  {
    "name": "keyword.operator.arithmetic.python",
    "match": "\\+|\\-|\\*|\\*\\*|/|//|%|<<|>>|&|\\||\\^|~"
  },
  {
    "name": "keyword.operator.comparison.python",
    "match": "<|>|<\\=|>\\=|\\=\\=|!\\=|<>"
  },
  {
    "name": "keyword.operator.assignment.python",
    "match": "\\="
  },
  {
    "name": "meta.class.old-style.python",
    "begin": "^\\s*(class)\\s+(?=[a-zA-Z_][a-zA-Z_0-9]*\\s*\\:)",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.class.begin.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.class.python"
      }
    },
    "end": "\\s*(:)",
    "contentName": "entity.name.type.class.python",
    "patterns": [
      {
        "include": "#entity_name_class"
      }
    ]
  },
  {
    "name": "meta.class.python",
    "begin": "^\\s*(class)\\s+(?=[a-zA-Z_][a-zA-Z_0-9]*\\s*\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.inheritance.end.python"
      },
      "2": {
        "name": "punctuation.section.class.begin.python"
      },
      "3": {
        "name": "invalid.illegal.missing-section-begin.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.class.python"
      }
    },
    "end": "(\\))\\s*(?:(\\:)|(.*$\\n?))",
    "patterns": [
      {
        "begin": "(?=[A-Za-z_][A-Za-z0-9_]*)",
        "end": "(?![A-Za-z0-9_])",
        "contentName": "entity.name.type.class.python",
        "patterns": [
          {
            "include": "#entity_name_class"
          }
        ]
      },
      {
        "begin": "(\\()",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.inheritance.begin.python"
          }
        },
        "end": "(?=\\)|:)",
        "contentName": "meta.class.inheritance.python",
        "patterns": [
          {
            "begin": "(?<=\\(|,)\\s*",
            "endCaptures": {
              "1": {
                "name": "punctuation.separator.inheritance.python"
              }
            },
            "end": "\\s*(?:(,)|(?=\\)))",
            "contentName": "entity.other.inherited-class.python",
            "patterns": [
              {
                "include": "$self"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "meta.class.python",
    "begin": "^\\s*(class)\\s+(?=[a-zA-Z_][a-zA-Z_0-9])",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.inheritance.begin.python"
      },
      "2": {
        "name": "invalid.illegal.missing-inheritance.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.class.python"
      }
    },
    "end": "(\\()|\\s*($\\n?|#.*$\\n?)",
    "patterns": [
      {
        "begin": "(?=[A-Za-z_][A-Za-z0-9_]*)",
        "end": "(?![A-Za-z0-9_])",
        "contentName": "entity.name.type.class.python",
        "patterns": [
          {
            "include": "#entity_name_function"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.function.python",
    "begin": "^\\s*(def)\\s+(?=[A-Za-z_][A-Za-z0-9_]*\\s*\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.python"
      },
      "2": {
        "name": "punctuation.section.function.begin.python"
      },
      "3": {
        "name": "invalid.illegal.missing-section-begin.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.function.python"
      }
    },
    "end": "(\\))\\s*(?:(\\:)|(.*$\\n?))",
    "patterns": [
      {
        "begin": "(?=[A-Za-z_][A-Za-z0-9_]*)",
        "end": "(?![A-Za-z0-9_])",
        "contentName": "entity.name.function.python",
        "patterns": [
          {
            "include": "#entity_name_function"
          }
        ]
      },
      {
        "begin": "(\\()",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.begin.python"
          }
        },
        "end": "(?=\\)\\s*\\:)",
        "contentName": "meta.function.parameters.python",
        "patterns": [
          {
            "include": "#keyword_arguments"
          },
          {
            "captures": {
              "1": {
                "name": "variable.parameter.function.python"
              },
              "2": {
                "name": "punctuation.separator.parameters.python"
              }
            },
            "match": "\\b([a-zA-Z_][a-zA-Z_0-9]*)\\s*(?:(,)|(?=[\\n\\)]))"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.function.python",
    "begin": "^\\s*(def)\\s+(?=[A-Za-z_][A-Za-z0-9_]*)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.begin.python"
      },
      "2": {
        "name": "invalid.illegal.missing-parameters.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.function.python"
      }
    },
    "end": "(\\()|\\s*($\\n?|#.*$\\n?)",
    "patterns": [
      {
        "begin": "(?=[A-Za-z_][A-Za-z0-9_]*)",
        "end": "(?![A-Za-z0-9_])",
        "contentName": "entity.name.function.python",
        "patterns": [
          {
            "include": "#entity_name_function"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.function.decorator.python",
    "begin": "^\\s*(?=@\\s*[A-Za-z_][A-Za-z0-9_]*(?:\\.[a-zA-Z_][a-zA-Z_0-9]*)*\\s*\\()",
    "comment": "a decorator may be a function call which returns a decorator.",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.python"
      }
    },
    "end": "(\\))",
    "patterns": [
      {
        "begin": "(?=(@)\\s*[A-Za-z_][A-Za-z0-9_]*(?:\\.[A-Za-z_][A-Za-z0-9_]*)*\\s*\\()",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.decorator.python"
          }
        },
        "end": "(?=\\s*\\()",
        "contentName": "entity.name.function.decorator.python",
        "patterns": [
          {
            "include": "#dotted_name"
          }
        ]
      },
      {
        "begin": "(\\()",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.arguments.begin.python"
          }
        },
        "end": "(?=\\))",
        "contentName": "meta.function.decorator.arguments.python",
        "patterns": [
          {
            "include": "#keyword_arguments"
          },
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.function.decorator.python",
    "begin": "^\\s*(?=@\\s*[A-Za-z_][A-Za-z0-9_]*(?:\\.[a-zA-Z_][a-zA-Z_0-9]*)*)",
    "end": "(?=\\s|$\\n?|#)",
    "contentName": "entity.name.function.decorator.python",
    "patterns": [
      {
        "begin": "(?=(@)\\s*[A-Za-z_][A-Za-z0-9_]*(\\.[A-Za-z_][A-Za-z0-9_]*)*)",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.decorator.python"
          }
        },
        "end": "(?=\\s|$\\n?|#)",
        "patterns": [
          {
            "include": "#dotted_name"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.function-call.python",
    "begin": "(?<=\\)|\\])\\s*(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.begin.python"
      }
    },
    "end": "(\\))",
    "contentName": "meta.function-call.arguments.python",
    "patterns": [
      {
        "include": "#keyword_arguments"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.function-call.python",
    "begin": "(?=[A-Za-z_][A-Za-z0-9_]*(?:\\.[a-zA-Z_][a-zA-Z_0-9]*)*\\s*\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.python"
      }
    },
    "end": "(\\))",
    "patterns": [
      {
        "begin": "(?=[A-Za-z_][A-Za-z0-9_]*(?:\\.[A-Za-z_][A-Za-z0-9_]*)*\\s*\\()",
        "end": "(?=\\s*\\()",
        "patterns": [
          {
            "include": "#dotted_name"
          }
        ]
      },
      {
        "begin": "(\\()",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.arguments.begin.python"
          }
        },
        "end": "(?=\\))",
        "contentName": "meta.function-call.arguments.python",
        "patterns": [
          {
            "include": "#keyword_arguments"
          },
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.item-access.python",
    "begin": "(?=[A-Za-z_][A-Za-z0-9_]*(?:\\.[a-zA-Z_][a-zA-Z_0-9]*)*\\s*\\[)",
    "end": "(\\])",
    "patterns": [
      {
        "begin": "(?=[A-Za-z_][A-Za-z0-9_]*(?:\\.[A-Za-z_][A-Za-z0-9_]*)*\\s*\\[)",
        "end": "(?=\\s*\\[)",
        "patterns": [
          {
            "include": "#dotted_name"
          }
        ]
      },
      {
        "begin": "(\\[)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.arguments.end.python"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.arguments.begin.python"
          }
        },
        "end": "(?=\\])",
        "contentName": "meta.item-access.arguments.python",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.item-access.python",
    "begin": "(?<=\\)|\\])\\s*(\\[)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.begin.python"
      }
    },
    "end": "(\\])",
    "contentName": "meta.item-access.arguments.python",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "captures": {
      "1": {
        "name": "storage.type.function.python"
      }
    },
    "match": "\\b(def|lambda)\\b"
  },
  {
    "captures": {
      "1": {
        "name": "storage.type.class.python"
      }
    },
    "match": "\\b(class)\\b"
  },
  {
    "include": "#line_continuation"
  },
  {
    "include": "#language_variables"
  },
  {
    "name": "constant.language.python",
    "match": "\\b(None|True|False|Ellipsis|NotImplemented)\\b"
  },
  {
    "include": "#string_quoted_single"
  },
  {
    "include": "#string_quoted_double"
  },
  {
    "include": "#dotted_name"
  },
  {
    "begin": "(\\()",
    "end": "(\\))",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "captures": {
      "1": {
        "name": "punctuation.definition.list.begin.python"
      },
      "2": {
        "name": "meta.empty-list.python"
      },
      "3": {
        "name": "punctuation.definition.list.end.python"
      }
    },
    "match": "(\\[)(\\s*(\\]))\\b"
  },
  {
    "name": "meta.structure.list.python",
    "begin": "(\\[)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.list.end.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.list.begin.python"
      }
    },
    "end": "(\\])",
    "patterns": [
      {
        "begin": "(?<=\\[|\\,)\\s*(?![\\],])",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.list.python"
          }
        },
        "end": "\\s*(?:(,)|(?=\\]))",
        "contentName": "meta.structure.list.item.python",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.structure.tuple.python",
    "captures": {
      "1": {
        "name": "punctuation.definition.tuple.begin.python"
      },
      "2": {
        "name": "meta.empty-tuple.python"
      },
      "3": {
        "name": "punctuation.definition.tuple.end.python"
      }
    },
    "match": "(\\()(\\s*(\\)))"
  },
  {
    "name": "meta.structure.dictionary.python",
    "captures": {
      "1": {
        "name": "punctuation.definition.dictionary.begin.python"
      },
      "2": {
        "name": "meta.empty-dictionary.python"
      },
      "3": {
        "name": "punctuation.definition.dictionary.end.python"
      }
    },
    "match": "(\\{)(\\s*(\\}))"
  },
  {
    "name": "meta.structure.dictionary.python",
    "begin": "(\\{)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.dictionary.end.python"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.dictionary.begin.python"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "begin": "(?<=\\{|\\,|^)\\s*(?![\\},])",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.valuepair.dictionary.python"
          }
        },
        "end": "\\s*(?:(?=\\})|(\\:))",
        "contentName": "meta.structure.dictionary.key.python",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      },
      {
        "begin": "(?<=\\:|^)\\s*",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.dictionary.python"
          }
        },
        "end": "\\s*(?:(?=\\})|(,))",
        "contentName": "meta.structure.dictionary.value.python",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  }
];

exports.PythonSyntax = new TextmateSyntax(repositories, patterns);
