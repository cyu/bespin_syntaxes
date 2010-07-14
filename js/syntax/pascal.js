"define metadata";
({
    "description": "Pascal syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "pas",
            "pointer": "#PascalSyntax",
            "fileexts": [
  "pas",
  "p"
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
    "name": "keyword.control.pascal",
    "match": "\\b(?i:(absolute|abstract|all|and|and_then|array|as|asm|attribute|begin|bindable|case|class|const|constructor|destructor|div|do|do|else|end|except|export|exports|external|far|file|finalization|finally|for|forward|goto|if|implementation|import|in|inherited|initialization|interface|interrupt|is|label|library|mod|module|name|near|nil|not|object|of|only|operator|or|or_else|otherwise|packed|pow|private|program|property|protected|public|published|qualified|record|repeat|resident|restricted|segment|set|shl|shr|then|to|try|type|unit|until|uses|value|var|view|virtual|while|with|xor))\\b"
  },
  {
    "name": "meta.function.prototype.pascal",
    "captures": {
      "1": {
        "name": "storage.type.prototype.pascal"
      },
      "2": {
        "name": "entity.name.function.prototype.pascal"
      }
    },
    "match": "\\b(?i:(function|procedure))\\b\\s+(\\w+(\\.\\w+)?)(\\(.*?\\))?;\\s*(?=(?i:attribute|forward|external))"
  },
  {
    "name": "meta.function.pascal",
    "captures": {
      "1": {
        "name": "storage.type.function.pascal"
      },
      "2": {
        "name": "entity.name.function.pascal"
      }
    },
    "match": "\\b(?i:(function|procedure))\\b\\s+(\\w+(\\.\\w+)?)"
  },
  {
    "name": "constant.numeric.pascal",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
  },
  {
    "name": "comment.line.double-dash.pascal.one",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.pascal"
      }
    },
    "match": "(--).*$\\n?"
  },
  {
    "name": "comment.line.double-slash.pascal.two",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.pascal"
      }
    },
    "match": "(//).*$\\n?"
  },
  {
    "name": "comment.block.pascal.one",
    "begin": "\\(\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.pascal"
      }
    },
    "end": "\\*\\)"
  },
  {
    "name": "comment.block.pascal.two",
    "begin": "\\{",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.pascal"
      }
    },
    "end": "\\}"
  },
  {
    "name": "string.quoted.double.pascal",
    "begin": "\"",
    "comment": "Double quoted strings are an extension and (generally) support C-style escape sequences.",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.pascal"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.pascal"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.pascal",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.single.pascal",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.pascal"
      }
    },
    "applyEndPatternLast": 1,
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.pascal"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.apostrophe.pascal",
        "match": "''"
      }
    ]
  }
];

exports.PascalSyntax = new TextmateSyntax(repositories, patterns);
