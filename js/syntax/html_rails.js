"define metadata";
({
    "description": "HTML (Rails) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "rhtml",
            "pointer": "#HTML (Rails)Syntax",
            "fileexts": [
  "rhtml"
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
    "name": "comment.block.erb",
    "begin": "<%+#",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.erb"
      }
    },
    "end": "%>"
  },
  {
    "name": "source.ruby.rails.embedded.html",
    "begin": "<%+(?!>)=?",
    "captures": {
      "0": {
        "name": "punctuation.section.embedded.ruby"
      }
    },
    "end": "-?%>",
    "patterns": [
      {
        "name": "comment.line.number-sign.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.ruby"
          }
        },
        "match": "(#).*?(?=-?%>)"
      },
      {
        "include": "source.ruby.rails"
      }
    ]
  },
  {
    "include": "text.html.basic"
  }
];

exports.HTML (Rails)Syntax = new TextmateSyntax(repositories, patterns);
