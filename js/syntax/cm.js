"define metadata";
({
    "description": "CM syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "cm",
            "pointer": "#CMSyntax",
            "fileexts": [
  "cm"
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
    "name": "comment.block.cm",
    "begin": "\\(\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.cm"
      }
    },
    "end": "\\*\\)"
  },
  {
    "name": "keyword.other.cm",
    "match": "\\b(Library|is|Group|structure|signature|functor)\\b"
  },
  {
    "name": "meta.directive.cm",
    "begin": "^\\s*(#(if).*)",
    "captures": {
      "1": {
        "name": "meta.preprocessor.cm"
      },
      "2": {
        "name": "keyword.control.import.if.cm"
      }
    },
    "end": "^\\s*(#(endif))"
  },
  {
    "name": "string.quoted.double.cm",
    "begin": "\"",
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.cm",
        "match": "\\\\."
      }
    ]
  }
];

exports.CMSyntax = new TextmateSyntax(repositories, patterns);
