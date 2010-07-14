"define metadata";
({
    "description": "Lighttpd syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "Lighttpd",
            "pointer": "#LighttpdSyntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = null;

var patterns = [
  {
    "name": "comment.line.number-sign.lighttpd-config",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.lighttpd-config"
      }
    },
    "match": "(#).*$\\n?"
  },
  {
    "captures": {
      "1": {
        "name": "punctuation.separator.key-value.lighttpd-config"
      },
      "2": {
        "name": "string.regexp.lighttpd-config"
      },
      "3": {
        "name": "punctuation.definition.string.begin.lighttpd-config"
      },
      "4": {
        "name": "punctuation.definition.string.end.lighttpd-config"
      }
    },
    "match": "(=~|!~)\\s*((\").*(\"))"
  },
  {
    "captures": {
      "1": {
        "name": "punctuation.separator.key-value.lighttpd-config"
      },
      "2": {
        "name": "constant.numeric.lighttpd-config"
      }
    },
    "match": "(=>?)\\s*([0-9]+)"
  },
  {
    "name": "punctuation.separator.key-value.lighttpd-config",
    "match": "=|\\+=|==|!=|=~|!~|=>"
  },
  {
    "name": "string.quoted.double.lighttpd-config",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.lighttpd-config"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.lighttpd-config"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.quote.lighttpd-config",
        "match": "\"\""
      }
    ]
  },
  {
    "name": "variable.language.lighttpd-config",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.lighttpd-config"
      }
    },
    "match": "(\\$)[a-zA-Z][0-9a-zA-Z]*"
  },
  {
    "name": "support.constant.name.lighttpd-config",
    "match": "^\\s*[a-zA-Z][0-9a-zA-Z.-]*"
  },
  {
    "captures": {
      "1": {
        "name": "invalid.illegal.semicolon-at-end-of-line.lighttpd-config"
      }
    },
    "match": "(;)\\s*$"
  }
];

exports.LighttpdSyntax = new TextmateSyntax(repositories, patterns);
