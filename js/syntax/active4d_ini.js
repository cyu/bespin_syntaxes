"define metadata";
({
    "description": "Active4D Config syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "ini",
            "pointer": "#Active4D ConfigSyntax",
            "fileexts": [
  "ini"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "escaped_char": {
    "name": "constant.character.escape.active4d-ini",
    "match": "\\\\."
  }
};

var patterns = [
  {
    "name": "comment.line.double-slash.active4d-ini",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.active4d-ini"
      }
    },
    "match": "(//).*$\\n?"
  },
  {
    "name": "comment.line.backtick.active4d-ini",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.active4d-ini"
      }
    },
    "match": "(`).*$\\n?"
  },
  {
    "name": "comment.line.double-backslash.continuation.active4d-ini",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.active4d-ini"
      }
    },
    "match": "(\\\\\\\\).*$\\n?"
  },
  {
    "name": "comment.block.active4d-ini",
    "begin": "/\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.active4d-ini"
      }
    },
    "end": "\\*/"
  },
  {
    "name": "string.quoted.double.active4d-ini",
    "begin": "\"(?!\"\")",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.active4d-ini"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.active4d-ini"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "constant.language.boolean.active4d-ini",
    "match": "\\b(?i)(true|false|yes|no)\\b"
  },
  {
    "name": "keyword.operator.active4d-ini",
    "match": "="
  },
  {
    "name": "support.constant.active4d-ini",
    "match": "(?i)((\\b(use sessions|use session cookies|session var name|session timeout|session purge interval|session cookie path|session cookie name|session cookie domain|serve nonexecutables|script timeout|safe script dirs|safe doc dirs|root|refresh interval|receive timeout|platform charset|parameter mode|output encoding|output charset|max request size|log level|lib extension|lib dirs|http error page|fusebox page|expires|executable extensions|error page|default page|content charset|client is web server|cache control|auto relate one|auto relate many|auto refresh libs|auto create vars)\\b)|(\\<default\\>|\\<web\\>|\\<4d volume\\>|\\<boot volume\\>))"
  }
];

exports.Active4D ConfigSyntax = new TextmateSyntax(repositories, patterns);
