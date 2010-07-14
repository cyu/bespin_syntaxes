"define metadata";
({
    "description": "Standard ML syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "sml",
            "pointer": "#Standard MLSyntax",
            "fileexts": [
  "sml",
  "sig"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "spec": {
    "patterns": [
      {
        "name": "meta.spec.ml.type",
        "captures": {
          "1": {
            "name": "keyword.other.ml"
          }
        },
        "match": "\\b(type)\\b"
      },
      {
        "name": "meta.spec.ml.datatype",
        "captures": {
          "1": {
            "name": "keyword.other.ml"
          }
        },
        "match": "\\b(datatype)\\b"
      },
      {
        "name": "meta.spec.ml.val",
        "captures": {
          "1": {
            "name": "keyword.other.ml"
          }
        },
        "match": "\\b(val)\\s*\\w+:"
      },
      {
        "name": "meta.spec.ml.structure",
        "captures": {
          "1": {
            "name": "keyword.other.ml"
          }
        },
        "match": "\\b(structure)\\s*\\w+:"
      },
      {
        "name": "meta.spec.ml.include",
        "captures": {
          "1": {
            "name": "keyword.other.ml"
          }
        },
        "match": "\\b(include)\\b"
      }
    ]
  }
};

var patterns = [
  {
    "name": "comment.block.ml",
    "begin": "\\(\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.ml"
      }
    },
    "end": "\\*\\)"
  },
  {
    "name": "keyword.other.ml",
    "match": "\\b(val|datatype|struct|as|let|in|abstype|local|where|case|of|fn|raise|exception|handle|ref|infix)\\b"
  },
  {
    "name": "meta.module.sigdec.ml",
    "begin": "\\b(sig)\\b",
    "captures": {
      "1": {
        "name": "keyword.other.delimiter.ml"
      },
      "2": {
        "name": "keyword.other.delimiter.ml"
      }
    },
    "end": "\\b(end)\\b",
    "patterns": [
      {
        "include": "#spec"
      }
    ]
  },
  {
    "name": "keyword.control.ml",
    "match": "\\b(if|then|else)\\b"
  },
  {
    "name": "meta.definition.fun.ml",
    "captures": {
      "1": {
        "name": "keyword.control.fun.ml"
      },
      "2": {
        "name": "entity.name.function.ml"
      }
    },
    "match": "\\b(fun|and)\\s+([\\w']+)\\b"
  },
  {
    "name": "string.quoted.double.ml",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ml"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ml"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.ml",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "constant.character.ml",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.ml"
      },
      "3": {
        "name": "punctuation.definition.constant.ml"
      }
    },
    "match": "(#\")(\\\\)?.(\")"
  },
  {
    "name": "constant.numeric.ml",
    "match": "\\b\\d*\\.?\\d+\\b"
  },
  {
    "name": "keyword.operator.logical.ml",
    "match": "\\b(andalso|orelse|not)\\b"
  },
  {
    "name": "meta.module.dec.ml",
    "begin": "(?x)\\b\n\t\t\t\t\t(functor|structure|signature|funsig)\\s+\n\t\t\t\t\t(\\w+)\\s* # identifier",
    "captures": {
      "1": {
        "name": "storage.type.module.binder.ml"
      },
      "2": {
        "name": "entity.name.type.module.ml"
      }
    },
    "end": "(?==|:)"
  },
  {
    "name": "keyword.other.module.ml",
    "match": "\\b(open)\\b"
  },
  {
    "name": "constant.language.ml",
    "match": "\\b(nil|true|false|NONE|SOME)\\b"
  },
  {
    "name": "meta.typeabbrev.ml",
    "begin": "^\\s*(type|eqtype) .* =",
    "captures": {
      "1": {
        "name": "keyword.other.typeabbrev.ml"
      },
      "2": {
        "name": "variable.other.typename.ml"
      }
    },
    "end": "$",
    "patterns": [
      {
        "name": "meta.typeexp.ml",
        "match": "(([a-zA-Z0-9\\.\\* ]|(\\->))*)"
      }
    ]
  },
  {
    "name": "meta.type.ascription.ml",
    "comment": "type annotation/ascription",
    "captures": {
      "2": {
        "name": "constant.other.type.ml"
      }
    },
    "match": "[^:](:)\\s*(([a-zA-Z0-9\\.\\*\\_ ]|(\\->))*)"
  }
];

exports.Standard MLSyntax = new TextmateSyntax(repositories, patterns);
