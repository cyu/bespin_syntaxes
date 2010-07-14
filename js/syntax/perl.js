"define metadata";
({
    "description": "Perl syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "pl",
            "pointer": "#PerlSyntax",
            "fileexts": [
  "pl",
  "pm",
  "pod",
  "t",
  "PL"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "nested_ltgt": {
    "begin": "<",
    "captures": {
      "1": {
        "name": "punctuation.section.scope.perl"
      }
    },
    "end": ">",
    "patterns": [
      {
        "include": "#nested_ltgt"
      }
    ]
  },
  "nested_brackets": {
    "begin": "\\[",
    "captures": {
      "1": {
        "name": "punctuation.section.scope.perl"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_brackets"
      }
    ]
  },
  "line_comment": {
    "patterns": [
      {
        "name": "meta.comment.full-line.perl",
        "captures": {
          "1": {
            "name": "comment.line.number-sign.perl"
          },
          "2": {
            "name": "punctuation.definition.comment.perl"
          }
        },
        "match": "^((#).*$\\n?)"
      },
      {
        "name": "comment.line.number-sign.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.perl"
          }
        },
        "match": "(#).*$\\n?"
      }
    ]
  },
  "nested_braces_interpolated": {
    "begin": "\\{",
    "captures": {
      "1": {
        "name": "punctuation.section.scope.perl"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "#nested_braces_interpolated"
      }
    ]
  },
  "nested_brackets_interpolated": {
    "begin": "\\[",
    "captures": {
      "1": {
        "name": "punctuation.section.scope.perl"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "#nested_brackets_interpolated"
      }
    ]
  },
  "nested_parens_interpolated": {
    "begin": "\\(",
    "captures": {
      "1": {
        "name": "punctuation.section.scope.perl"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "#nested_parens_interpolated"
      }
    ]
  },
  "nested_parens": {
    "begin": "\\(",
    "captures": {
      "1": {
        "name": "punctuation.section.scope.perl"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_parens"
      }
    ]
  },
  "nested_ltgt_interpolated": {
    "begin": "<",
    "captures": {
      "1": {
        "name": "punctuation.section.scope.perl"
      }
    },
    "end": ">",
    "patterns": [
      {
        "include": "#variable"
      },
      {
        "include": "#nested_ltgt_interpolated"
      }
    ]
  },
  "escaped_char": {
    "name": "constant.character.escape.perl",
    "match": "\\\\."
  },
  "variable": {
    "patterns": [
      {
        "name": "variable.other.regexp.match.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$)&(?![A-Za-z0-9_])"
      },
      {
        "name": "variable.other.regexp.pre-match.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$)`(?![A-Za-z0-9_])"
      },
      {
        "name": "variable.other.regexp.post-match.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$)'(?![A-Za-z0-9_])"
      },
      {
        "name": "variable.other.regexp.last-paren-match.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$)\\+(?![A-Za-z0-9_])"
      },
      {
        "name": "variable.other.readwrite.list-separator.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$)\"(?![A-Za-z0-9_])"
      },
      {
        "name": "variable.other.predefined.program-name.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$)0(?![A-Za-z0-9_])"
      },
      {
        "name": "variable.other.predefined.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$)[_ab\\*\\.\\/\\|,\\\\;#%=\\-~^:?!\\$<>\\(\\)\\[\\]@](?![A-Za-z0-9_])"
      },
      {
        "name": "variable.other.subpattern.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$)[0-9]+(?![A-Za-z0-9_])"
      },
      {
        "name": "variable.other.readwrite.global.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "([\\$\\@\\%](#)?)([a-zA-Zx7f-xff\\$]|::)([a-zA-Z0-9_x7f-xff\\$]|::)*\\b"
      },
      {
        "name": "variable.other.readwrite.global.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          },
          "2": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "(\\$\\{)(?:[a-zA-Zx7f-xff\\$]|::)(?:[a-zA-Z0-9_x7f-xff\\$]|::)*(\\})"
      },
      {
        "name": "variable.other.readwrite.global.special.perl",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.perl"
          }
        },
        "match": "([\\$\\@\\%](#)?)[0-9_]\\b"
      }
    ]
  },
  "nested_braces": {
    "begin": "\\{",
    "captures": {
      "1": {
        "name": "punctuation.section.scope.perl"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_braces"
      }
    ]
  }
};

