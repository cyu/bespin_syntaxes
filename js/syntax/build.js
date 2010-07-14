"define metadata";
({
    "description": "NAnt Build File syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "build",
            "pointer": "#NAnt Build FileSyntax",
            "fileexts": [
  "build"
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
    "name": "comment.block.nant",
    "begin": "<!--",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.nant"
      }
    },
    "end": "-->"
  },
  {
    "name": "meta.tag.nant",
    "begin": "(</?)([-_a-zA-Z0-9:]+)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.nant"
      },
      "2": {
        "name": "entity.name.tag.nant"
      }
    },
    "end": "(/?>)",
    "patterns": [
      {
        "name": "entity.other.attribute-name.nant",
        "match": " ([a-zA-Z-]+)"
      },
      {
        "name": "string.quoted.double.nant",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.nant"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.nant"
          }
        },
        "end": "\""
      },
      {
        "name": "string.quoted.single.nant",
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.nant"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.nant"
          }
        },
        "end": "'"
      }
    ]
  },
  {
    "name": "constant.character.entity.nant",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.nant"
      },
      "3": {
        "name": "punctuation.definition.constant.nant"
      }
    },
    "match": "(&)([a-zA-Z]+|#[0-9]+|#x[0-9a-fA-F]+)(;)"
  },
  {
    "name": "invalid.illegal.bad-ampersand.nant",
    "match": "&"
  }
];

exports.NAnt Build FileSyntax = new TextmateSyntax(repositories, patterns);
