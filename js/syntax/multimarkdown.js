"define metadata";
({
    "description": "MultiMarkdown syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "MultiMarkdown",
            "pointer": "#MultiMarkdownSyntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = null;

var patterns = [
  {
    "name": "meta.header.multimarkdown",
    "begin": "^([A-Za-z0-9]+)(:)\\s*",
    "beginCaptures": {
      "1": {
        "name": "keyword.other.multimarkdown"
      },
      "2": {
        "name": "punctuation.separator.key-value.multimarkdown"
      }
    },
    "end": "^$|^(?=[A-Za-z0-9]+:)",
    "patterns": [
      {
        "name": "string.unquoted.multimarkdown",
        "comment": "The reason for not setting scopeName = \"string.unquoted\" \n\t\t\t\t\t\t(for the parent rule) is that we do not want\n\t\t\t\t\t\tnewlines to be marked as string.unquoted",
        "match": ".+"
      }
    ]
  },
  {
    "name": "meta.content.multimarkdown",
    "begin": "^(?!=[A-Za-z0-9]+:)",
    "end": "^(?=not)possible$",
    "patterns": [
      {
        "include": "text.html.markdown"
      }
    ]
  }
];

exports.MultiMarkdownSyntax = new TextmateSyntax(repositories, patterns);