var patterns = [
  {
    "include": "#line_comment"
  },
  {
    "name": "comment.block.documentation.perl",
    "begin": "^=",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.perl"
      }
    },
    "end": "^=cut"
  },
  {
    "include": "#variable"
  },
  {
    "begin": "\\b(?=qr\\s*[^\\s\\w])",
    "comment": "string.regexp.compile.perl",
    "endCaptures": {
      "1": {
        "name": "string.regexp.compile.perl"
      },
      "2": {
        "name": "punctuation.definition.string.perl"
      },
      "3": {
        "name": "keyword.control.regexp-option.perl"
      }
    },
    "applyEndPatternLast": 1,
    "end": "((([egimosx]*)))(?=(\\s+\\S|\\s*[;\\,\\#\\{\\}\\)]|$))",
    "patterns": [
      {
        "name": "string.regexp.compile.nested_braces.perl",
        "begin": "(qr)\\s*\\{",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_braces_interpolated"
          }
        ]
      },
      {
        "name": "string.regexp.compile.nested_brackets.perl",
        "begin": "(qr)\\s*\\[",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "\\]",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_brackets_interpolated"
          }
        ]
      },
      {
        "name": "string.regexp.compile.nested_ltgt.perl",
        "begin": "(qr)\\s*<",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": ">",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_ltgt_interpolated"
          }
        ]
      },
      {
        "name": "string.regexp.compile.nested_parens.perl",
        "begin": "(qr)\\s*\\(",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "\\)",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_parens_interpolated"
          }
        ]
      },
      {
        "name": "string.regexp.compile.single-quote.perl",
        "begin": "(qr)\\s*\\'",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "\\'",
        "patterns": [
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.regexp.compile.simple-delimiter.perl",
        "begin": "(qr)\\s*([^\\s\\w\\'\\{\\[\\(\\<])",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "\\2",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_parens_interpolated"
          }
        ]
      }
    ]
  },
  {
    "begin": "\\b(?=(s)(\\s+\\S|\\s*[;\\,\\#\\{\\}\\(\\)\\[<]|$))",
    "comment": "string.regexp.replace.perl",
    "endCaptures": {
      "1": {
        "name": "string.regexp.replace.perl"
      },
      "2": {
        "name": "punctuation.definition.string.perl"
      },
      "3": {
        "name": "keyword.control.regexp-option.perl"
      }
    },
    "applyEndPatternLast": 1,
    "end": "((([egimosx]*)))(?=(\\s+\\S|\\s*[;\\,\\#\\{\\}\\)\\]>]|$))",
    "patterns": [
      {
        "name": "string.regexp.nested_braces.perl",
        "begin": "(s)\\s*\\{",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#nested_braces"
          }
        ]
      },
      {
        "name": "string.regexp.nested_brackets.perl",
        "begin": "(s)\\s*\\[",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "\\]",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#nested_brackets"
          }
        ]
      },
      {
        "name": "string.regexp.nested_ltgt.perl",
        "begin": "(s)\\s*<",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": ">",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#nested_ltgt"
          }
        ]
      },
      {
        "name": "string.regexp.nested_parens.perl",
        "begin": "(s)\\s*\\(",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "\\)",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#nested_parens"
          }
        ]
      },
      {
        "name": "string.regexp.format.nested_braces.perl",
        "begin": "\\{",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_braces_interpolated"
          }
        ]
      },
      {
        "name": "string.regexp.format.nested_brackets.perl",
        "begin": "\\[",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "\\]",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_brackets_interpolated"
          }
        ]
      },
      {
        "name": "string.regexp.format.nested_ltgt.perl",
        "begin": "<",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": ">",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_ltgt_interpolated"
          }
        ]
      },
      {
        "name": "string.regexp.format.nested_parens.perl",
        "begin": "\\(",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "\\)",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          },
          {
            "include": "#nested_parens_interpolated"
          }
        ]
      },
      {
        "name": "string.regexp.format.single_quote.perl",
        "begin": "'",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "'",
        "patterns": [
          {
            "name": "constant.character.escape.perl",
            "match": "\\\\['\\\\]"
          }
        ]
      },
      {
        "name": "string.regexp.format.simple_delimiter.perl",
        "begin": "([^\\s\\w\\[({<;])",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "\\1",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          }
        ]
      },
      {
        "match": "\\s+"
      }
    ]
  },
  {
    "begin": "\\b(?=s([^\\s\\w\\[({<]).*\\1([egimos]*)([\\}\\)\\;\\,]|\\s+))",
    "comment": "string.regexp.replaceXXX",
    "endCaptures": {
      "1": {
        "name": "string.regexp.replace.perl"
      },
      "2": {
        "name": "punctuation.definition.string.perl"
      },
      "3": {
        "name": "keyword.control.regexp-option.perl"
      }
    },
    "end": "((([egimos]*)))(?=([\\}\\)\\;\\,]|\\s+|$))",
    "patterns": [
      {
        "name": "string.regexp.replaceXXX.simple_delimiter.perl",
        "begin": "(s\\s*)([^\\s\\w\\[({<])",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "(?=\\2)",
        "patterns": [
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.regexp.replaceXXX.format.single_quote.perl",
        "begin": "'",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "'",
        "patterns": [
          {
            "name": "constant.character.escape.perl.perl",
            "match": "\\\\['\\\\]"
          }
        ]
      },
      {
        "name": "string.regexp.replaceXXX.format.simple_delimiter.perl",
        "begin": "([^\\s\\w\\[({<])",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "\\1",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          }
        ]
      }
    ]
  },
  {
    "begin": "\\b(?=(?<!\\\\)s\\s*([^\\s\\w\\[({<]))",
    "comment": "string.regexp.replace.extended",
    "endCaptures": {
      "1": {
        "name": "string.regexp.replace.perl"
      },
      "2": {
        "name": "punctuation.definition.string.perl"
      },
      "3": {
        "name": "keyword.control.regexp-option.perl"
      }
    },
    "end": "\\2((([egimos]*x[egimos]*)))\\b",
    "patterns": [
      {
        "name": "string.regexp.replace.extended.simple_delimiter.perl",
        "begin": "(s)\\s*(.)",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          },
          "1": {
            "name": "support.function.perl"
          }
        },
        "end": "(?=\\2)",
        "patterns": [
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.regexp.replace.extended.simple_delimiter.perl",
        "begin": "'",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "'(?=[egimos]*x[egimos]*)\\b",
        "patterns": [
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.regexp.replace.extended.simple_delimiter.perl",
        "begin": "(.)",
        "captures": {
          "0": {
            "name": "punctuation.definition.string.perl"
          }
        },
        "end": "\\1(?=[egimos]*x[egimos]*)\\b",
        "patterns": [
          {
            "include": "#escaped_char"
          },
          {
            "include": "#variable"
          }
        ]
      }
    ]
  },
  {
    "name": "constant.other.key.perl",
    "match": "\\b\\w+\\s*(?==>)"
  },
  {
    "name": "constant.other.bareword.perl",
    "match": "(?<={)\\s*\\w+\\s*(?=})"
  },
  {
    "name": "string.regexp.find.perl",
    "captures": {
      "1": {
        "name": "punctuation.definition.string.perl"
      },
      "5": {
        "name": "punctuation.definition.string.perl"
      }
    },
    "match": "(?<!\\\\)((~\\s*)?\\/)(.*?)(?<!\\\\)(\\\\{2})*(\\/)"
  },
  {
    "name": "string.regexp.find.extended.perl",
    "begin": "(?<!\\\\)(\\~\\s*\\/)",
    "endCaptures": {
      "1": {
        "name": "keyword.control.regexp-option.perl"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      }
    },
    "end": "\\/([cgimos]*x[cgimos]*)\\b",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "meta.class.perl",
    "captures": {
      "1": {
        "name": "keyword.control.perl"
      },
      "2": {
        "name": "entity.name.type.class.perl"
      },
      "3": {
        "name": "comment.line.number-sign.perl"
      },
      "4": {
        "name": "punctuation.definition.comment.perl"
      }
    },
    "match": "^\\s*(package)\\s+(\\S+)\\s*((#).*)?$\\n?"
  },
  {
    "name": "meta.function.perl",
    "captures": {
      "1": {
        "name": "storage.type.sub.perl"
      },
      "2": {
        "name": "entity.name.function.perl"
      },
      "3": {
        "name": "storage.type.method.perl"
      }
    },
    "match": "^\\s*(sub)\\s+([-a-zA-Z0-9_]+)\\s*(\\([\\$\\@\\*;]*\\))?"
  },
  {
    "name": "meta.function.perl",
    "captures": {
      "1": {
        "name": "entity.name.function.perl"
      },
      "2": {
        "name": "punctuation.definition.parameters.perl"
      },
      "3": {
        "name": "variable.parameter.function.perl"
      }
    },
    "match": "^\\s*(BEGIN|END|DESTROY)\\b"
  },
  {
    "name": "meta.leading-tabs",
    "begin": "^(?=(\\t| {4}))",
    "end": "(?=[^\\t\\s])",
    "patterns": [
      {
        "captures": {
          "1": {
            "name": "meta.odd-tab"
          },
          "2": {
            "name": "meta.even-tab"
          }
        },
        "match": "(\\t| {4})(\\t| {4})?"
      }
    ]
  },
  {
    "name": "string.regexp.find-m.perl",
    "captures": {
      "1": {
        "name": "support.function.perl"
      },
      "2": {
        "name": "punctuation.definition.string.perl"
      },
      "5": {
        "name": "punctuation.definition.string.perl"
      }
    },
    "match": "\\b(m)\\s*(?<!\\\\)([^\\[\\{\\(A-Za-z0-9\\s])(.*?)(?<!\\\\)(\\\\{2})*(\\2)"
  },
  {
    "name": "string.regexp.find-m-paren.perl",
    "begin": "\\b(m)\\s*(?<!\\\\)\\(",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_parens_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.regexp.find-m-brace.perl",
    "begin": "\\b(m)\\s*(?<!\\\\)\\{",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_braces_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.regexp.find-m-bracket.perl",
    "begin": "\\b(m)\\s*(?<!\\\\)\\[",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_brackets_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.regexp.find-m-ltgt.perl",
    "begin": "\\b(m)\\s*(?<!\\\\)\\<",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_ltgt_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.regexp.replace.perl",
    "captures": {
      "8": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "support.function.perl"
      },
      "2": {
        "name": "punctuation.definition.string.perl"
      },
      "5": {
        "name": "punctuation.definition.string.perl"
      }
    },
    "match": "\\b(s|tr|y)\\s*([^A-Za-z0-9\\s])(.*?)(?<!\\\\)(\\\\{2})*(\\2)(.*?)(?<!\\\\)(\\\\{2})*(\\2)"
  },
  {
    "name": "constant.language.perl",
    "match": "\\b(__FILE__|__LINE__|__PACKAGE__)\\b"
  },
  {
    "name": "keyword.control.perl",
    "match": "\\b(continue|die|do|else|elsif|exit|for|foreach|goto|if|last|next|redo|return|select|unless|until|wait|while|switch|case|package|require|use|eval)\\b"
  },
  {
    "name": "storage.modifier.perl",
    "match": "\\b(my|our|local)\\b"
  },
  {
    "name": "keyword.operator.filetest.perl",
    "match": "(?<!\\w)\\-[rwx0RWXOezsfdlpSbctugkTBMAC]\\b"
  },
  {
    "name": "keyword.operator.logical.perl",
    "match": "\\b(and|or|xor|as)\\b"
  },
  {
    "name": "keyword.operator.comparison.perl",
    "match": "(<=>| =>|->)"
  },
  {
    "begin": "((<<) *\"HTML\").*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.doublequote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^HTML$)",
    "contentName": "text.html.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "begin": "((<<) *\"XML\").*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.doublequote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^XML$)",
    "contentName": "text.xml.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "text.xml"
      }
    ]
  },
  {
    "begin": "((<<) *\"CSS\").*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.doublequote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^CSS$)",
    "contentName": "text.css.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "source.css"
      }
    ]
  },
  {
    "begin": "((<<) *\"JAVASCRIPT\").*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.doublequote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^JAVASCRIPT$)",
    "contentName": "text.js.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "source.js"
      }
    ]
  },
  {
    "begin": "((<<) *\"SQL\").*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.doublequote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^SQL$)",
    "contentName": "source.sql.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "source.sql"
      }
    ]
  },
  {
    "begin": "((<<) *\"POSTSCRIPT\").*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.doublequote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^POSTSCRIPT$)",
    "contentName": "text.postscript.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "source.postscript"
      }
    ]
  },
  {
    "begin": "((<<) *\"([^\"]*)\").*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.doublequote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^\\3$)",
    "contentName": "string.unquoted.heredoc.doublequote.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "begin": "((<<) *'HTML').*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.quote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^HTML$)",
    "contentName": "text.html.embedded.perl",
    "patterns": [
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "begin": "((<<) *'XML').*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.quote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^XML$)",
    "contentName": "text.xml.embedded.perl",
    "patterns": [
      {
        "include": "text.xml"
      }
    ]
  },
  {
    "begin": "((<<) *'CSS').*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.quote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^CSS$)",
    "contentName": "text.css.embedded.perl",
    "patterns": [
      {
        "include": "source.css"
      }
    ]
  },
  {
    "begin": "((<<) *'JAVASCRIPT').*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.quote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^JAVASCRIPT$)",
    "contentName": "text.js.embedded.perl",
    "patterns": [
      {
        "include": "source.js"
      }
    ]
  },
  {
    "begin": "((<<) *'SQL').*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.quote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^SQL$)",
    "contentName": "source.sql.embedded.perl",
    "patterns": [
      {
        "include": "source.sql"
      }
    ]
  },
  {
    "begin": "((<<) *'POSTSCRIPT').*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.quote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^POSTSCRIPT)",
    "contentName": "source.postscript.embedded.perl",
    "patterns": [
      {
        "include": "source.postscript"
      }
    ]
  },
  {
    "begin": "((<<) *'([^']*)').*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.quote.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^\\3$)",
    "contentName": "string.unquoted.heredoc.quote.perl"
  },
  {
    "begin": "((<<) *`([^`]*)`).*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.backtick.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^\\3$)",
    "contentName": "string.unquoted.heredoc.backtick.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "begin": "((<<) *HTML\\b).*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^HTML$)",
    "contentName": "text.html.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "begin": "((<<) *XML\\b).*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^XML$)",
    "contentName": "text.xml.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "text.xml"
      }
    ]
  },
  {
    "begin": "((<<) *SQL\\b).*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^SQL$)",
    "contentName": "source.sql.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "source.sql"
      }
    ]
  },
  {
    "begin": "((<<) *POSTSCRIPT\\b).*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^POSTSCRIPT)",
    "contentName": "source.postscript.embedded.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      },
      {
        "include": "source.postscript"
      }
    ]
  },
  {
    "begin": "((<<) *((?![=\\d\\$ ])[^;,'\"`\\s)]*)).*\\n?",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.perl"
      },
      "1": {
        "name": "string.unquoted.heredoc.perl"
      },
      "2": {
        "name": "punctuation.definition.heredoc.perl"
      }
    },
    "end": "(^\\3$)",
    "contentName": "string.unquoted.heredoc.perl",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.quoted.other.qq.perl",
    "begin": "\\bqq\\s*([^\\(\\{\\[\\<\\w\\s])",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\1",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.interpolated.qx.perl",
    "begin": "\\bqx\\s*([^'\\(\\{\\[\\<\\w\\s])",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\1",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.interpolated.qx.single-quote.perl",
    "begin": "\\bqx\\s*'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "'",
    "patterns": [
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.quoted.double.perl",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.quoted.other.q.perl",
    "begin": "\\bqw?\\s*([^\\(\\{\\[\\<\\w\\s])",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\1",
    "patterns": [
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.quoted.single.perl",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.perl",
        "match": "\\\\['\\\\]"
      }
    ]
  },
  {
    "name": "string.interpolated.perl",
    "begin": "`",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "`",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.quoted.other.qq-paren.perl",
    "begin": "\\bqq\\s*\\(",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_parens_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.quoted.other.qq-brace.perl",
    "begin": "\\bqq\\s*\\{",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_braces_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.quoted.other.qq-bracket.perl",
    "begin": "\\bqq\\s*\\[",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_brackets_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.quoted.other.qq-ltgt.perl",
    "begin": "\\bqq\\s*\\<",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_ltgt_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.interpolated.qx-paren.perl",
    "begin": "\\bqx\\s*\\(",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_parens_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.interpolated.qx-brace.perl",
    "begin": "\\bqx\\s*\\{",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_braces_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.interpolated.qx-bracket.perl",
    "begin": "\\bqx\\s*\\[",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_brackets_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.interpolated.qx-ltgt.perl",
    "begin": "\\bqx\\s*\\<",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_ltgt_interpolated"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "string.quoted.other.q-paren.perl",
    "begin": "\\bqw?\\s*\\(",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_parens"
      }
    ]
  },
  {
    "name": "string.quoted.other.q-brace.perl",
    "begin": "\\bqw?\\s*\\{",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_braces"
      }
    ]
  },
  {
    "name": "string.quoted.other.q-bracket.perl",
    "begin": "\\bqw?\\s*\\[",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_brackets"
      }
    ]
  },
  {
    "name": "string.quoted.other.q-ltgt.perl",
    "begin": "\\bqw?\\s*\\<",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nested_ltgt"
      }
    ]
  },
  {
    "name": "string.unquoted.program-block.perl",
    "begin": "^__\\w+__",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.perl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.perl"
      }
    },
    "end": "$"
  },
  {
    "name": "meta.format.perl",
    "begin": "\\b(format)\\s+([A-Za-z]+)\\s*=",
    "beginCaptures": {
      "1": {
        "name": "support.function.perl"
      },
      "2": {
        "name": "entity.name.function.format.perl"
      }
    },
    "end": "^\\.\\s*$",
    "patterns": [
      {
        "include": "#line_comment"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "support.function.perl",
    "match": "\\b(ARGV|DATA|ENV|SIG|STDERR|STDIN|STDOUT|atan2|bind|binmode|bless|caller|chdir|chmod|chomp|chop|chown|chr|chroot|close|closedir|cmp|connect|cos|crypt|dbmclose|dbmopen|defined|delete|dump|each|endgrent|endhostent|endnetent|endprotoent|endpwent|endservent|eof|eq|eval|exec|exists|exp|fcntl|fileno|flock|fork|format|formline|ge|getc|getgrent|getgrgid|getgrnam|gethostbyaddr|gethostbyname|gethostent|getlogin|getnetbyaddr|getnetbyname|getnetent|getpeername|getpgrp|getppid|getpriority|getprotobyname|getprotobynumber|getprotoent|getpwent|getpwnam|getpwuid|getservbyname|getservbyport|getservent|getsockname|getsockopt|glob|gmtime|grep|gt|hex|import|index|int|ioctl|join|keys|kill|lc|lcfirst|le|length|link|listen|local|localtime|log|lstat|lt|m|map|mkdir|msgctl|msgget|msgrcv|msgsnd|ne|no|oct|open|opendir|ord|pack|pipe|pop|pos|print|printf|push|q|qq|quotemeta|qw|qx|rand|read|readdir|readlink|recv|ref|rename|reset|reverse|rewinddir|rindex|rmdir|s|scalar|seek|seekdir|semctl|semget|semop|send|setgrent|sethostent|setnetent|setpgrp|setpriority|setprotoent|setpwent|setservent|setsockopt|shift|shmctl|shmget|shmread|shmwrite|shutdown|sin|sleep|socket|socketpair|sort|splice|split|sprintf|sqrt|srand|stat|study|substr|symlink|syscall|sysopen|sysread|system|syswrite|tell|telldir|tie|tied|time|times|tr|truncate|uc|ucfirst|umask|undef|unlink|unpack|unshift|untie|utime|values|vec|waitpid|wantarray|warn|write|y|q|qw|qq|qx)\\b"
  }
];

exports.PerlSyntax = new TextmateSyntax(repositories, patterns);
