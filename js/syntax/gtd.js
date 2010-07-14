"define metadata";
({
    "description": "GTD syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "gtd",
            "pointer": "#GTDSyntax",
            "fileexts": [
  "gtd"
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
    "name": "markup.other.pagename",
    "match": "[A-Z][a-z]+([A-Z][a-z]*)+"
  },
  {
    "name": "string.unquoted.gtd",
    "match": "^-\\s{2}\\S+\\s"
  },
  {
    "name": "entity.name.tag.gtd",
    "match": "^<-\\s\\S+\\s"
  },
  {
    "name": "constant.language.gtd",
    "match": "^->\\s\\S+\\s"
  },
  {
    "name": "variable.language.gtd",
    "match": "^\\+\\s{2}\\S+\\s"
  },
  {
    "name": "comment.line.gtd",
    "match": "^\\^\\s{2}\\S+\\s"
  },
  {
    "name": "support.class.exception.gtd",
    "match": "^\\!\\s{2}\\S+\\s"
  }
];

exports.GTDSyntax = new TextmateSyntax(repositories, patterns);
