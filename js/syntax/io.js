"define metadata";
({
    "description": "Io syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "io",
            "pointer": "#IoSyntax",
            "fileexts": [
  "io"
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
    "comment": "we match this to overload return inside () --Allan; scoping rules for what gets the scope have changed, so we now group the ) instead of the ( -- Rob",
    "captures": {
      "1": {
        "name": "meta.empty-parenthesis.io"
      }
    },
    "match": "\\((\\))"
  },
  {
    "comment": "We want to do the same for ,) -- Seckar; same as above -- Rob",
    "captures": {
      "1": {
        "name": "meta.comma-parenthesis.io"
      }
    },
    "match": "\\,(\\))"
  },
  {
    "name": "keyword.control.io",
    "match": "\\b(if|ifTrue|ifFalse|ifTrueIfFalse|for|loop|reverseForeach|foreach|map|continue|break|while|do|return)\\b"
  },
  {
    "name": "comment.block.io",
    "begin": "/\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.io"
      }
    },
    "end": "\\*/"
  },
  {
    "name": "comment.line.double-slash.io",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.io"
      }
    },
    "match": "(//).*$\\n?"
  },
  {
    "name": "comment.line.number-sign.io",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.io"
      }
    },
    "match": "(#).*$\\n?"
  },
  {
    "name": "variable.language.io",
    "comment": "I wonder if some of this isn't variable.other.language? --Allan; scoping this as variable.language to match Objective-C's handling of 'self', which is inconsistent with C++'s handling of 'this' but perhaps intentionally so -- Rob",
    "match": "\\b(self|sender|target|proto|protos|parent)\\b"
  },
  {
    "name": "keyword.operator.io",
    "match": "<=|>=|=|:=|\\*|\\||\\|\\||\\+|-|/|&|&&|>|<|\\?|@|@@|\\b(and|or)\\b"
  },
  {
    "name": "constant.other.io",
    "match": "\\bGL[\\w_]+\\b"
  },
  {
    "name": "support.class.io",
    "match": "\\b([A-Z](\\w+)?)\\b"
  },
  {
    "name": "support.function.io",
    "match": "\\b(clone|call|init|method|list|vector|block|(\\w+(?=\\s*\\()))\\b"
  },
  {
    "name": "support.function.open-gl.io",
    "match": "\\b(gl(u|ut)?[A-Z]\\w+)\\b"
  },
  {
    "name": "string.quoted.triple.io",
    "begin": "\"\"\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.io"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.io"
      }
    },
    "end": "\"\"\"",
    "patterns": [
      {
        "name": "constant.character.escape.io",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.double.io",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.io"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.io"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.io",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "constant.numeric.io",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f)?\\b"
  },
  {
    "name": "variable.other.global.io",
    "match": "(Lobby)\\b"
  },
  {
    "name": "constant.language.io",
    "match": "\\b(TRUE|true|FALSE|false|NULL|null|Null|Nil|nil|YES|NO)\\b"
  }
];

exports.IoSyntax = new TextmateSyntax(repositories, patterns);
