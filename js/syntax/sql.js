"define metadata";
({
    "description": "SQL syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "sql",
            "pointer": "#SQLSyntax",
            "fileexts": [
  "sql",
  "ddl",
  "dml"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "comments": {
    "patterns": [
      {
        "name": "comment.line.double-dash.sql",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.sql"
          }
        },
        "match": "(--).*$\\n?"
      },
      {
        "name": "comment.line.number-sign.sql",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.sql"
          }
        },
        "match": "(#).*$\\n?"
      },
      {
        "name": "comment.block.c",
        "begin": "/\\*",
        "captures": {
          "0": {
            "name": "punctuation.definition.comment.sql"
          }
        },
        "end": "\\*/"
      }
    ]
  },
  "string_interpolation": {
    "name": "string.interpolated.sql",
    "captures": {
      "1": {
        "name": "punctuation.definition.string.end.sql"
      }
    },
    "match": "(#\\{)([^\\}]*)(\\})"
  },
  "strings": {
    "patterns": [
      {
        "name": "string.quoted.single.sql",
        "comment": "this is faster than the next begin/end rule since sub-pattern will match till end-of-line and SQL files tend to have very long lines.",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.begin.sql"
          },
          "3": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "match": "(')[^'\\\\]*(')"
      },
      {
        "name": "string.quoted.single.sql",
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.sql"
          }
        },
        "end": "'",
        "patterns": [
          {
            "include": "#string_escape"
          }
        ]
      },
      {
        "name": "string.quoted.other.backtick.sql",
        "comment": "this is faster than the next begin/end rule since sub-pattern will match till end-of-line and SQL files tend to have very long lines.",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.begin.sql"
          },
          "3": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "match": "(`)[^`\\\\]*(`)"
      },
      {
        "name": "string.quoted.other.backtick.sql",
        "begin": "`",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.sql"
          }
        },
        "end": "`",
        "patterns": [
          {
            "include": "#string_escape"
          }
        ]
      },
      {
        "name": "string.quoted.double.sql",
        "comment": "this is faster than the next begin/end rule since sub-pattern will match till end-of-line and SQL files tend to have very long lines.",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.begin.sql"
          },
          "3": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "match": "(\")[^\"#]*(\")"
      },
      {
        "name": "string.quoted.double.sql",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.sql"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "include": "#string_interpolation"
          }
        ]
      },
      {
        "name": "string.other.quoted.brackets.sql",
        "begin": "%\\{",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.sql"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "#string_interpolation"
          }
        ]
      }
    ]
  },
  "string_escape": {
    "name": "constant.character.escape.sql",
    "match": "\\\\."
  },
  "regexps": {
    "patterns": [
      {
        "name": "string.regexp.sql",
        "begin": "/(?=\\S.*/)",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.sql"
          }
        },
        "end": "/",
        "patterns": [
          {
            "include": "#string_interpolation"
          },
          {
            "name": "constant.character.escape.slash.sql",
            "match": "\\\\/"
          }
        ]
      },
      {
        "name": "string.regexp.modr.sql",
        "begin": "%r\\{",
        "comment": "We should probably handle nested bracket pairs!?! -- Allan",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.sql"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.sql"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "#string_interpolation"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.create.sql",
    "captures": {
      "1": {
        "name": "keyword.other.create.sql"
      },
      "2": {
        "name": "keyword.other.sql"
      },
      "5": {
        "name": "entity.name.function.sql"
      }
    },
    "match": "(?i:^\\s*(create)\\s+(aggregate|conversion|database|domain|function|group|(unique\\s+)?index|language|operator class|operator|rule|schema|sequence|table|tablespace|trigger|type|user|view)\\s+)(['\"`]?)(\\w+)\\4"
  },
  {
    "name": "meta.drop.sql",
    "captures": {
      "1": {
        "name": "keyword.other.create.sql"
      },
      "2": {
        "name": "keyword.other.sql"
      }
    },
    "match": "(?i:^\\s*(drop)\\s+(aggregate|conversion|database|domain|function|group|index|language|operator class|operator|rule|schema|sequence|table|tablespace|trigger|type|user|view))"
  },
  {
    "name": "meta.drop.sql",
    "captures": {
      "1": {
        "name": "keyword.other.create.sql"
      },
      "2": {
        "name": "keyword.other.table.sql"
      },
      "3": {
        "name": "entity.name.function.sql"
      },
      "4": {
        "name": "keyword.other.cascade.sql"
      }
    },
    "match": "(?i:\\s*(drop)\\s+(table)\\s+(\\w+)(\\s+cascade)?\\b)"
  },
  {
    "name": "meta.alter.sql",
    "captures": {
      "1": {
        "name": "keyword.other.create.sql"
      },
      "2": {
        "name": "keyword.other.table.sql"
      }
    },
    "match": "(?i:^\\s*(alter)\\s+(aggregate|conversion|database|domain|function|group|index|language|operator class|operator|rule|schema|sequence|table|tablespace|trigger|type|user|view)\\s+)"
  },
  {
    "captures": {
      "11": {
        "name": "storage.type.sql"
      },
      "6": {
        "name": "storage.type.sql"
      },
      "12": {
        "name": "storage.type.sql"
      },
      "7": {
        "name": "constant.numeric.sql"
      },
      "13": {
        "name": "storage.type.sql"
      },
      "8": {
        "name": "constant.numeric.sql"
      },
      "14": {
        "name": "constant.numeric.sql"
      },
      "9": {
        "name": "storage.type.sql"
      },
      "15": {
        "name": "storage.type.sql"
      },
      "1": {
        "name": "storage.type.sql"
      },
      "2": {
        "name": "storage.type.sql"
      },
      "3": {
        "name": "constant.numeric.sql"
      },
      "10": {
        "name": "constant.numeric.sql"
      },
      "4": {
        "name": "storage.type.sql"
      },
      "5": {
        "name": "constant.numeric.sql"
      }
    },
    "match": "(?xi)\n\n\t\t\t\t# normal stuff, capture 1\n\t\t\t\t \\b(bigint|bigserial|bit|boolean|box|bytea|cidr|circle|date|double\\sprecision|inet|int|integer|line|lseg|macaddr|money|oid|path|point|polygon|real|serial|smallint|sysdate|text)\\b\n\n\t\t\t\t# numeric suffix, capture 2 + 3i\n\t\t\t\t|\\b(bit\\svarying|character\\s(?:varying)?|tinyint|var\\schar|float|interval)\\((\\d+)\\)\n\n\t\t\t\t# optional numeric suffix, capture 4 + 5i\n\t\t\t\t|\\b(char|number|varchar\\d?)\\b(?:\\((\\d+)\\))?\n\n\t\t\t\t# special case, capture 6 + 7i + 8i\n\t\t\t\t|\\b(numeric)\\b(?:\\((\\d+),(\\d+)\\))?\n\n\t\t\t\t# special case, captures 9, 10i, 11\n\t\t\t\t|\\b(times)(?:\\((\\d+)\\))(\\swithoutstimeszone\\b)?\n\n\t\t\t\t# special case, captures 12, 13, 14i, 15\n\t\t\t\t|\\b(timestamp)(?:(s)\\((\\d+)\\)(\\swithoutstimeszone\\b)?)?\n\n\t\t\t"
  },
  {
    "name": "storage.modifier.sql",
    "match": "(?i:\\b((?:primary|foreign)\\s+key|references|on\\sdelete(\\s+cascade)?|check|constraint)\\b)"
  },
  {
    "name": "constant.numeric.sql",
    "match": "\\d+"
  },
  {
    "name": "keyword.other.DML.sql",
    "match": "(?i:\\b(select(\\s+distinct)?|insert\\s+(ignore\\s+)?into|update|delete|from|set|where|group\\sby|and|union(\\s+all)?|having|order\\sby|limit|(inner|cross)\\s+join|straight_join|(left|right)(\\s+outer)?\\s+join|natural(\\s+(left|right)(\\s+outer)?)?\\s+join)\\b)"
  },
  {
    "name": "keyword.other.DDL.create.II.sql",
    "match": "(?i:\\b(on\\s+|(not\\s+)?null)\\b)"
  },
  {
    "name": "keyword.other.DML.II.sql",
    "match": "(?i:\\bvalues\\b)"
  },
  {
    "name": "keyword.other.LUW.sql",
    "match": "(?i:\\b(begin(\\s+work)?|start\\s+transaction|commit(\\s+work)?|rollback(\\s+work)?)\\b)"
  },
  {
    "name": "keyword.other.authorization.sql",
    "match": "(?i:\\b(grant(\\swith\\sgrant\\soption)?|revoke)\\b)"
  },
  {
    "name": "keyword.other.data-integrity.sql",
    "match": "(?i:\\bin\\b)"
  },
  {
    "name": "keyword.other.object-comments.sql",
    "match": "(?i:^\\s*(comment\\s+on\\s+(table|column|aggregate|constraint|database|domain|function|index|operator|rule|schema|sequence|trigger|type|view))\\s+.*?\\s+(is)\\s+)"
  },
  {
    "include": "#comments"
  },
  {
    "include": "#strings"
  },
  {
    "include": "#regexps"
  }
];

exports.SQLSyntax = new TextmateSyntax(repositories, patterns);
