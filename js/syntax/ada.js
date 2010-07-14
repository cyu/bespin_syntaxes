"define metadata";
({
    "description": "Ada syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "adb",
            "pointer": "#AdaSyntax",
            "fileexts": [
  "adb",
  "ads"
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
    "name": "keyword.control.ada",
    "match": "\\b(?i:(abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|access|exception|of|separate|aliased|exit|or|subtype|all|others|and|for|out|tagged|array|function|task|at|package|terminate|generic|pragma|then|begin|goto|private|type|body|procedure|if|protected|until|case|in|use|constant|is|raise|range|when|declare|limited|record|while|delay|loop|rem|with|delta|renames|digits|mod|requeue|xor|do))\\b"
  },
  {
    "name": "constant.numeric.ada",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
  },
  {
    "name": "string.quoted.double.ada",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ada"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ada"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "invalid.illegal.lf-in-string.ada",
        "match": "\\n"
      }
    ]
  },
  {
    "name": "comment.line.double-dash.ada",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.ada"
      }
    },
    "match": "(--)(.*)$\\n?"
  }
];

exports.AdaSyntax = new TextmateSyntax(repositories, patterns);
