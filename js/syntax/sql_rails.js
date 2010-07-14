"define metadata";
({
    "description": "SQL (Rails) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "erbsql",
            "pointer": "#SQL (Rails)Syntax",
            "fileexts": [
  "erbsql"
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
    "name": "source.ruby.rails.embedded.sql",
    "begin": "<%+(?!>)=?",
    "end": "%>",
    "patterns": [
      {
        "name": "comment.line.number-sign.ruby",
        "match": "#.*?(?=%>)"
      },
      {
        "include": "source.ruby.rails"
      }
    ]
  },
  {
    "include": "source.sql"
  }
];

exports.SQL (Rails)Syntax = new TextmateSyntax(repositories, patterns);
