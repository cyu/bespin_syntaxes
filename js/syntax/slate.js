"define metadata";
({
    "description": "Slate syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "slate",
            "pointer": "#SlateSyntax",
            "fileexts": [
  "slate"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "unary-selector": {
    "match": "\\b([A-Za-z_][A-Za-z_0-9]+)\\b"
  },
  "binary-selector": {
    "match": "\\b([=+-\\/?<>,;^*]+[A-Za-z0-9_=+-\\/?<>,;^*]+[=+-\\/?<>,;^*]+)\\b"
  },
  "escaped-char": {
    "match": "\\\\."
  },
  "nest_parens": {
    "begin": "\\(",
    "end": "\\)",
    "patterns": [
      {
        "include": "#nest_parens"
      }
    ]
  },
  "keyword": {
    "name": "variable.other.slate",
    "match": "\\b([A-Za-z_][A-Za-z_0-9]+:)\\b"
  },
  "nest_curly": {
    "begin": "\\{",
    "end": "\\}",
    "patterns": [
      {
        "include": "#nest_curly"
      }
    ]
  }
};

var patterns = [
  {
    "name": "keyword.control.slate",
    "match": "\\b(ifTrue:|ifFalse:|whileTrue:|whileFalse:|loop|ifNil:|ifNotNil:|ifNotNilDo:|if:|then:|else:|do:|\\^|error:|warn:|signal)\\b"
  },
  {
    "name": "keyword.operator.slate",
    "match": "\\b(clone|new|copy|resend|forwardTo:|is:|isReally:|as:|[-+=<>,;/\\\\*]+)\\b"
  },
  {
    "name": "keyword.other.name-of-parameter.slate",
    "match": "&[A-Za-z0-9_]+:?"
  },
  {
    "name": "variable.language.slate",
    "match": "\\b(lobby|it|thisContext|here)\\b"
  },
  {
    "name": "string.quoted.double.slate",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.slate"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.slate"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.slate",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.single.slate",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.slate"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.slate"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.slate",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "meta.array.slate",
    "begin": "\\#\\{",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.array.end.slate"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.array.begin.slate"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#nest_curly"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.array.literal.slate",
    "begin": "\\#\\(",
    "comment": "Should restrict contents to literals.",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.array.end.slate"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.array.begin.slate"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#nest_parens"
      }
    ]
  },
  {
    "name": "meta.block.compact.slate",
    "match": "#([[:lower:]]|_|[+=\\-/!%&*|><~?])(\\w|[+=\\-/!%&*|><~?:])*"
  },
  {
    "name": "meta.block.slate",
    "begin": "(\\[)(?:\\s*\\|\\s*((?::\\w+\\s+)*:\\w+)\\s*\\|)?",
    "captures": {
      "1": {
        "name": "punctuation.section.block.slate"
      },
      "2": {
        "name": "variable.parameter.block.slate"
      }
    },
    "end": "(\\])",
    "patterns": [
      {
        "name": "meta.block.header.slate",
        "match": "\\s+"
      },
      {
        "name": "meta.block.content.slate",
        "begin": "(?:\\|(\\s*(?:\\w+\\s+)*\\w+\\s*)?\\||(?=[^\\s|]))",
        "captures": {
          "1": {
            "name": "variable.other.local.slate"
          }
        },
        "end": "(?=\\])",
        "patterns": [
          {
            "include": "$base"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.definition.slate",
    "begin": "define: #(\\w+)",
    "beginCaptures": {
      "1": {
        "name": "entity.name.type.slate"
      }
    },
    "end": "\\s"
  },
  {
    "name": "variable.parameter.slate",
    "match": "\\b(:\\w+|\\w+@)"
  },
  {
    "name": "keyword.operator.logical.slate",
    "match": "\\b(/\\\\|\\\\/|and:|or:|not|xor:)\\b"
  },
  {
    "name": "constant.language.slate",
    "match": "\\b(True|False|Nil|NoRole)\\b"
  },
  {
    "name": "constant.numeric.slate",
    "match": "\\b[+-]?([0-9]+[Rr][0-9A-Za-z]+([.][0-9A-Za-z]+)?|[0-9]+([.][0-9]+)?)\\b"
  },
  {
    "name": "constant.character.slate",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.slate"
      }
    },
    "match": "(\\$)(\\S|\\\\[\\\\ntsbre0avf])"
  },
  {
    "name": "constant.other.slate",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.slate"
      }
    },
    "match": "(#)\\S+"
  },
  {
    "name": "support.class.slate",
    "match": "(\\b\\w+ traits\\b)"
  },
  {
    "name": "keyword.control.import.slate",
    "match": "\\`[-A-Za-z0-9+=*^<>?,;/\\\\]+:?"
  },
  {
    "name": "invalid.deprecated.trailing-whitespace.slate",
    "match": "\\s+$"
  },
  {
    "include": "#keyword"
  },
  {
    "name": "meta.function.unary.slate",
    "begin": "(\\w+)@",
    "endCaptures": {
      "1": {
        "name": "entity.name.function.slate"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "variable.parameter.function.slate"
      }
    },
    "end": "($|\\[)",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  }
];

exports.SlateSyntax = new TextmateSyntax(repositories, patterns);
