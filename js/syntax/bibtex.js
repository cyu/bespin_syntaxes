"define metadata";
({
    "description": "BibTeX syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "bib",
            "pointer": "#BibTeXSyntax",
            "fileexts": [
  "bib"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "string_content": {
    "patterns": [
      {
        "name": "string.quoted.double.bibtex",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.bibtex"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.bibtex"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "include": "#nested_braces"
          }
        ]
      },
      {
        "name": "string.quoted.other.braces.bibtex",
        "begin": "\\{",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.bibtex"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.bibtex"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "name": "invalid.illegal.at-sign.bibtex",
            "match": "@"
          },
          {
            "include": "#nested_braces"
          }
        ]
      }
    ]
  },
  "integer": {
    "name": "constant.numeric.bibtex",
    "match": "\\d+"
  },
  "nested_braces": {
    "begin": "\\{",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.group.end.bibtex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.group.begin.bibtex"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#nested_braces"
      }
    ]
  }
};

var patterns = [
  {
    "name": "comment.line.at-sign.bibtex",
    "begin": "@Comment",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.bibtex"
      }
    },
    "end": "$\\n?"
  },
  {
    "name": "meta.string-constant.braces.bibtex",
    "begin": "((@)String)\\s*(\\{)\\s*([a-zA-Z]*)",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.string-constant.end.bibtex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.string-constant.bibtex"
      },
      "2": {
        "name": "punctuation.definition.keyword.bibtex"
      },
      "3": {
        "name": "punctuation.section.string-constant.begin.bibtex"
      },
      "4": {
        "name": "variable.other.bibtex"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#string_content"
      }
    ]
  },
  {
    "name": "meta.string-constant.parenthesis.bibtex",
    "begin": "((@)String)\\s*(\\()\\s*([a-zA-Z]*)",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.string-constant.end.bibtex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.string-constant.bibtex"
      },
      "2": {
        "name": "punctuation.definition.keyword.bibtex"
      },
      "3": {
        "name": "punctuation.section.string-constant.begin.bibtex"
      },
      "4": {
        "name": "variable.other.bibtex"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#string_content"
      }
    ]
  },
  {
    "name": "meta.entry.braces.bibtex",
    "begin": "((@)[a-zA-Z]+)\\s*(\\{)\\s*([^\\s,]*)",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.entry.end.bibtex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.entry-type.bibtex"
      },
      "2": {
        "name": "punctuation.definition.keyword.bibtex"
      },
      "3": {
        "name": "punctuation.section.entry.begin.bibtex"
      },
      "4": {
        "name": "entity.name.type.entry-key.bibtex"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "name": "meta.key-assignment.bibtex",
        "begin": "([a-zA-Z]+)\\s*(\\=)",
        "beginCaptures": {
          "1": {
            "name": "string.unquoted.key.bibtex"
          },
          "2": {
            "name": "punctuation.separator.key-value.bibtex"
          }
        },
        "end": "(?=[,}])",
        "patterns": [
          {
            "include": "#string_content"
          },
          {
            "include": "#integer"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.entry.parenthesis.bibtex",
    "begin": "((@)[a-zA-Z]+)\\s*(\\()\\s*([^\\s,]*)",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.entry.end.bibtex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.entry-type.bibtex"
      },
      "2": {
        "name": "punctuation.definition.keyword.bibtex"
      },
      "3": {
        "name": "punctuation.section.entry.begin.bibtex"
      },
      "4": {
        "name": "entity.name.type.entry-key.bibtex"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "name": "meta.key-assignment.bibtex",
        "begin": "([a-zA-Z]+)\\s*(\\=)",
        "beginCaptures": {
          "1": {
            "name": "string.unquoted.key.bibtex"
          },
          "2": {
            "name": "punctuation.separator.key-value.bibtex"
          }
        },
        "end": "(?=[,)])",
        "patterns": [
          {
            "include": "#string_content"
          },
          {
            "include": "#integer"
          }
        ]
      }
    ]
  },
  {
    "name": "comment.block.bibtex",
    "begin": "[^@\\n]",
    "end": "(?=@)"
  }
];

exports.BibTeXSyntax = new TextmateSyntax(repositories, patterns);
