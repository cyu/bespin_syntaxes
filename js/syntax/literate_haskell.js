"define metadata";
({
    "description": "Literate Haskell syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "lhs",
            "pointer": "#Literate HaskellSyntax",
            "fileexts": [
  "lhs"
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
    "name": "meta.function.embedded.haskell.latex",
    "begin": "^((\\\\)begin)({)code(})(\\s*\\n)?",
    "captures": {
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "^((\\\\)end)({)code(})",
    "contentName": "source.haskell.embedded.latex",
    "patterns": [
      {
        "include": "source.haskell"
      }
    ]
  },
  {
    "include": "text.tex.latex"
  }
];

exports.Literate HaskellSyntax = new TextmateSyntax(repositories, patterns);
