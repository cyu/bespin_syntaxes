"define metadata";
({
    "description": "Ini syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "ini",
            "pointer": "#IniSyntax",
            "fileexts": [
  "ini",
  "conf"
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
    "name": "comment.line.number-sign.ini",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.ini"
      }
    },
    "match": "(#).*$\\n?"
  },
  {
    "name": "comment.line.semicolon.ini",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.ini"
      }
    },
    "match": "(;).*$\\n?"
  },
  {
    "captures": {
      "1": {
        "name": "keyword.other.definition.ini"
      },
      "2": {
        "name": "punctuation.separator.key-value.ini"
      }
    },
    "match": "\\b([a-zA-Z0-9_.-]+)\\b\\s*(=)"
  },
  {
    "name": "entity.name.section.group-title.ini",
    "captures": {
      "1": {
        "name": "punctuation.definition.entity.ini"
      },
      "3": {
        "name": "punctuation.definition.entity.ini"
      }
    },
    "match": "^(\\[)(.*?)(\\])"
  },
  {
    "name": "string.quoted.single.ini",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ini"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ini"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.ini",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.double.ini",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ini"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ini"
      }
    },
    "end": "\""
  }
];

exports.IniSyntax = new TextmateSyntax(repositories, patterns);
