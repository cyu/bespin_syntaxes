"define metadata";
({
    "description": "Inform syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "inf",
            "pointer": "#InformSyntax",
            "fileexts": [
  "inf"
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
    "name": "comment.line.exclamation.inform",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.inform"
      }
    },
    "match": "(!)(.*)$\\n?"
  },
  {
    "name": "meta.function.inform",
    "captures": {
      "1": {
        "name": "entity.name.function.inform"
      }
    },
    "match": "(?:\\s*)\\[(?:\\s*)(.*)(?:\\s*);"
  },
  {
    "name": "constant.numeric.inform",
    "match": "\\b((\\$[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f)?\\b"
  },
  {
    "name": "string.quoted.single.inform",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.inform"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.inform"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.inform",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.double.inform",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.inform"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.inform"
      }
    },
    "end": "\""
  },
  {
    "name": "keyword.control.inform",
    "match": "\\b(box|break|continue|do|else|font(\\s+)(on|off)|for|give|if|jump|new_line|objectloop|print|print_ret|remove|return|rfalse|rtrue|spaces|string|style(\\s+)(roman|bold|underline|reverse|fixed)|switch|until|while|has|hasnt|in|notin|ofclass|provides|or)\\b"
  },
  {
    "name": "keyword.other.directive.inform",
    "match": "\\b(Abbreviate|Array|Attribute|Class|Constant|Default|End|Endif|Extend|Global|Ifdef|Ifndef|Ifnot|Iftrue|Iffalse|Import|Include|Link|Lowstring|Message|Object|Property|Release|Replace|Serial|Switches|Statusline(\\s+)(score|time)|System_file|Verb|Zcharacter)\\b"
  }
];

exports.InformSyntax = new TextmateSyntax(repositories, patterns);
