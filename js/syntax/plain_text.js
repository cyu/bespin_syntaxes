"define metadata";
({
    "description": "Plain Text syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "txt",
            "pointer": "#Plain TextSyntax",
            "fileexts": [
  "txt"
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
    "name": "meta.bullet-point.strong",
    "captures": {
      "1": {
        "name": "punctuation.definition.item.text"
      }
    },
    "match": "^\\s*(•).*$\\n?"
  },
  {
    "name": "meta.bullet-point.light",
    "captures": {
      "1": {
        "name": "punctuation.definition.item.text"
      }
    },
    "match": "^\\s*(·).*$\\n?"
  },
  {
    "name": "meta.bullet-point.star",
    "captures": {
      "1": {
        "name": "punctuation.definition.item.text"
      }
    },
    "match": "^\\s*(\\*).*$\\n?"
  },
  {
    "begin": "^([ \\t]*)(?=\\S)",
    "end": "^(?!\\1(?=\\S))",
    "contentName": "meta.paragraph.text",
    "patterns": [
      {
        "name": "markup.underline.link",
        "match": "(?x)\n\t\t\t\t\t\t( (https?|s?ftp|ftps|file|smb|afp|nfs|(x-)?man|gopher|txmt)://|mailto:)\n\t\t\t\t\t\t[-:@a-zA-Z0-9_.,~%+/?=&#]+(?<![.,?:])\n\t\t\t\t\t"
      }
    ]
  }
];

exports.Plain TextSyntax = new TextmateSyntax(repositories, patterns);
