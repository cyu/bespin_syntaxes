"define metadata";
({
    "description": "Java Properties syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "properties",
            "pointer": "#Java PropertiesSyntax",
            "fileexts": [
  "properties"
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
    "name": "comment.line.number-sign.java-props",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.java-props"
      }
    },
    "match": "([#!])(.+)?$\\n?"
  },
  {
    "comment": "Not compliant with the properties file spec, but this works for me, and I'm the one who counts around here.",
    "captures": {
      "1": {
        "name": "keyword.other.java-props"
      },
      "2": {
        "name": "punctuation.separator.key-value.java-props"
      }
    },
    "match": "^([^:=]+)([:=])(.*)$"
  }
];

exports.Java PropertiesSyntax = new TextmateSyntax(repositories, patterns);
