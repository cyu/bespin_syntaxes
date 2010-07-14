"define metadata";
({
    "description": "F-Script syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "fscript",
            "pointer": "#F-ScriptSyntax",
            "fileexts": [
  "fscript"
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
    "name": "meta.dummy.symbol.ignore.fscript",
    "match": "(:|\\w):"
  },
  {
    "name": "constant.other.symbol.fscript",
    "captures": {
      "1": {
        "name": "punctuation.definition.symbol.fscript"
      }
    },
    "match": "(:)\\w+\\b"
  },
  {
    "name": "constant.numeric.fscript",
    "match": "\\b((([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)\\b"
  },
  {
    "name": "constant.other.block.compact.fscript",
    "match": "#([[:lower:]]|_|[+=\\-/!%&*|><~?])(\\w|[+=\\-/!%&*|><~?:])*"
  },
  {
    "name": "meta.block.empty.fscript",
    "captures": {
      "1": {
        "name": "punctuation.section.block.fscript"
      },
      "2": {
        "name": "variable.parameter.block.fscript"
      },
      "3": {
        "name": "punctuation.section.block.fscript"
      }
    },
    "match": "(\\[)(?:\\s*((?::\\w+\\s+)*:\\w+)\\s*\\|)?\\s*(\\])"
  },
  {
    "name": "meta.block.fscript",
    "begin": "(\\[)(?:\\s*((?::\\w+\\s+)*:\\w+)\\s*\\|)?",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.block.fscript"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.block.fscript"
      },
      "2": {
        "name": "variable.parameter.block.fscript"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "name": "meta.block.header.fscript",
        "match": "\\s+"
      },
      {
        "name": "meta.block.content.fscript",
        "begin": "(?:\\|(\\s*(?:\\w+\\s+)*\\w+\\s*)?\\||(?=[^\\s|]))",
        "captures": {
          "1": {
            "name": "variable.other.local.fscript"
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
    "name": "constant.language.fscript",
    "match": "\\b(true|YES|false|NO|sys|nil)\\b"
  },
  {
    "comment": "a hack for the symbol popup",
    "captures": {
      "1": {
        "name": "entity.name.function.fscript"
      }
    },
    "match": "^(\\w+)\\s*:=\\s*(?=\\[)"
  },
  {
    "name": "comment.block.quotes.fscript",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.comment.end.fscript"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.begin.fscript"
      }
    },
    "end": "\""
  },
  {
    "name": "string.quoted.single.fscript",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.fscript"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.fscript"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.fscript",
        "match": "\\\\."
      }
    ]
  }
];

exports.F-ScriptSyntax = new TextmateSyntax(repositories, patterns);
