"define metadata";
({
    "description": "LaTeX Beamer syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#LaTeX BeamerSyntax",
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
    "name": "meta.function.environment.frame.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)(frame)(\\})",
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
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "((\\\\)end)(\\{)(frame)(\\})",
    "patterns": [
      {
        "name": "support.function.with-arg.latex",
        "captures": {
          "1": {
            "name": "support.function.with-arg.latex"
          },
          "2": {
            "name": "punctuation.definition.function.latex"
          },
          "3": {
            "name": "punctuation.definition.arguments.begin.latex"
          },
          "4": {
            "name": "entity.name.function.frame.latex"
          },
          "5": {
            "name": "punctuation.definition.arguments.end.latex"
          }
        },
        "match": "((\\\\)frametitle)(\\{)(.*)(\\})"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "include": "text.tex.latex"
  }
];

exports.LaTeX BeamerSyntax = new TextmateSyntax(repositories, patterns);
