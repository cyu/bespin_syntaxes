"define metadata";
({
    "description": "Quake Style .cfg syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "cfg",
            "pointer": "#Quake Style .cfgSyntax",
            "fileexts": [
  "cfg"
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
    "name": "keyword.other.quake3",
    "comment": "the 2nd part of the regex is just to capture binds to number-keys and prevent them from getting highlighted as values.",
    "match": "\\b(set(a|u|s)?|bind|undbind|unbindall|vstr|exec|kill|say|say_team|quit|echo)(\\s+\\d)?\\b"
  },
  {
    "name": "constant.numeric.quake3",
    "match": "\\b\\d+(\\.\\d+)?\\b"
  },
  {
    "name": "string.quoted.double.quake3",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.quake3"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.quake3"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.quake3",
        "match": "\\\\."
      },
      {
        "name": "keyword.other.string-embedded.quake3",
        "match": "\\b(set(a|u|s)?|bind|unbindall|vstr|exec|kill|say|say_team|quit|echo)\\b"
      }
    ]
  },
  {
    "name": "comment.line.double-slash.quake3",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.quake3"
      }
    },
    "match": "(//).*$\\n?"
  }
];

exports.Quake Style .cfgSyntax = new TextmateSyntax(repositories, patterns);
