"define metadata";
({
    "description": "Active4D Library syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "a4l",
            "pointer": "#Active4D LibrarySyntax",
            "fileexts": [
  "a4l"
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
    "name": "keyword.other.active4d",
    "match": "(?i:end library|library)"
  },
  {
    "include": "source.active4d"
  }
];

exports.Active4D LibrarySyntax = new TextmateSyntax(repositories, patterns);
