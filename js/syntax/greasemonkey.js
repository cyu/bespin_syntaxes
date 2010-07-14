"define metadata";
({
    "description": "Greasemonkey syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "user.js",
            "pointer": "#GreasemonkeySyntax",
            "fileexts": [
  "user.js"
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
    "name": "support.class.greasemonkey",
    "match": "\\bunsafeWindow\\b"
  },
  {
    "name": "support.function.greasemonkey",
    "match": "\\bGM_(registerMenuCommand|xmlhttpRequest|setValue|getValue|log|openInTab|addStyle)\\b(?=\\()"
  },
  {
    "name": "meta.header.greasemonkey",
    "begin": "// ==UserScript==",
    "end": "// ==/UserScript==\\s*",
    "patterns": [
      {
        "name": "meta.directive.standard.greasemonkey",
        "captures": {
          "1": {
            "name": "keyword.other.greasemonkey"
          },
          "3": {
            "name": "string.unquoted.greasemonkey"
          }
        },
        "match": "// (@(name|namespace|description|include|exclude))\\b\\s*(.+\\s+)?"
      },
      {
        "name": "meta.directive.nonstandard.greasemonkey",
        "captures": {
          "1": {
            "name": "keyword.other.greasemonkey"
          },
          "3": {
            "name": "string.unquoted.greasemonkey"
          }
        },
        "match": "// (@(\\S+))\\b\\s*(.+\\s+)?"
      }
    ]
  },
  {
    "include": "source.js"
  }
];

exports.GreasemonkeySyntax = new TextmateSyntax(repositories, patterns);
