"define metadata";
({
    "description": "JSON syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "json",
            "pointer": "#JSONSyntax",
            "fileexts": [
  "json"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "number": {
    "comment": "handles integer and decimal numbers",
    "name": "constant.numeric.json",
    "match": "(?x:         # turn on extended mode\n                 -?         # an optional minus\n                 (?:\n                   0        # a zero\n                   |        # ...or...\n                   [1-9]    # a 1-9 character\n                   \\d*      # followed by zero or more digits\n                 )\n                 (?:\n                   \\.       # a period\n                   \\d+      # followed by one or more digits\n                   (?:\n                     [eE]   # an e character\n                     [+-]?  # followed by an option +/-\n                     \\d+    # followed by one or more digits\n                   )?       # make exponent optional\n                 )?         # make decimal portion optional\n               )"
  },
  "constant": {
    "name": "constant.language.json",
    "match": "\\b(?:true|false|null)\\b"
  },
  "array": {
    "begin": "\\[",
    "name": "meta.structure.array.json",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.array.end.json"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.array.begin.json"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#value"
      },
      {
        "name": "punctuation.separator.array.json",
        "match": ","
      },
      {
        "name": "invalid.illegal.expected-array-separator.json",
        "match": "[^\\s\\]]"
      }
    ]
  },
  "value": {
    "comment": "the 'value' diagram at http://json.org",
    "patterns": [
      {
        "include": "#constant"
      },
      {
        "include": "#number"
      },
      {
        "include": "#string"
      },
      {
        "include": "#array"
      },
      {
        "include": "#object"
      }
    ]
  },
  "string": {
    "begin": "\"",
    "name": "string.quoted.double.json",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.json"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.json"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.json",
        "match": "(?x:                # turn on extended mode\n                     \\\\                # a literal backslash\n                     (?:               # ...followed by...\n                       [\"\\\\/bfnrt]     # one of these characters\n                       |               # ...or...\n                       u               # a u\n                       [0-9a-fA-F]{4}  # and four hex digits\n                     )\n                   )"
      },
      {
        "name": "invalid.illegal.unrecognized-string-escape.json",
        "match": "\\\\."
      }
    ]
  },
  "object": {
    "comment": "a JSON object",
    "begin": "\\{",
    "name": "meta.structure.dictionary.json",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.dictionary.end.json"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.dictionary.begin.json"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "comment": "the JSON object key",
        "include": "#string"
      },
      {
        "name": "meta.structure.dictionary.value.json",
        "begin": ":",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.dictionary.pair.json"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.separator.dictionary.key-value.json"
          }
        },
        "end": "(,)|(?=\\})",
        "patterns": [
          {
            "comment": "the JSON object value",
            "include": "#value"
          },
          {
            "name": "invalid.illegal.expected-dictionary-separator.json",
            "match": "[^\\s,]"
          }
        ]
      },
      {
        "name": "invalid.illegal.expected-dictionary-separator.json",
        "match": "[^\\s\\}]"
      }
    ]
  }
};

var patterns = [
  {
    "include": "#value"
  }
];

exports.JSONSyntax = new TextmateSyntax(repositories, patterns);
