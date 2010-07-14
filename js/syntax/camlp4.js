"define metadata";
({
    "description": "camlp4 syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "camlp4",
            "pointer": "#camlp4Syntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "camlpppp-streams": {
    "patterns": [
      {
        "name": "meta.camlp4-stream.element.ocaml",
        "begin": "(')",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.camlp4.ocaml"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.camlp4.simple-element.ocaml"
          }
        },
        "end": "(;)(?=\\s*')|(?=\\s*>])",
        "patterns": [
          {
            "include": "source.ocaml"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.camlp4-stream.ocaml",
    "begin": "(\\[<)(?=.*?>])",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.camlp4-stream.ocaml"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.camlp4-stream.ocaml"
      }
    },
    "end": "(?=>])",
    "patterns": [
      {
        "include": "#camlpppp-streams"
      }
    ]
  },
  {
    "name": "punctuation.definition.camlp4-stream.ocaml",
    "match": "\\[<|>]"
  },
  {
    "name": "keyword.other.camlp4.ocaml",
    "match": "\\bparser\\b|<(<|:)|>>|\\$(:|\\${0,1})"
  }
];

exports.camlp4Syntax = new TextmateSyntax(repositories, patterns);
