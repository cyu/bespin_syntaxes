"define metadata";
({
    "description": "XSL syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "xsl",
            "pointer": "#XSLSyntax",
            "fileexts": [
  "xsl",
  "xslt"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "singlequotedString": {
    "begin": "'",
    "name": "string.quoted.single.xml",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.xml"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.xml"
      }
    },
    "end": "'"
  },
  "doublequotedString": {
    "begin": "\"",
    "name": "string.quoted.double.xml",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.xml"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.xml"
      }
    },
    "end": "\""
  }
};

var patterns = [
  {
    "name": "meta.tag.xml.template",
    "begin": "(<)(xsl)((:))(template)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.xml"
      },
      "2": {
        "name": "entity.name.tag.namespace.xml"
      },
      "3": {
        "name": "entity.name.tag.xml"
      },
      "4": {
        "name": "punctuation.separator.namespace.xml"
      },
      "5": {
        "name": "entity.name.tag.localname.xml"
      }
    },
    "end": "(>)",
    "patterns": [
      {
        "captures": {
          "1": {
            "name": "entity.other.attribute-name.namespace.xml"
          },
          "2": {
            "name": "entity.other.attribute-name.xml"
          },
          "3": {
            "name": "punctuation.separator.namespace.xml"
          },
          "4": {
            "name": "entity.other.attribute-name.localname.xml"
          }
        },
        "match": " (?:([-_a-zA-Z0-9]+)((:)))?([a-zA-Z-]+)"
      },
      {
        "include": "#doublequotedString"
      },
      {
        "include": "#singlequotedString"
      }
    ]
  },
  {
    "include": "text.xml"
  }
];

exports.XSLSyntax = new TextmateSyntax(repositories, patterns);
