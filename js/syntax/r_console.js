"define metadata";
({
    "description": "R Console syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#R ConsoleSyntax",
            "fileexts": [

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
    "name": "source.r.embedded.r-console",
    "begin": "^> ",
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.r-console"
      }
    },
    "end": "\\n|\\z",
    "patterns": [
      {
        "include": "source.r"
      }
    ]
  }
];

exports.R ConsoleSyntax = new TextmateSyntax(repositories, patterns);
