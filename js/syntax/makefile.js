"define metadata";
({
    "description": "Makefile syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "GNUmakefile",
            "pointer": "#MakefileSyntax",
            "fileexts": [
  "GNUmakefile",
  "makefile",
  "Makefile",
  "OCamlMakefile"
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
    "name": "variable.other.makefile",
    "begin": "^(\\w|[-_])+\\s*\\??=",
    "end": "$",
    "patterns": [
      {
        "match": "\\\\\\n"
      }
    ]
  },
  {
    "name": "string.interpolated.backtick.makefile",
    "begin": "`",
    "end": "`",
    "patterns": [
      {
        "include": "source.shell"
      }
    ]
  },
  {
    "name": "comment.line.number-sign.makefile",
    "begin": "#",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.makefile"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "name": "punctuation.separator.continuation.makefile",
        "match": "(?<!\\\\)\\\\$\\n"
      }
    ]
  },
  {
    "name": "keyword.control.makefile",
    "match": "^(\\s*)\\b(\\-??include|ifeq|ifneq|ifdef|ifndef|else|endif|vpath|export|unexport|define|endef|override)\\b"
  },
  {
    "name": "meta.function.makefile",
    "captures": {
      "1": {
        "name": "entity.name.function.makefile"
      }
    },
    "match": "^([^\\t ]+:(?!\\=))\\s*.*"
  }
];

exports.MakefileSyntax = new TextmateSyntax(repositories, patterns);
