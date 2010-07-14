"define metadata";
({
    "description": "CSV syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "csv",
            "pointer": "#CSVSyntax",
            "fileexts": [
  "csv"
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
    "name": "meta.tabular.row.header.csv",
    "end": "$",
    "patterns": [
      {
        "include": "#field"
      }
    ]
  },
  "row": {
    "begin": "^(?!$)",
    "name": "meta.tabular.row.csv",
    "end": "$",
    "patterns": [
      {
        "include": "#field"
      }
    ]
  },
  "table": {
    "begin": "^",
    "name": "meta.tabular.table.csv",
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
            "name": "punctuation.separator.table.row.csv"
          }
        },
        "end": "^$not possible$^",
        "patterns": [
          {
            "include": "#row"
          },
          {
            "name": "punctuation.separator.table.row.csv",
            "match": "\\n"
          }
        ]
      }
    ]
  },
  "field": {
    "patterns": [
      {
        "begin": "(^|(?<=,))(\")",
        "comment": "\n\t\t\t\t\t\tthis field uses \"s and is thus able to enclose\n\t\t\t\t\t\tnewlines or commas\n\t\t\t\t\t",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.field.csv"
          },
          "3": {
            "name": "punctuation.separator.tabular.field.csv"
          }
        },
        "beginCaptures": {
          "2": {
            "name": "punctuation.definition.field.csv"
          }
        },
        "end": "(\")($|(,))",
        "contentName": "meta.tabular.field.quoted.csv",
        "patterns": [
          {
            "name": "constant.character.escape.straight-quote.csv",
            "match": "\"\""
          }
        ]
      },
      {
        "begin": "(:^|(?<=,))(?!$|,)",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.tabular.field.csv"
          }
        },
        "end": "$|(,)",
        "contentName": "meta.tabular.field.csv"
      },
      {
        "name": "punctuation.separator.tabular.field.csv",
        "match": ","
      }
    ]
  }
};

var patterns = [
  {
    "include": "#table"
  }
];

exports.CSVSyntax = new TextmateSyntax(repositories, patterns);
