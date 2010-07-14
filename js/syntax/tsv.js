"define metadata";
({
    "description": "TSV syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "tsv",
            "pointer": "#TSVSyntax",
            "fileexts": [
  "tsv"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "header": {
    "begin": "^(?!$)",
    "name": "meta.tabular.row.header.tsv",
    "end": "$",
    "patterns": [
      {
        "include": "#field"
      }
    ]
  },
  "row": {
    "begin": "^(?!$)",
    "name": "meta.tabular.row.tsv",
    "end": "$",
    "patterns": [
      {
        "include": "#field"
      }
    ]
  },
  "table": {
    "begin": "^",
    "name": "meta.tabular.table.tsv",
    "end": "^$not possible$^",
    "patterns": [
      {
        "include": "#header"
      },
      {
        "begin": "(\\n)",
        "comment": "\n\t\t\t\t\t\teverything after the first row is not a header\n\t\t\t\t\t",
        "beginCaptures": {
          "1": {
            "name": "punctuation.separator.table.row.tsv"
          }
        },
        "end": "^$not possible$^",
        "patterns": [
          {
            "include": "#row"
          },
          {
            "name": "punctuation.separator.table.row.tsv",
            "match": "\\n"
          }
        ]
      }
    ]
  },
  "field": {
    "patterns": [
      {
        "begin": "(:^|(?<=\\t))(?!$|\\t)",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.tabular.field.tsv"
          }
        },
        "end": "$|(\\t)",
        "contentName": "meta.tabular.field.tsv"
      },
      {
        "name": "punctuation.separator.tabular.field.tsv",
        "match": "\\t"
      }
    ]
  }
};

var patterns = [
  {
    "include": "#table"
  }
];

exports.TSVSyntax = new TextmateSyntax(repositories, patterns);
