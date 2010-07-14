"define metadata";
({
    "description": "ANTLR syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "g",
            "pointer": "#ANTLRSyntax",
            "fileexts": [
  "g"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "nested-curly": {
    "begin": "\\{",
    "name": "source.embedded.java-or-c.antlr",
    "captures": {
      "0": {
        "name": "punctuation.section.group.antlr"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "name": "keyword.control.java-or-c",
        "match": "\\b(break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while)\\b"
      },
      {
        "name": "storage.type.java-or-c",
        "match": "\\b(asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|void)\\b"
      },
      {
        "name": "storage.modifier.java-or-c",
        "match": "\\b(const|extern|register|restrict|static|volatile|inline)\\b"
      },
      {
        "name": "constant.language.java-or-c",
        "match": "\\b(NULL|true|false|TRUE|FALSE)\\b"
      },
      {
        "name": "keyword.operator.sizeof.java-or-c",
        "match": "\\b(sizeof)\\b"
      },
      {
        "name": "constant.numeric.java-or-c",
        "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
      },
      {
        "name": "string.quoted.double.java-or-c",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.java-or-c"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.java-or-c"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "name": "constant.character.escape.antlr",
            "match": "\\\\."
          }
        ]
      },
      {
        "name": "string.quoted.single.java-or-c",
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.java-or-c"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.java-or-c"
          }
        },
        "end": "'",
        "patterns": [
          {
            "name": "constant.character.escape.antlr",
            "match": "\\\\."
          }
        ]
      },
      {
        "name": "support.constant.eof-char.antlr",
        "match": "\\bEOF_CHAR\\b"
      },
      {
        "include": "#comments"
      }
    ]
  },
  "comments": {
    "patterns": [
      {
        "name": "comment.block.antlr",
        "begin": "/\\*",
        "captures": {
          "0": {
            "name": "punctuation.definition.comment.antlr"
          }
        },
        "end": "\\*/"
      },
      {
        "name": "comment.line.double-slash.antlr",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.antlr"
          }
        },
        "match": "(//).*$\\n?"
      }
    ]
  },
  "strings": {
    "patterns": [
      {
        "name": "string.quoted.double.antlr",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.antlr"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.antlr"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "name": "constant.character.escape.antlr",
            "match": "\\\\(u\\h{4}|.)"
          }
        ]
      },
      {
        "name": "string.quoted.single.antlr",
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.antlr"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.antlr"
          }
        },
        "end": "'",
        "patterns": [
          {
            "name": "constant.character.escape.antlr",
            "match": "\\\\(u\\h{4}|.)"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "include": "#strings"
  },
  {
    "include": "#comments"
  },
  {
    "name": "meta.options.antlr",
    "begin": "\\boptions\\b",
    "beginCaptures": {
      "0": {
        "name": "keyword.other.options.antlr"
      }
    },
    "end": "(?<=\\})",
    "patterns": [
      {
        "name": "meta.options-block.antlr",
        "begin": "\\{",
        "captures": {
          "0": {
            "name": "punctuation.section.options.antlr"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "#strings"
          },
          {
            "include": "#comments"
          },
          {
            "name": "constant.numeric.antlr",
            "match": "\\b\\d+\\b"
          },
          {
            "name": "variable.other.option.antlr",
            "match": "\\b(k|charVocabulary|filter|greedy|paraphrase|exportVocab|buildAST|defaultErrorHandler|language|namespace|namespaceStd|namespaceAntlr|genHashLines)\\b"
          },
          {
            "name": "constant.language.boolean.antlr",
            "match": "\\b(true|false)\\b"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.definition.class.antlr",
    "begin": "^(class)\\b\\s+(\\w+)",
    "captures": {
      "1": {
        "name": "storage.type.antlr"
      },
      "2": {
        "name": "entity.name.type.class.antlr"
      }
    },
    "end": ";",
    "patterns": [
      {
        "name": "meta.definition.class.extends.antlr",
        "begin": "\\b(extends)\\b\\s+",
        "captures": {
          "1": {
            "name": "storage.modifier.antlr"
          }
        },
        "end": "(?=;)",
        "patterns": [
          {
            "name": "support.class.antlr",
            "match": "\\b(Parser|Lexer|TreeWalker)\\b"
          }
        ]
      }
    ]
  },
  {
    "name": "storage.modifier.antlr",
    "match": "^protected\\b"
  },
  {
    "name": "entity.name.type.token.antlr",
    "match": "^[[:upper:]_][[:upper:][:digit:]_]*\\b"
  },
  {
    "name": "meta.rule.antlr",
    "captures": {
      "1": {
        "name": "entity.name.function.rule.antlr"
      },
      "2": {
        "name": "keyword.control.antlr"
      }
    },
    "match": "^(\\w+)(?:\\s+(returns\\b))?"
  },
  {
    "name": "constant.other.token.antlr",
    "match": "\\b[[:upper:]_][[:upper:][:digit:]_]*\\b"
  },
  {
    "include": "#nested-curly"
  }
];

exports.ANTLRSyntax = new TextmateSyntax(repositories, patterns);
