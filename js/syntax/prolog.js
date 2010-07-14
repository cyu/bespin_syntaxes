"define metadata";
({
    "description": "Prolog syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#PrologSyntax",
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
    "name": "string.quoted.single.prolog",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.prolog"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.prolog"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.prolog",
        "match": "\\\\."
      },
      {
        "name": "constant.character.escape.quote.prolog",
        "match": "''"
      }
    ]
  },
  {
    "name": "comment.line.percent.prolog",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.prolog"
      }
    },
    "match": "(%).*$\\n?"
  },
  {
    "name": "keyword.operator.definition.prolog",
    "match": ":-"
  },
  {
    "name": "variable.other.prolog",
    "match": "\\b[A-Z][a-zA-Z0-9_]*\\b"
  },
  {
    "name": "constant.other.symbol.prolog",
    "comment": "\n\t\t\tI changed this from entity to storage.type, but have no idea what it is -- Allan\n\t\t\tAnd I changed this to constant.other.symbol after glancing over the docs,\n\t\t\t    might still be wrong.  -- Infininight\n\t\t\t",
    "match": "\\b[a-z][a-zA-Z0-9_]*\\b"
  }
];

exports.PrologSyntax = new TextmateSyntax(repositories, patterns);
