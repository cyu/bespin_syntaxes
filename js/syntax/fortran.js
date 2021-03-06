"define metadata";
({
    "description": "Fortran syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "f",
            "pointer": "#FortranSyntax",
            "fileexts": [
  "f",
  "F",
  "f77",
  "F77",
  "f90",
  "F90",
  "f95",
  "F95",
  "for",
  "FOR",
  "fpp",
  "FPP",
  "dmod1",
  "dt"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = null;

var patterns = [
  {
    "name": "meta.function.fortran",
    "begin": "(?x)\n                (?: (?i:subroutine\\s+) | (?i:function\\s+) )\n              \t([A-Za-z_][A-Za-z0-9_:]+)\n              \t \\s*((\\()(?=[^)\\n]*))?\n              ",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.parameters.fortran"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "entity.name.function.fortran"
      },
      "2": {
        "name": "punctuation.definition.parameters.fortran"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "keyword.control.fortran",
    "match": "\\b(?i:(use|if|for|do|go\\sto|then|else|function|end|enddo|endif|contains|assign|backspace|call|close|continue|endfile|inquire|open|print|read|return|rewind|stop|write))\\b"
  },
  {
    "name": "comment.line.c.fortran.punchcard-style",
    "begin": "^[Cc]",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.fortran"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "match": "\\\\\\s*\\n"
      }
    ]
  },
  {
    "name": "comment.line.asterisk.fortran.modern",
    "begin": "^[*]",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.fortran"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "match": "\\\\\\s*\\n"
      }
    ]
  },
  {
    "name": "comment.line.exclamation.fortran.modern",
    "begin": "[!]",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.fortran"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "match": "\\\\\\s*\\n"
      }
    ]
  },
  {
    "name": "string.quoted.single.fortran",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.fortran"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.fortran"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.fortran",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.double.fortran",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.fortran"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.fortran"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.fortran",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "storage.type.fortran",
    "match": "\\b(?i:data|double|block\\sdata|double\\sprecision|type(?=\\s*\\()|entry|equivalence|integer|real|character|intrinsic|logical|parameter)\\b"
  },
  {
    "name": "storage.modifier.fortran",
    "match": "\\b(?i:(private|public|external|format|implicit|common|intent|in|out|inout))\\b"
  },
  {
    "name": "keyword.other.fortran.90",
    "match": "\\b(?i:(recursive|optional|interface|procedure|module|pointer|target))\\b"
  },
  {
    "name": "keyword.other.fortran",
    "match": "\\b(?i:(program|save|subroutine|function|module|none))\\b"
  },
  {
    "name": "constant.language.fortran",
    "match": "\\b(?i:(r8|r4|TRUE|FALSE))\\b"
  },
  {
    "name": "keyword.operator.fortran",
    "match": "(?i:(\\.and\\.|\\.or\\.|\\.eq\\.|\\.lt\\.|\\.le\\.|\\.gt\\.|\\.ge\\.|\\.ne\\.|\\.not\\.|\\.eqv\\.|\\.neqv\\.))"
  },
  {
    "name": "keyword.operator.fortran.90",
    "match": "(\\=\\=|\\/\\=|\\>\\=|\\>|\\<|\\<\\=|\\%|\\=\\>|\\=|\\:\\:)"
  },
  {
    "name": "constant.numeric.fortran",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|([0-9\\.]*_[ri][0-9]+)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
  },
  {
    "name": "meta.tag.preprocessor.macro.fortran",
    "begin": "(?x)\n        \t\t^\\s*\\#\\s*(define)\\s+             # define\n        \t\t((?<id>[a-zA-Z_][a-zA-Z0-9_]*))  # macro name\n        \t\t\\((\n        \t\t\t\\s* \\g<id> \\s*              # first argument\n        \t\t\t(, \\s* \\g<id> \\s*)*         # additional arguments\n        \t\t)\\)\n        \t",
    "end": "(?=(?://|/\\*))|$"
  },
  {
    "name": "meta.preprocessor.include.fortran",
    "begin": "^\\s*(#)\\s*(include|import)\\b\\s+",
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.preprocessor.fortran"
      },
      "2": {
        "name": "keyword.control.import.fortran"
      }
    },
    "end": "(?=(?://|/\\*))|$",
    "patterns": [
      {
        "match": "\\\\\\s*\\n"
      },
      {
        "name": "string.quoted.double.include.fortran",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.fortran"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.fortran"
          }
        },
        "end": "\""
      },
      {
        "name": "string.quoted.other.lt-gt.include.fortran",
        "begin": "<",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.fortran"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.fortran"
          }
        },
        "end": ">"
      }
    ]
  },
  {
    "name": "meta.preprocessor.fortran",
    "begin": "^\\s*#\\s*(define|defined|elif|else|if|ifdef|ifndef|line|pragma|undef|endif)\\b",
    "end": "(?=(?://|/\\*))|$",
    "patterns": [
      {
        "match": "\\\\\\s*\\n"
      }
    ]
  },
  {
    "name": "keyword.other.non-executable.fortran",
    "match": "\\b(?i:(dimension|function))\\b"
  }
];

exports.FortranSyntax = new TextmateSyntax(repositories, patterns);
