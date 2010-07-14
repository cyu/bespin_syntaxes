"define metadata";
({
    "description": "Rez syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "r",
            "pointer": "#RezSyntax",
            "fileexts": [
  "r"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "escaped_char": {
    "name": "constant.character.escape.rez",
    "match": "\\\\."
  }
};

var patterns = [
  {
    "name": "comment.block.rez",
    "begin": "/\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.rez"
      }
    },
    "end": "\\*/"
  },
  {
    "name": "comment.line.double-slash.rez",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.rez"
      }
    },
    "match": "(//).*$\\n?"
  },
  {
    "name": "keyword.control.rez",
    "comment": "Note that Xcode gets case sensitivity wrong (last checked Xcode 2.0). I'm not sure built-in functions are case-insensitive, though, so we might too.",
    "match": "\\b(?i:(change|data|delete|include|read|resource|type))\\b"
  },
  {
    "name": "storage.type.rez",
    "match": "\\b(?i:(align|array|binary|bit|bitstring|boolean|byte|case|char|cstring|decimal|enum|fill|hex|integer|key|literal|long|longint|nibble|octal|point|pstring|rect|string|switch|unsigned|wide|word|wstring))\\b"
  },
  {
    "name": "keyword.other.attributes.rez",
    "match": "\\b(?i:(appheap|locked|nonpurgeable|purgeable|sysheap|unlocked))\\b"
  },
  {
    "name": "support.function.built-in.rez",
    "captures": {
      "1": {
        "name": "punctuation.definition.function.rez"
      }
    },
    "match": "(\\$\\$)(?i:(ArrayIndex|Attributes|BitField|Byte|CountOf|Date|Day|Format|Hour|ID|Long|Minute|Month|Name|PackedSize|Read|Resource|ResourceSize|Second|Shell|Time|Type|Version|Weekday|Word|Year))"
  },
  {
    "name": "constant.numeric.rez",
    "match": "\\b(((0(x|X|B)|\\$)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)\\b"
  },
  {
    "name": "string.quoted.double.rez",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.rez"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.rez"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.quoted.single.rez",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.rez"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.rez"
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
    "name": "string.quoted.other.hex.rez",
    "begin": "\\$\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.rez"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.rez"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "meta.preprocessor.rez",
    "captures": {
      "1": {
        "name": "punctuation.definition.preprocessor.rez"
      },
      "2": {
        "name": "keyword.control.import.rez"
      }
    },
    "match": "^\\s*(#)\\s*(define|defined|else|elif|endif|if|ifdef|ifndef|include|line|printf|undef)\\b"
  }
];

exports.RezSyntax = new TextmateSyntax(repositories, patterns);
