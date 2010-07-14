"define metadata";
({
    "description": "MoinMoin syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "moinmoin",
            "pointer": "#MoinMoinSyntax",
            "fileexts": [
  "moinmoin"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "inline": {
    "patterns": [
      {
        "name": "markup.raw.block.moinmoin",
        "begin": "\\{{3}(?!.*\\}{3})",
        "captures": {
          "0": {
            "name": "punctuation.definition.raw.moinmoin"
          }
        },
        "end": "\\}{3}"
      },
      {
        "name": "markup.raw.inline.moinmoin",
        "captures": {
          "1": {
            "name": "punctuation.definition.raw.moinmoin"
          },
          "2": {
            "name": "punctuation.definition.raw.moinmoin"
          },
          "3": {
            "name": "punctuation.definition.raw.moinmoin"
          },
          "4": {
            "name": "punctuation.definition.raw.moinmoin"
          }
        },
        "match": "(`)[^`]*(`)|({{{).*?(}}})"
      },
      {
        "begin": "'{2}(?='{3}[^']*'{3})",
        "captures": {
          "0": {
            "name": "punctuation.definition.italic.moinmoin"
          }
        },
        "end": "'{2}(?!')|'{2}(?='{3})",
        "contentName": "markup.italic.moinmoin",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "'{3}",
        "captures": {
          "0": {
            "name": "punctuation.definition.bold.moinmoin"
          }
        },
        "end": "'{3}",
        "contentName": "markup.bold.moinmoin",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "'{2}",
        "captures": {
          "0": {
            "name": "punctuation.definition.italic.moinmoin"
          }
        },
        "end": "'{2}(?!')|'{2}(?='{3})",
        "contentName": "markup.italic.moinmoin",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "__",
        "captures": {
          "0": {
            "name": "punctuation.definition.underline.moinmoin"
          }
        },
        "end": "__",
        "contentName": "markup.underline.moinmoin",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "markup.underline.link.moinmoin",
        "match": "(?<!\\!)/?(?:[A-Z][a-z0-9]+[A-Z][a-z0-9]+[A-Za-z0-9]*)"
      },
      {
        "name": "markup.underline.link.moinmoin",
        "captures": {
          "1": {
            "name": "punctuation.definition.link.moinmoin"
          },
          "2": {
            "name": "punctuation.definition.link.moinmoin"
          }
        },
        "match": "(\\[\").*?(\"\\])"
      },
      {
        "name": "markup.underline.link.moinmoin",
        "captures": {
          "1": {
            "name": "punctuation.definition.link.moinmoin"
          },
          "2": {
            "name": "punctuation.definition.link.moinmoin"
          }
        },
        "match": "(\\[):.*?:.*?(\\])"
      },
      {
        "name": "markup.underline.link.moinmoin",
        "match": "https?://\\S+"
      },
      {
        "name": "markup.underline.link.moinmoin",
        "captures": {
          "1": {
            "name": "punctuation.definition.link.moinmoin"
          },
          "2": {
            "name": "punctuation.definition.link.moinmoin"
          }
        },
        "match": "(\\[)https?://.*?(\\])"
      },
      {
        "name": "markup.underline.link.moinmoin",
        "captures": {
          "1": {
            "name": "punctuation.separator.key-value.moinmoin"
          }
        },
        "match": "attachment(:)\\S+"
      },
      {
        "name": "meta.table.column.moinmoin",
        "captures": {
          "0": {
            "name": "punctuation.definition.table.column.moinmoin"
          }
        },
        "match": "\\|\\|"
      },
      {
        "name": "meta.macro.moinmoin",
        "captures": {
          "0": {
            "name": "punctuation.definition.macro.moinmoin"
          }
        },
        "match": "(\\[\\[).*?(\\]\\])"
      }
    ]
  }
};

var patterns = [
  {
    "name": "markup.heading.1.moinmoin",
    "captures": {
      "1": {
        "name": "punctuation.definition.heading.moimoin"
      },
      "2": {
        "name": "punctuation.definition.heading.moimoin"
      }
    },
    "match": "^\\s*(=)\\s.*\\s(=)\\n"
  },
  {
    "name": "markup.heading.2.moinmoin",
    "captures": {
      "1": {
        "name": "punctuation.definition.heading.moimoin"
      },
      "2": {
        "name": "punctuation.definition.heading.moimoin"
      }
    },
    "match": "^\\s*(==)\\s.*\\s(==)\\n"
  },
  {
    "name": "markup.heading.3.moinmoin",
    "captures": {
      "1": {
        "name": "punctuation.definition.heading.moimoin"
      },
      "2": {
        "name": "punctuation.definition.heading.moimoin"
      }
    },
    "match": "^\\s*(===)\\s.*\\s(===)\\n"
  },
  {
    "name": "markup.heading.4.moinmoin",
    "captures": {
      "1": {
        "name": "punctuation.definition.heading.moimoin"
      },
      "2": {
        "name": "punctuation.definition.heading.moimoin"
      }
    },
    "match": "^\\s*(====)\\s.*\\s(====)\\n"
  },
  {
    "name": "markup.heading.5.moinmoin",
    "captures": {
      "1": {
        "name": "punctuation.definition.heading.moimoin"
      },
      "2": {
        "name": "punctuation.definition.heading.moimoin"
      }
    },
    "match": "^\\s*(=====)\\s.*\\s(=====)\\n"
  },
  {
    "name": "meta.separator.moinmoin",
    "match": "^\\s*-----\\s*\\n"
  },
  {
    "name": "meta.pragma.moimoin",
    "match": "^#pragma.*"
  },
  {
    "name": "comment.line.double-number-sign.moimoin",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.moimoin"
      }
    },
    "match": "^(##).*$\\n?"
  },
  {
    "begin": "^\\s+(.*?(::))(?=\\s+\\S)",
    "captures": {
      "1": {
        "name": "markup.list.definition.term.moinmoin"
      },
      "2": {
        "name": "punctuation.separator.definition.moinmoin"
      }
    },
    "end": "\\n",
    "contentName": "markup.list.definition.moinmoin",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "begin": "^\\s+(\\*)(\\s)",
    "captures": {
      "1": {
        "name": "punctuation.definition.list_item.moinmoin"
      },
      "2": {
        "name": "markup.list.unnumbered.moinmoin"
      }
    },
    "end": "\\n",
    "contentName": "markup.list.unnumbered.moinmoin",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "begin": "^\\s+((?:[aAiI]|\\d+)\\.(?:\\#\\d+)?)(\\s)",
    "captures": {
      "1": {
        "name": "punctuation.definition.list_item.moinmoin"
      },
      "2": {
        "name": "markup.list.numbered.moinmoin"
      }
    },
    "end": "\\n",
    "contentName": "markup.list.numbered.moinmoin",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "begin": "^\\s*(\\|\\|)",
    "captures": {
      "1": {
        "name": "punctuation.definition.table.column.moinmoin"
      },
      "2": {
        "name": "punctuation.definition.table.column.moinmoin"
      }
    },
    "end": "(\\|\\|$)|\\n",
    "contentName": "meta.table.moinmoin",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "name": "meta.paragraph.moinmoin",
    "begin": "^\\s*(?=\\S)",
    "end": "\\n",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  }
];

exports.MoinMoinSyntax = new TextmateSyntax(repositories, patterns);
