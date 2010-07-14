"define metadata";
({
    "description": "svn-commit.tmp syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "svn-commit.tmp",
            "pointer": "#svn-commit.tmpSyntax",
            "fileexts": [
  "svn-commit.tmp",
  "svn-commit.2.tmp"
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
    "name": "meta.bullet-point.strong",
    "captures": {
      "1": {
        "name": "punctuation.definition.item.subversion-commit"
      }
    },
    "match": "^\\s*(•).*$\\n?"
  },
  {
    "name": "meta.bullet-point.light",
    "captures": {
      "1": {
        "name": "punctuation.definition.item.subversion-commit"
      }
    },
    "match": "^\\s*(·).*$\\n?"
  },
  {
    "name": "meta.bullet-point.star",
    "captures": {
      "1": {
        "name": "punctuation.definition.item.subversion-commit"
      }
    },
    "match": "^\\s*(\\*).*$\\n?"
  },
  {
    "name": "meta.scope.changed-files.svn",
    "begin": "(^--This line, and those below, will be ignored--$\\n?)",
    "beginCaptures": {
      "1": {
        "name": "meta.separator.svn"
      }
    },
    "end": "^--not gonna happen--$",
    "patterns": [
      {
        "name": "markup.inserted.svn",
        "match": "^A\\s+.*$\\n?"
      },
      {
        "name": "markup.changed.svn",
        "match": "^(M|.M)\\s+.*$\\n?"
      },
      {
        "name": "markup.deleted.svn",
        "match": "^D\\s+.*$\\n?"
      }
    ]
  }
];

exports.svn-commit.tmpSyntax = new TextmateSyntax(repositories, patterns);
