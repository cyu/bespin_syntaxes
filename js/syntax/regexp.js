"define metadata";
({
    "description": "Regular Expression syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "re",
            "pointer": "#Regular ExpressionSyntax",
            "fileexts": [
  "re"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "character_class": {
    "name": "keyword.control.character-class.regexp",
    "match": "\\\\[wWsSdDhH]"
  },
  "escaped_char": {
    "comment": "escaped character",
    "name": "constant.character.escape.regexp",
    "match": "\\\\."
  }
};

var patterns = [
  {
    "name": "keyword.operator.regexp",
    "match": "\\|"
  },
  {
    "name": "keyword.control.anchors.regexp",
    "match": "\\\\[bBAZzG^$]"
  },
  {
    "include": "#character_class"
  },
  {
    "include": "#escaped_char"
  },
  {
    "name": "keyword.control.set.regexp",
    "begin": "\\[(?:\\^?\\])?",
    "end": "\\]",
    "patterns": [
      {
        "include": "#character_class"
      },
      {
        "include": "#escaped_char"
      },
      {
        "name": "constant.other.range.regexp",
        "match": ".-."
      },
      {
        "name": "keyword.operator.intersection.regexp",
        "match": ".&&."
      }
    ]
  },
  {
    "name": "string.regexp.group",
    "begin": "\\(",
    "end": "\\)",
    "patterns": [
      {
        "include": "source.regexp"
      },
      {
        "name": "constant.other.assertion.regexp",
        "match": "(?<=\\()\\?(<[=!]|>|=|:|!)"
      },
      {
        "name": "comment.line.number-sign.regexp",
        "match": "(?<=\\()\\?#"
      }
    ]
  },
  {
    "name": "keyword.other.backref-and-recursion.regexp",
    "match": "\\\\(\\n\\d+|\\k\\w+|(?<!\\|)\\g\\w+)"
  },
  {
    "name": "constant.character.escape.regexp",
    "match": "\\\\([tvnrbfae]|[0-8]{3}|x\\H\\H\\{7\\H{7}\\}|x\\H\\H|c\\d+|C-\\d+|M-\\d+|M-\\\\C-\\d+)"
  },
  {
    "name": "keyword.operator.quantifier.regexp",
    "match": "((?<!\\()[?*+][?+]?)|\\{\\d*,\\d*\\}"
  }
];

exports.Regular ExpressionSyntax = new TextmateSyntax(repositories, patterns);
