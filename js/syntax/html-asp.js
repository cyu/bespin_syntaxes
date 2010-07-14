"define metadata";
({
    "description": "HTML (ASP) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "asp",
            "pointer": "#HTML (ASP)Syntax",
            "fileexts": [
  "asp"
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
    "name": "source.asp.embedded.html",
    "begin": "<%=?",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.asp"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.asp"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "comment.line.apostrophe.asp",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.asp"
          }
        },
        "match": "(').*?(?=%>)"
      },
      {
        "include": "source.asp"
      }
    ]
  },
  {
    "include": "text.html.basic"
  }
];

exports.HTML (ASP)Syntax = new TextmateSyntax(repositories, patterns);
