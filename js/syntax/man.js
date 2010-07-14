"define metadata";
({
    "description": "Man syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "man",
            "pointer": "#ManSyntax",
            "fileexts": [
  "man"
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
    "name": "markup.heading.man",
    "match": "^[A-Z](?:(?:\\S+\\s\\S+)+|\\S+)$"
  },
  {
    "name": "markup.underline.link.man",
    "match": "((https?|ftp|file|txmt)://|mailto:)[-:@a-zA-Z0-9_.~%+/?=&#]+(?<![.?:])"
  },
  {
    "name": "markup.underline.link.internal.man",
    "match": "([\\w\\.]+\\(\\d[a-z]?\\))"
  },
  {
    "name": "meta.foldingStopMarker.man",
    "match": "^_{2,}$"
  }
];

exports.ManSyntax = new TextmateSyntax(repositories, patterns);
