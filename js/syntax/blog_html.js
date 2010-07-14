"define metadata";
({
    "description": "Blog — HTML syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "blog.html",
            "pointer": "#Blog — HTMLSyntax",
            "fileexts": [
  "blog.html"
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
    "name": "meta.header.blog",
    "captures": {
      "1": {
        "name": "keyword.other.blog"
      },
      "2": {
        "name": "punctuation.separator.key-value.blog"
      },
      "3": {
        "name": "string.unquoted.blog"
      }
    },
    "match": "^([Tt]itle|[Dd]ate|[Bb]asename|[Kk]eywords|[Bb]log|[Tt]ype|[Ll]ink|[Pp]ost|[Tt]ags|[Cc]omments|[Pp]ings?|[Cc]ategory|[Ss]tatus|[Ff]ormat)(:)\\s*(.*)$\\n?"
  },
  {
    "name": "invalid.illegal.meta.header.blog",
    "match": "^([A-Za-z0-9]+):\\s*(.*)$\\n?"
  },
  {
    "name": "text.html",
    "begin": "^(?![A-Za-z0-9]+:)",
    "end": "^(?=not)possible$",
    "patterns": [
      {
        "name": "meta.separator.blog",
        "match": "^✂-[✂-]+$\\n"
      },
      {
        "include": "text.html.basic"
      }
    ]
  }
];

exports.Blog — HTMLSyntax = new TextmateSyntax(repositories, patterns);
