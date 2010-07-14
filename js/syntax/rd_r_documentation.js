"define metadata";
({
    "description": "Rd (R Documentation) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "rd",
            "pointer": "#Rd (R Documentation)Syntax",
            "fileexts": [
  "rd"
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
    "name": "meta.section.rd",
    "begin": "((\\\\)(?:alias|docType|keyword|name|title))(\\{)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.rd"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.section.rd"
      },
      "2": {
        "name": "punctuation.definition.function.rd"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.rd"
      }
    },
    "end": "(\\})",
    "contentName": "entity.name.tag.rd",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.section.rd",
    "begin": "((\\\\)(?:details|format|references|source))(\\{)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.rd"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.section.rd"
      },
      "2": {
        "name": "punctuation.definition.function.rd"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.rd"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.usage.rd",
    "begin": "((\\\\)(?:usage))(\\{)(?:\\n)?",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.rd"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.usage.rd"
      },
      "2": {
        "name": "punctuation.definition.function.rd"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.rd"
      }
    },
    "end": "(\\})",
    "contentName": "source.r.embedded",
    "patterns": [
      {
        "include": "source.r"
      }
    ]
  },
  {
    "name": "meta.examples.rd",
    "begin": "((\\\\)(?:examples))(\\{)(?:\\n)?",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.arguments.end.rd"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.examples.rd"
      },
      "2": {
        "name": "punctuation.definition.function.rd"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.rd"
      }
    },
    "end": "(\\})",
    "contentName": "source.r.embedded",
    "patterns": [
      {
        "include": "source.r"
      }
    ]
  },
  {
    "name": "meta.author.rd",
    "captures": {
      "6": {
        "name": "markup.underline.link.rd"
      },
      "7": {
        "name": "punctuation.definition.link.rd"
      },
      "1": {
        "name": "keyword.other.author.rd"
      },
      "2": {
        "name": "punctuation.definition.function.rd"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.rd"
      },
      "4": {
        "name": "entity.name.tag.author.rd"
      },
      "5": {
        "name": "punctuation.definition.link.rd"
      }
    },
    "match": "((\\\\)(?:author))(\\{)([\\w\\s]+?)\\s+(<)([^>]*)(>)"
  },
  {
    "include": "text.tex.latex"
  }
];

exports.Rd (R Documentation)Syntax = new TextmateSyntax(repositories, patterns);
