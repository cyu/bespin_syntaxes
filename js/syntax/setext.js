"define metadata";
({
    "description": "Setext syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "etx",
            "pointer": "#SetextSyntax",
            "fileexts": [
  "etx",
  "etx.txt"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "hotword": {
    "name": "meta.link.reference.setext",
    "captures": {
      "0": {
        "name": "constant.other.reference.link.setext"
      },
      "1": {
        "name": "punctuation.definition.reference.setext"
      }
    },
    "match": "\\b[-\\w.]*\\w(?<!_)(_)\\b"
  },
  "underline": {
    "name": "markup.underline.setext",
    "captures": {
      "1": {
        "name": "punctuation.definition.underline.setext"
      },
      "2": {
        "name": "punctuation.definition.underline.setext"
      },
      "3": {
        "name": "punctuation.definition.underline.setext"
      },
      "4": {
        "name": "punctuation.definition.underline.setext"
      }
    },
    "match": "\\b(_)\\w+(?<!_)(_)\\b|\\b(_).+(?<!_)(_)\\b"
  },
  "inline": {
    "patterns": [
      {
        "include": "#italic"
      },
      {
        "include": "#bold"
      },
      {
        "include": "#underline"
      },
      {
        "include": "#hotword"
      },
      {
        "include": "#link"
      },
      {
        "include": "#doc_separator"
      }
    ]
  },
  "bold": {
    "name": "markup.bold.setext",
    "captures": {
      "1": {
        "name": "punctuation.definition.bold.setext"
      },
      "2": {
        "name": "punctuation.definition.bold.setext"
      }
    },
    "match": "([*]{2}).+?([*]{2})"
  },
  "italic": {
    "name": "markup.italic.setext",
    "captures": {
      "1": {
        "name": "punctuation.definition.italic.setext"
      },
      "2": {
        "name": "punctuation.definition.italic.setext"
      }
    },
    "match": "(~)\\w+(~)"
  },
  "link": {
    "comment": "Not actually part of setext, added for Tidbits.",
    "captures": {
      "1": {
        "name": "punctuation.definition.link.setext"
      },
      "2": {
        "name": "markup.underline.link.setext"
      },
      "3": {
        "name": "punctuation.definition.link.setext"
      }
    },
    "match": "(<)((?i:mailto|https?|ftp|news)://.*?)(>)"
  },
  "doc_separator": {
    "name": "meta.separator.document.setext",
    "captures": {
      "1": {
        "name": "punctuation.definition.separator.setext"
      }
    },
    "match": "\\s*(\\$\\$)$\\n?"
  }
};

var patterns = [
  {
    "include": "#inline"
  },
  {
    "name": "meta.header.setext",
    "captures": {
      "1": {
        "name": "keyword.other.setext"
      },
      "2": {
        "name": "punctuation.separator.key-value.setext"
      },
      "3": {
        "name": "string.unquoted.setext"
      }
    },
    "match": "^(Subject|Date|From)(:) (.+)"
  },
  {
    "name": "markup.heading.1.setext",
    "match": "^={3,}\\s*$\\n?"
  },
  {
    "name": "markup.heading.2.setext",
    "match": "^-{3,}\\s*$\\n?"
  },
  {
    "name": "markup.quote.setext",
    "begin": "^(>)\\s",
    "captures": {
      "1": {
        "name": "punctuation.definition.quote.setext"
      }
    },
    "end": "$",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "name": "markup.other.bullet.setext",
    "begin": "^([*])\\s",
    "captures": {
      "1": {
        "name": "punctuation.definition.bullet.setext"
      }
    },
    "end": "$",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "name": "markup.raw.setext",
    "begin": "`",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.raw.end.setext"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.raw.begin.setext"
      }
    },
    "end": "`"
  },
  {
    "name": "meta.note.def.setext",
    "captures": {
      "7": {
        "name": "punctuation.definition.string.end.setext"
      },
      "1": {
        "name": "punctuation.definition.note.setext"
      },
      "2": {
        "name": "constant.other.reference.note.setext"
      },
      "3": {
        "name": "punctuation.definition.reference.setext"
      },
      "4": {
        "name": "string.quoted.other.note.setext"
      },
      "5": {
        "name": "punctuation.definition.string.begin.setext"
      }
    },
    "match": "^(\\.{2}) ((_)[-\\w.]+) +((\\()(.+(\\))|.+))$"
  },
  {
    "name": "meta.link.reference.def.setext",
    "captures": {
      "1": {
        "name": "punctuation.definition.reference.setext"
      },
      "2": {
        "name": "constant.other.reference.link.setext"
      },
      "3": {
        "name": "punctuation.definition.reference.setext"
      },
      "4": {
        "name": "markup.underline.link.setext"
      }
    },
    "match": "^(\\.{2}) ((_)[-\\w.]+) +(.{2,})$"
  },
  {
    "name": "comment.line.double-dot.setext",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.setext"
      }
    },
    "match": "^(\\.{2}) (?![.]).+$\\n?"
  },
  {
    "name": "comment.block.logical_end_of_text.setext",
    "begin": "^(\\.{2})$",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.setext"
      }
    },
    "end": "not(?<=possible)"
  }
];

exports.SetextSyntax = new TextmateSyntax(repositories, patterns);
