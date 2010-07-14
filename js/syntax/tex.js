"define metadata";
({
    "description": "TeX syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "sty",
            "pointer": "#TeXSyntax",
            "fileexts": [
  "sty",
  "cls"
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
    "name": "keyword.control.tex",
    "captures": {
      "1": {
        "name": "punctuation.definition.keyword.tex"
      }
    },
    "match": "(\\\\)(backmatter|else|fi|frontmatter|ftrue|mainmatter|if(case|cat|dim|eof|false|hbox|hmode|inner|mmode|num|odd|undefined|vbox|vmode|void|x)?)\\b"
  },
  {
    "name": "meta.catcode.tex",
    "captures": {
      "1": {
        "name": "keyword.control.catcode.tex"
      },
      "2": {
        "name": "punctuation.definition.keyword.tex"
      },
      "3": {
        "name": "punctuation.separator.key-value.tex"
      },
      "4": {
        "name": "constant.numeric.category.tex"
      }
    },
    "match": "((\\\\)catcode)`(?:\\\\)?.(=)(\\d+)"
  },
  {
    "name": "comment.line.percentage.semicolon.texshop.tex",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.tex"
      }
    },
    "match": "(%:).*$\\n?"
  },
  {
    "name": "comment.line.percentage.tex",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.tex"
      }
    },
    "match": "(%).*$\\n?"
  },
  {
    "name": "meta.group.braces.tex",
    "begin": "\\{",
    "captures": {
      "0": {
        "name": "punctuation.section.group.tex"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "punctuation.definition.brackets.tex",
    "match": "[\\[\\]]"
  },
  {
    "name": "string.other.math.block.tex",
    "begin": "\\$\\$",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.tex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.tex"
      }
    },
    "end": "\\$\\$",
    "patterns": [
      {
        "include": "text.tex.math"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "constant.character.newline.tex",
    "match": "\\\\\\\\"
  },
  {
    "name": "string.other.math.tex",
    "begin": "\\$",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.tex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.tex"
      }
    },
    "end": "\\$",
    "patterns": [
      {
        "name": "constant.character.escape.tex",
        "match": "\\\\\\$"
      },
      {
        "include": "text.tex.math"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "support.function.general.tex",
    "captures": {
      "1": {
        "name": "punctuation.definition.function.tex"
      }
    },
    "match": "(\\\\)[A-Za-z@]+"
  },
  {
    "name": "constant.character.escape.tex",
    "captures": {
      "1": {
        "name": "punctuation.definition.keyword.tex"
      }
    },
    "match": "(\\\\)[^a-zA-Z@]"
  },
  {
    "name": "meta.placeholder.greek.tex",
    "match": "«press a-z and space for greek letter»[a-zA-Z]*"
  }
];

exports.TeXSyntax = new TextmateSyntax(repositories, patterns);
