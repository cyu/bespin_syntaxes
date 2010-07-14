"define metadata";
({
    "description": "XML syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "xml",
            "pointer": "#XMLSyntax",
            "fileexts": [
  "xml",
  "tld",
  "jsp",
  "pt",
  "cpt",
  "dtml",
  "rss",
  "opml"
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
  "tagStuff": {
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
        "match": " (?:([-_a-zA-Z0-9]+)((:)))?([_a-zA-Z-]+)="
      },
      {
        "include": "#doublequotedString"
      },
      {
        "include": "#singlequotedString"
      }
    ]
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
    "name": "meta.tag.preprocessor.xml",
    "begin": "(<\\?)\\s*([-_a-zA-Z0-9]+)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.xml"
      },
      "2": {
        "name": "entity.name.tag.xml"
      }
    },
    "end": "(\\?>)",
    "patterns": [
      {
        "name": "entity.other.attribute-name.xml",
        "match": " ([a-zA-Z-]+)"
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
    "name": "meta.tag.sgml.doctype.xml",
    "begin": "(<!)(DOCTYPE)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.xml"
      },
      "2": {
        "name": "entity.name.tag.doctype.xml"
      }
    },
    "end": "(>)",
    "patterns": [
      {
        "begin": "(<!)(ENTITY)\\s([-_a-zA-Z0-9]+)",
        "captures": {
          "1": {
            "name": "punctuation.definition.tag.xml"
          },
          "2": {
            "name": "entity.name.tag.entity.xml"
          },
          "3": {
            "name": "meta.entity.xml"
          }
        },
        "end": "(>)",
        "patterns": [
          {
            "include": "#doublequotedString"
          },
          {
            "include": "#singlequotedString"
          }
        ]
      }
    ]
  },
  {
    "name": "comment.block.xml",
    "begin": "<[!%]--",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.xml"
      }
    },
    "end": "--%?>"
  },
  {
    "name": "meta.tag.no-content.xml",
    "begin": "(<)((?:([-_a-zA-Z0-9]+)((:)))?([-_a-zA-Z0-9:]+))(?=(\\s[^>]*)?></\\2>)",
    "endCaptures": {
      "6": {
        "name": "entity.name.tag.localname.xml"
      },
      "7": {
        "name": "punctuation.definition.tag.xml"
      },
      "1": {
        "name": "punctuation.definition.tag.xml"
      },
      "2": {
        "name": "meta.scope.between-tag-pair.xml"
      },
      "3": {
        "name": "entity.name.tag.namespace.xml"
      },
      "4": {
        "name": "entity.name.tag.xml"
      },
      "5": {
        "name": "punctuation.separator.namespace.xml"
      }
    },
    "beginCaptures": {
      "6": {
        "name": "entity.name.tag.localname.xml"
      },
      "1": {
        "name": "punctuation.definition.tag.xml"
      },
      "3": {
        "name": "entity.name.tag.namespace.xml"
      },
      "4": {
        "name": "entity.name.tag.xml"
      },
      "5": {
        "name": "punctuation.separator.namespace.xml"
      }
    },
    "end": "(>(<))/(?:([-_a-zA-Z0-9]+)((:)))?([-_a-zA-Z0-9:]+)(>)",
    "patterns": [
      {
        "include": "#tagStuff"
      }
    ]
  },
  {
    "name": "meta.tag.xml",
    "begin": "(</?)(?:([-_a-zA-Z0-9]+)((:)))?([-_a-zA-Z0-9:]+)",
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
    "end": "(/?>)",
    "patterns": [
      {
        "include": "#tagStuff"
      }
    ]
  },
  {
    "name": "constant.character.entity.xml",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.xml"
      },
      "3": {
        "name": "punctuation.definition.constant.xml"
      }
    },
    "match": "(&)([a-zA-Z0-9_-]+|#[0-9]+|#x[0-9a-fA-F]+)(;)"
  },
  {
    "name": "invalid.illegal.bad-ampersand.xml",
    "match": "&"
  },
  {
    "name": "source.java-props.embedded.xml",
    "begin": "<%@",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.xml"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.xml"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "keyword.other.page-props.xml",
        "match": "page|include|taglib"
      }
    ]
  },
  {
    "name": "source.java.embedded.xml",
    "begin": "<%[!=]?(?!--)",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.xml"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.xml"
      }
    },
    "end": "(?!--)%>",
    "patterns": [
      {
        "include": "source.java"
      }
    ]
  },
  {
    "name": "string.unquoted.cdata.xml",
    "begin": "<!\\[CDATA\\[",
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
    "end": "]]>"
  }
];

exports.XMLSyntax = new TextmateSyntax(repositories, patterns);
