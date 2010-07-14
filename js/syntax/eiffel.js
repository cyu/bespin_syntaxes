"define metadata";
({
    "description": "Eiffel syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "e",
            "pointer": "#EiffelSyntax",
            "fileexts": [
  "e"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "number": {
    "match": "[0-9]+"
  },
  "variable": {
    "match": "[a-zA-Z0-9_]+"
  }
};

var patterns = [
  {
    "name": "comment.line.double-dash.eiffel",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.eiffel"
      }
    },
    "match": "(--).*$\\n?"
  },
  {
    "name": "keyword.control.eiffel",
    "match": "\\b(Indexing|indexing|deferred|expanded|class|inherit|rename|as|export|undefine|redefine|select|all|create|creation|feature|prefix|infix|separate|frozen|obsolete|local|is|unique|do|once|external|alias|require|ensure|invariant|variant|rescue|retry|like|check|if|else|elseif|then|inspect|when|from|loop|until|debug|not|or|and|xor|implies|old|end)\\b"
  },
  {
    "name": "variable.other.eiffel",
    "match": "[a-zA-Z_]+"
  },
  {
    "name": "constant.language.eiffel",
    "match": "\\b(True|true|False|false|Void|void|Result|result)\\b"
  },
  {
    "name": "meta.features.eiffel",
    "begin": "feature",
    "end": "end"
  },
  {
    "name": "meta.effective_routine_body.eiffel",
    "begin": "(do|once)",
    "end": "(ensure|end)"
  },
  {
    "name": "meta.rescue.eiffel",
    "begin": "rescue",
    "end": "end"
  },
  {
    "name": "string.quoted.double.eiffel",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.eiffel"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.eiffel"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.eiffel",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "constant.numeric.eiffel",
    "match": "[0-9]+"
  },
  {
    "name": "storage.modifier.eiffel",
    "match": "\\b(deferred|expanded)\\b"
  },
  {
    "name": "meta.definition.class.eiffel",
    "begin": "^\\s*\n\t\t\t\t\t((?:\\b(deferred|expanded)\\b\\s*)*) # modifier\n\t\t\t\t\t(class)\\s+\n\t\t\t\t\t(\\w+)\\s* # identifier",
    "captures": {
      "1": {
        "name": "storage.modifier.eiffel"
      }
    },
    "end": "(?=end)",
    "patterns": [
      {
        "name": "meta.definition.class.extends.java",
        "begin": "\\b(extends)\\b\\s+",
        "captures": {
          "1": {
            "name": "storage.modifier.java"
          }
        },
        "end": "(?={|implements)",
        "patterns": [
          {
            "include": "#all-types"
          }
        ]
      },
      {
        "name": "meta.definition.class.implements.java",
        "begin": "\\b(implements)\\b\\s+",
        "captures": {
          "1": {
            "name": "storage.modifier.java"
          }
        },
        "end": "(?={|extends)",
        "patterns": [
          {
            "include": "#all-types"
          }
        ]
      }
    ]
  }
];

exports.EiffelSyntax = new TextmateSyntax(repositories, patterns);
