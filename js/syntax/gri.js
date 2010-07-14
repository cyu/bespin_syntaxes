"define metadata";
({
    "description": "Gri syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "gri",
            "pointer": "#GriSyntax",
            "fileexts": [
  "gri"
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
    "name": "meta.function.gri",
    "captures": {
      "1": {
        "name": "punctuation.definition.function.gri"
      },
      "2": {
        "name": "entity.name.function.gri"
      },
      "3": {
        "name": "punctuation.definition.function.gri"
      }
    },
    "match": "(\\`)(.*)(')"
  },
  {
    "name": "comment.line.number-sign.gri",
    "begin": "#",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.gri"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "name": "punctuation.separator.continuation.gri",
        "match": "(?>\\\\\\s*\\n)"
      }
    ]
  },
  {
    "name": "comment.line.double-slash.gri",
    "begin": "//",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.gri"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "name": "punctuation.separator.continuation.gri",
        "match": "(?>\\\\\\s*\\n)"
      }
    ]
  },
  {
    "name": "keyword.control.gri",
    "match": "\\b(break|else|end|if|return|rpn|while)\\b"
  },
  {
    "name": "keyword.operator.arithmetic.gri",
    "match": "(\\-|\\+|\\*|\\/|%\\/%|%%|\\^)"
  },
  {
    "name": "keyword.operator.assignment.gri",
    "match": "(=|<-)"
  },
  {
    "name": "keyword.operator.comparison.gri",
    "match": "(==|!=)"
  },
  {
    "name": "constant.numeric.gri",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)\\b"
  },
  {
    "name": "string.unquoted.heredoc.doublequote.gri",
    "begin": "(<< *\")([^\"]*)(\")",
    "captures": {
      "1": {
        "name": "punctuation.definition.heredoc.gri"
      },
      "3": {
        "name": "punctuation.definition.heredoc.gri"
      }
    },
    "end": "^\\2$"
  },
  {
    "name": "variable.other.synonym.gri",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.gri"
      }
    },
    "match": "(\\\\)[\\.a-zA-Z0-9_][\\.a-zA-Z0-9_]*\\b"
  },
  {
    "name": "variable.other.variable.gri",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.gri"
      },
      "2": {
        "name": "punctuation.definition.variable.gri"
      }
    },
    "match": "(\\.)[a-zA-Z0-9_][a-zA-Z0-9_]*(\\.)"
  },
  {
    "name": "variable.other.variabledot.gri",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.gri"
      },
      "2": {
        "name": "punctuation.definition.variable.gri"
      }
    },
    "match": "(\\.\\.)[a-zA-Z0-9_][a-zA-Z0-9_]*(\\.\\.)"
  },
  {
    "name": "string.quoted.double.gri",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.gri"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.gri"
      }
    },
    "end": "\""
  }
];

exports.GriSyntax = new TextmateSyntax(repositories, patterns);
