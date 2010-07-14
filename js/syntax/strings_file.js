"define metadata";
({
    "description": "Strings File syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "strings",
            "pointer": "#Strings FileSyntax",
            "fileexts": [
  "strings"
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
    "name": "comment.block.strings",
    "begin": "/\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.strings"
      }
    },
    "end": "\\*/"
  },
  {
    "name": "string.quoted.double.strings",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.strings"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.strings"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.strings",
        "match": "\\\\(\\\\|[abefnrtv'\"?]|[0-3]\\d{,2}|[4-7]\\d?|x[a-zA-Z0-9]+)"
      },
      {
        "name": "invalid.illegal.unknown-escape.strings",
        "match": "\\\\."
      },
      {
        "name": "constant.other.placeholder.strings",
        "match": "(?x)%\n\t\t\t\t\t\t(\\d+\\$)?                             # field (argument #)\n\t\t\t\t\t\t[#0\\- +']*                           # flags\n\t\t\t\t\t\t[,;:_]?                              # separator character (AltiVec)\n\t\t\t\t\t\t((-?\\d+)|\\*(-?\\d+\\$)?)?              # minimum field width\n\t\t\t\t\t\t(\\.((-?\\d+)|\\*(-?\\d+\\$)?)?)?         # precision\n\t\t\t\t\t\t(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)? # length modifier\n\t\t\t\t\t\t[@diouxXDOUeEfFgGaACcSspn%]          # conversion type\n\t\t\t\t\t"
      },
      {
        "name": "invalid.illegal.placeholder.c",
        "match": "%"
      }
    ]
  }
];

exports.Strings FileSyntax = new TextmateSyntax(repositories, patterns);
