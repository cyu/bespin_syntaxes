"define metadata";
({
    "description": "S5 Slide Show syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "s5",
            "pointer": "#S5 Slide ShowSyntax",
            "fileexts": [
  "s5"
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
    "name": "meta.header.s5",
    "captures": {
      "1": {
        "name": "keyword.other.s5"
      },
      "2": {
        "name": "punctuation.separator.key-value.s5"
      },
      "3": {
        "name": "string.unquoted.s5"
      }
    },
    "match": "^([A-Za-z0-9]+)(:)\\s*(.*)$\\n?"
  },
  {
    "begin": "^(?![A-Za-z0-9]+:)",
    "end": "^(?=not)possible$",
    "patterns": [
      {
        "begin": "(^_{10}$)",
        "comment": "\n\t\t\t\t\t\tname = 'meta.separator.handout.s5';\n\t\t\t\t\t\tmatch = '(^_{10}$)';\n\t\t\t\t\t",
        "beginCaptures": {
          "1": {
            "name": "meta.separator.handout.s5"
          }
        },
        "end": "(?=^(?:(?:✂-{6})+|^#{10})$)",
        "contentName": "text.html.markdown.handout.s5",
        "patterns": [
          {
            "include": "text.html.markdown"
          }
        ]
      },
      {
        "begin": "(^#{10}$)",
        "comment": "\n\t\t\t\t\t\tname = 'meta.separator.notes.s5';\n\t\t\t\t\t\tmatch = '(^#{10}$)';\n\t\t\t\t\t",
        "beginCaptures": {
          "1": {
            "name": "meta.separator.notes.s5"
          }
        },
        "end": "(?=^(?:(?:✂-{6})+|_{10})$)",
        "contentName": "text.html.markdown.notes.s5",
        "patterns": [
          {
            "include": "text.html.markdown"
          }
        ]
      },
      {
        "begin": "^((✂-{6})+$\\n)",
        "comment": "\n\t\t\t\t\t\tname = 'meta.separator.slide.s5';\n\t\t\t\t\t\tmatch = '^((✂-{6})+$\\n)';\n\t\t\t\t\t",
        "beginCaptures": {
          "1": {
            "name": "meta.separator.slide.s5"
          }
        },
        "end": "(?=^(?:(?:✂-{6})+|_{10}|#{10})$)",
        "contentName": "text.html.markdown.slide.s5",
        "patterns": [
          {
            "include": "text.html.markdown"
          }
        ]
      },
      {
        "include": "text.html.markdown"
      }
    ]
  }
];

exports.S5 Slide ShowSyntax = new TextmateSyntax(repositories, patterns);
