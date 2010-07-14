"define metadata";
({
    "description": "LaTeX Memoir syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#LaTeX MemoirSyntax",
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
    "name": "meta.function.memoir-fbox.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)(framed|shaded|leftbar)(\\})",
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
    "end": "((\\\\)end)(\\{)(\\4)(\\})",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.function.memoir-verbatim.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)((?:fboxv|boxedv|V)erbatim)(\\})",
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
    "end": "((\\\\)end)(\\{)(\\4)(\\})",
    "contentName": "markup.raw.verbatim.latex"
  },
  {
    "name": "meta.function.memoir-alltt.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)(alltt)(\\})",
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
    "end": "((\\\\)end)(\\{)(alltt)(\\})",
    "contentName": "markup.raw.verbatim.latex",
    "patterns": [
      {
        "name": "support.function.general.tex",
        "captures": {
          "1": {
            "name": "punctuation.definition.function.tex"
          }
        },
        "match": "(\\\\)[A-Za-z]+"
      }
    ]
  },
  {
    "include": "text.tex.latex"
  }
];

exports.LaTeX MemoirSyntax = new TextmateSyntax(repositories, patterns);
