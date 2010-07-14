"define metadata";
({
    "description": "Scilab syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "sce",
            "pointer": "#ScilabSyntax",
            "fileexts": [
  "sce",
  "sci",
  "tst",
  "dem"
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
    "name": "comment.line.double-slash.scilab",
    "begin": "//",
    "end": "$\\n?"
  },
  {
    "name": "constant.numeric.scilab",
    "match": "\\b(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?\\b"
  },
  {
    "name": "support.constant.scilab",
    "match": "(%inf|%i|%pi|%eps|%e|%nan|%s|%t|%f)\\b"
  },
  {
    "name": "string.quoted.double.scilab",
    "begin": "\"",
    "end": "\"(?!\")",
    "patterns": [
      {
        "name": "constant.character.escape.scilab",
        "match": "''|\"\""
      }
    ]
  },
  {
    "name": "string.quoted.single.scilab",
    "begin": "(?<![\\w\\]\\)])'",
    "end": "'(?!')",
    "patterns": [
      {
        "name": "constant.character.escape.scilab",
        "match": "''|\"\""
      }
    ]
  },
  {
    "captures": {
      "1": {
        "name": "keyword.control.scilab"
      },
      "2": {
        "name": "entity.name.function.scilab"
      }
    },
    "match": "\\b(function)\\s+(?:[^=]+=\\s*)?(\\w+)(?:\\s*\\(.*\\))?"
  },
  {
    "name": "keyword.control.scilab",
    "match": "\\b(if|then|else|elseif|while|for|function|end|endfunction|return|select|case|break|global)\\b"
  },
  {
    "name": "punctuation.separator.continuation.scilab",
    "match": "\\.\\.\\.\\s*$"
  }
];

exports.ScilabSyntax = new TextmateSyntax(repositories, patterns);
