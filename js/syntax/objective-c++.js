"define metadata";
({
    "description": "Objective-C++ syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "mm",
            "pointer": "#Objective-C++Syntax",
            "fileexts": [
  "mm",
  "M",
  "h"
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
    "include": "source.objc"
  },
  {
    "include": "source.c++"
  }
];

exports.Objective-C++Syntax = new TextmateSyntax(repositories, patterns);
