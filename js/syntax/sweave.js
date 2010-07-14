"define metadata";
({
    "description": "SWeave syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "Snw",
            "pointer": "#SWeaveSyntax",
            "fileexts": [
  "Snw",
  "Rnw",
  "snw",
  "rnw"
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
    "name": "meta.block.parameters.sweave",
    "begin": "^(<<)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.sweave"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.begin.sweave"
      }
    },
    "end": "(>>)(?==)",
    "patterns": [
      {
        "name": "meta.parameter.sweave",
        "captures": {
          "1": {
            "name": "keyword.other.name-of-parameter.sweave"
          },
          "2": {
            "name": "punctuation.separator.key-value.sweave"
          },
          "3": {
            "name": "constant.language.boolean.sweave"
          },
          "4": {
            "name": "constant.language.results.sweave"
          },
          "5": {
            "name": "string.unquoted.label.sweave"
          }
        },
        "match": "(\\w+)(=)(?:(true|false)|(verbatim|tex|hide)|([\\w.]+))"
      },
      {
        "name": "string.unquoted.label.sweave",
        "match": "[\\w.]+"
      },
      {
        "name": "punctuation.separator.parameters.sweave",
        "match": ","
      }
    ]
  },
  {
    "name": "meta.block.code.sweave",
    "begin": "(?<=>>)(=)(.*)\\n",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.embedded.end.sweave"
      },
      "2": {
        "name": "comment.line.other.sweave"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.embedded.begin.sweave"
      },
      "2": {
        "name": "comment.line.other.sweave"
      }
    },
    "end": "^(@)(.*)$",
    "contentName": "source.r.embedded.sweave",
    "patterns": [
      {
        "name": "invalid.illegal.sweave",
        "match": "^\\s+@.*\\n?"
      },
      {
        "include": "source.r"
      }
    ]
  },
  {
    "name": "invalid.illegal.sweave",
    "match": "^\\s+<<.*\\n?"
  },
  {
    "name": "meta.block.source.r",
    "begin": "^\\\\begin(\\{)Scode(\\})",
    "captures": {
      "1": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "2": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "^\\\\end(\\{)Scode(\\})",
    "contentName": "source.r.embedded.sweave",
    "patterns": [
      {
        "include": "source.r"
      }
    ]
  },
  {
    "name": "source.r.embedded.sweave",
    "begin": "\\\\Sexpr(\\{)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.begin.latex"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "include": "source.r"
      }
    ]
  },
  {
    "include": "text.tex.latex"
  }
];

exports.SWeaveSyntax = new TextmateSyntax(repositories, patterns);
