"define metadata";
({
    "description": "Scheme syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "scm",
            "pointer": "#SchemeSyntax",
            "fileexts": [
  "scm",
  "sch"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "comment": {
    "name": "comment.line.semicolon.scheme",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.semicolon.scheme"
      }
    },
    "match": "(;).*$\\n?"
  },
  "illegal": {
    "name": "invalid.illegal.parenthesis.scheme",
    "match": "[()]"
  },
  "language-functions": {
    "patterns": [
      {
        "name": "keyword.control.scheme",
        "match": "(?x)\n\t\t\t\t\t\t(?<=(\\s|\\()) # preceded by space or ( \n\t\t\t\t\t\t( do|or|and|else|quasiquote|begin|if|case|set!|\n\t\t\t\t\t\t  cond|let|unquote|define|let\\*|unquote-splicing|delay|\n\t\t\t\t\t\t  letrec)\n\t\t\t\t\t\t(?=(\\s|\\())"
      },
      {
        "name": "support.function.boolean-test.scheme",
        "comment": "\n\t\t\t\t\t\tThese functions run a test, and return a boolean\n\t\t\t\t\t\tanswer.\n\t\t\t\t\t",
        "match": "(?x)\n\t\t\t\t\t\t(?<=(\\s|\\()) # preceded by space or (\n\t\t\t\t\t\t( char-alphabetic|char-lower-case|char-numeric|\n\t\t\t\t\t\t  char-ready|char-upper-case|char-whitespace|\n\t\t\t\t\t\t  (?:char|string)(?:-ci)?(?:=|<=?|>=?)|\n\t\t\t\t\t\t  atom|boolean|bound-identifier=|char|complex|\n\t\t\t\t\t\t  identifier|integer|symbol|free-identifier=|inexact|\n\t\t\t\t\t\t  eof-object|exact|list|(?:input|output)-port|pair|\n\t\t\t\t\t\t  real|rational|zero|vector|negative|odd|null|string|\n\t\t\t\t\t\t  eq|equal|eqv|even|number|positive|procedure\n\t\t\t\t\t\t)\n\t\t\t\t\t\t(\\?)\t\t# name ends with ? sign\n\t\t\t\t\t\t(?=(\\s|\\()) # followed by space or (\n\t\t\t\t\t"
      },
      {
        "name": "support.function.convert-type.scheme",
        "comment": "\n\t\t\t\t\t\tThese functions change one type into another.\n\t\t\t\t\t",
        "match": "(?x)\n\t\t\t\t\t\t(?<=(\\s|\\()) # preceded by space or (\n\t\t\t\t\t\t( char->integer|exact->inexact|inexact->exact|\n\t\t\t\t\t\t  integer->char|symbol->string|list->vector|\n\t\t\t\t\t\t  list->string|identifier->symbol|vector->list|\n\t\t\t\t\t\t  string->list|string->number|string->symbol|\n\t\t\t\t\t\t  number->string\n\t\t\t\t\t\t)\n\t\t\t\t\t\t(?=(\\s|\\()) # followed by space or (\t\t\t\t\t\n\t\t\t\t\t"
      },
      {
        "name": "support.function.with-side-effects.scheme",
        "comment": "\n\t\t\t\t\t\tThese functions are potentially dangerous because\n\t\t\t\t\t\tthey have side-effects which could affect other\n\t\t\t\t\t\tparts of the program.\n\t\t\t\t\t",
        "match": "(?x)\n\t\t\t\t\t\t(?<=(\\s|\\()) # preceded by space or (\n\t\t\t\t\t\t( set-(?:car|cdr)|\t\t\t\t # set car/cdr\n\t\t\t\t\t\t  (?:vector|string)-(?:fill|set) # fill/set string/vector\n\t\t\t\t\t\t)\n\t\t\t\t\t\t(!)\t\t\t# name ends with ! sign\n\t\t\t\t\t\t(?=(\\s|\\()) # followed by space or (\n\t\t\t\t\t"
      },
      {
        "name": "support.function.arithmetic-operators.scheme",
        "comment": "\n\t\t\t\t\t\t+, -, *, /, =, >, etc. \n\t\t\t\t\t",
        "match": "(?x)\n\t\t\t\t\t\t(?<=(\\s|\\()) # preceded by space or (\n\t\t\t\t\t\t( >=?|<=?|=|[*/+-])\n\t\t\t\t\t\t(?=(\\s|\\()) # followed by space or (\n\t\t\t\t\t\t"
      },
      {
        "name": "support.function.general.scheme",
        "match": "(?x)\n\t\t\t\t\t\t(?<=(\\s|\\()) # preceded by space or (\n\t\t\t\t\t\t( append|apply|approximate|\n\t\t\t\t\t\t  call-with-current-continuation|call/cc|catch|\n\t\t\t\t\t\t  construct-identifier|define-syntax|display|foo|\n\t\t\t\t\t\t  for-each|force|cd|gen-counter|gen-loser|\n\t\t\t\t\t\t  generate-identifier|last-pair|length|let-syntax|\n\t\t\t\t\t\t  letrec-syntax|list|list-ref|list-tail|load|log|\n\t\t\t\t\t\t  macro|magnitude|map|map-streams|max|member|memq|\n\t\t\t\t\t\t  memv|min|newline|nil|not|peek-char|rationalize|\n\t\t\t\t\t\t  read|read-char|return|reverse|sequence|substring|\n\t\t\t\t\t\t  syntax|syntax-rules|transcript-off|transcript-on|\n\t\t\t\t\t\t  truncate|unwrap-syntax|values-list|write|write-char|\n\t\t\t\t\t\t  \n\t\t\t\t\t\t  # cons, car, cdr, etc\n\t\t\t\t\t\t  cons|c(a|d){1,4}r| \n                          \n\t\t\t\t\t\t  # unary math operators\n\t\t\t\t\t\t  abs|acos|angle|asin|assoc|assq|assv|atan|ceiling|\n\t\t\t\t\t\t  cos|floor|round|sin|sqrt|tan|\n\t\t\t\t\t\t  (?:real|imag)-part|numerator|denominator\n                          \n\t\t\t\t\t\t  # other math operators\n\t\t\t\t\t\t  modulo|exp|expt|remainder|quotient|lcm|\n                          \n\t\t\t\t\t\t  # ports / files\n\t\t\t\t\t\t  call-with-(?:input|output)-file|\n\t\t\t\t\t\t  (?:close|current)-(?:input|output)-port|\n\t\t\t\t\t\t  with-(?:input|output)-from-file|\n\t\t\t\t\t\t  open-(?:input|output)-file|\n\t\t\t\t\t\t  \n\t\t\t\t\t\t  # char-«foo»\n\t\t\t\t\t\t  char-(?:downcase|upcase|ready)|\n\t\t\t\t\t\t  \n\t\t\t\t\t\t  # make-«foo»\n\t\t\t\t\t\t  make-(?:polar|promise|rectangular|string|vector)\n\t\t\t\t\t\t  \n\t\t\t\t\t\t  # string-«foo», vector-«foo»\n\t\t\t\t\t\t  string(?:-(?:append|copy|length|ref))?|\n\t\t\t\t\t\t  vector(?:-length|-ref)\n\t\t\t\t\t\t)\n\t\t\t\t\t\t(?=(\\s|\\()) # followed by space or (\n\t\t\t\t\t"
      }
    ]
  },
  "quote-sexp": {
    "comment": "\n\t\t\t\tSomething quoted with (quote «thing»).  In this case «thing»\n\t\t\t\twill not be evaluated, so we are considering it a string.\n\t\t\t",
    "begin": "(?<=\\()\\s*(quote)\\b\\s*",
    "beginCaptures": {
      "1": {
        "name": "keyword.control.quote.scheme"
      }
    },
    "end": "(?=[\\s)])|(?<=\\n)",
    "contentName": "string.other.quote.scheme",
    "patterns": [
      {
        "include": "#quoted"
      }
    ]
  },
  "string": {
    "begin": "(\")",
    "name": "string.quoted.double.scheme",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.string.end.scheme"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.string.begin.scheme"
      }
    },
    "end": "(\")",
    "patterns": [
      {
        "name": "constant.character.escape.scheme",
        "match": "\\\\."
      }
    ]
  },
  "constants": {
    "patterns": [
      {
        "name": "constant.language.boolean.scheme",
        "match": "#[t|f]"
      },
      {
        "name": "constant.numeric.scheme",
        "match": "(?<=[\\(\\s])(#e|#i)?[0-9][0-9.]*"
      },
      {
        "name": "constant.numeric.scheme",
        "match": "(?<=[\\(\\s])(#x)[0-9a-fA-F]+"
      },
      {
        "name": "constant.numeric.scheme",
        "match": "(?<=[\\(\\s])(#o)[0-7]+"
      },
      {
        "name": "constant.numeric.scheme",
        "match": "(?<=[\\(\\s])(#b)[01]+"
      }
    ]
  },
  "quoted": {
    "patterns": [
      {
        "include": "#string"
      },
      {
        "name": "meta.expression.scheme",
        "begin": "(\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.section.expression.end.scheme"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.expression.begin.scheme"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "include": "#quoted"
          }
        ]
      },
      {
        "include": "#quote"
      },
      {
        "include": "#illegal"
      }
    ]
  },
  "quote": {
    "comment": "\n\t\t\t\tWe need to be able to quote any kind of item, which creates\n\t\t\t\ta tiny bit of complexity in our grammar.  It is hopefully\n\t\t\t\tnot overwhelming complexity.\n\t\t\t\t\n\t\t\t\tNote: the first two matches are special cases.  quoted\n\t\t\t\tsymbols, and quoted empty lists are considered constant.other\n\t\t\t\t\n\t\t\t",
    "patterns": [
      {
        "name": "constant.other.symbol.scheme",
        "captures": {
          "1": {
            "name": "punctuation.section.quoted.symbol.scheme"
          }
        },
        "match": "(?x)\n\t\t\t\t\t\t(')\\s*\n\t\t\t\t\t\t([[:alnum:]][[:alnum:]!$%&*+-./:<=>?@^_~]*)\n\t\t\t\t\t"
      },
      {
        "name": "constant.other.empty-list.schem",
        "captures": {
          "1": {
            "name": "punctuation.section.quoted.empty-list.scheme"
          },
          "2": {
            "name": "meta.expression.scheme"
          },
          "3": {
            "name": "punctuation.section.expression.begin.scheme"
          },
          "4": {
            "name": "punctuation.section.expression.end.scheme"
          }
        },
        "match": "(?x)\n\t\t\t\t\t\t(')\\s*\n\t\t\t\t\t\t((\\()\\s*(\\)))\n\t\t\t\t\t"
      },
      {
        "name": "string.other.quoted-object.scheme",
        "begin": "(')\\s*",
        "comment": "quoted double-quoted string or s-expression",
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.quoted.scheme"
          }
        },
        "end": "(?=[\\s()])|(?<=\\n)",
        "patterns": [
          {
            "include": "#quoted"
          }
        ]
      }
    ]
  },
  "sexp": {
    "begin": "(\\()",
    "name": "meta.expression.scheme",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.expression.end.scheme"
      },
      "2": {
        "name": "meta.after-expression.scheme"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.expression.begin.scheme"
      }
    },
    "end": "(\\))(\\n)?",
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "name": "meta.declaration.procedure.scheme",
        "begin": "(?x)\n\t\t\t\t\t\t(?<=\\()       # preceded by (\n\t\t\t\t\t\t(define)\\s+   # define\n\t\t\t\t\t\t\\(            # list of parameters\n\t\t\t\t\t\t  ([[:alnum:]][[:alnum:]!$%&*+-./:<=>?@^_~]*)\n\t\t\t\t\t\t  ((\\s+\n\t\t\t\t\t\t    ([[:alnum:]][[:alnum:]!$%&*+-./:<=>?@^_~]*|[._])\n\t\t\t\t\t\t   )*\n\t\t\t\t\t\t  )\\s*\n\t\t\t\t\t\t\\)\n\t\t\t\t\t",
        "captures": {
          "1": {
            "name": "keyword.control.scheme"
          },
          "2": {
            "name": "entity.name.function.scheme"
          },
          "3": {
            "name": "variable.parameter.function.scheme"
          }
        },
        "end": "(?=\\))",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "include": "#sexp"
          },
          {
            "include": "#illegal"
          }
        ]
      },
      {
        "name": "meta.declaration.procedure.scheme",
        "begin": "(?x)\n\t\t\t\t\t\t(?<=\\() # preceded by (\n\t\t\t\t\t\t(lambda)\\s+\n\t\t\t\t\t\t(\\() # opening paren\n\t\t\t\t\t\t((?:\n\t\t\t\t\t\t  ([[:alnum:]][[:alnum:]!$%&*+-./:<=>?@^_~]*|[._])\n\t\t\t\t\t\t  \\s*\n\t\t\t\t\t\t)*)\n\t\t\t\t\t\t(\\)) # closing paren\n\t\t\t\t\t",
        "comment": "\n\t\t\t\t\t\tNot sure this one is quite correct.  That \\s* is\n\t\t\t\t\t\tparticularly troubling\n\t\t\t\t\t",
        "captures": {
          "1": {
            "name": "keyword.control.scheme"
          },
          "2": {
            "name": "variable.parameter.scheme"
          }
        },
        "end": "(?=\\))",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "include": "#sexp"
          },
          {
            "include": "#illegal"
          }
        ]
      },
      {
        "name": "meta.declaration.variable.scheme",
        "begin": "(?<=\\()(define)\\s([[:alnum:]][[:alnum:]!$%&*+-./:<=>?@^_~]*)\\s*.*?",
        "captures": {
          "1": {
            "name": "keyword.control.scheme"
          },
          "2": {
            "name": "variable.other.scheme"
          }
        },
        "end": "(?=\\))",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "include": "#sexp"
          },
          {
            "include": "#illegal"
          }
        ]
      },
      {
        "include": "#quote-sexp"
      },
      {
        "include": "#quote"
      },
      {
        "include": "#language-functions"
      },
      {
        "include": "#string"
      },
      {
        "include": "#constants"
      },
      {
        "name": "constant.character.named.scheme",
        "match": "(?<=[\\(\\s])(#\\\\)(space|newline|tab)(?=[\\s\\)])"
      },
      {
        "name": "constant.character.hex-literal.scheme",
        "match": "(?<=[\\(\\s])(#\\\\)x[0-9A-F]{2,4}(?=[\\s\\)])"
      },
      {
        "name": "constant.character.escape.scheme",
        "match": "(?<=[\\(\\s])(#\\\\).(?=[\\s\\)])"
      },
      {
        "name": "punctuation.separator.cons.scheme",
        "comment": "\n\t\t\t\t\t\tthe . in (a . b) which conses together two elements\n\t\t\t\t\t\ta and b. (a b c) == (a . (b . (c . nil)))\n\t\t\t\t\t",
        "match": "(?<=[ ()])\\.(?=[ ()])"
      },
      {
        "include": "#sexp"
      },
      {
        "include": "#illegal"
      }
    ]
  }
};

var patterns = [
  {
    "include": "#comment"
  },
  {
    "include": "#sexp"
  },
  {
    "include": "#string"
  },
  {
    "include": "#language-functions"
  },
  {
    "include": "#quote"
  },
  {
    "include": "#illegal"
  }
];

exports.SchemeSyntax = new TextmateSyntax(repositories, patterns);
