"define metadata";
({
    "description": "XML strict syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#XML strictSyntax",
            "fileexts": [

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
    "name": "meta.tag.processing-instruction.xml",
    "begin": "<\\?",
    "captures": {
      "0": {
        "name": "punctuation.definition.tag.xml"
      }
    },
    "end": ">"
  },
  {
    "name": "meta.tag.sgml.xml",
    "begin": "<!",
    "captures": {
      "0": {
        "name": "punctuation.definition.tag.xml"
      }
    },
    "end": ">"
  },
  {
    "name": "meta.tag.xml",
    "begin": "(<)(?:([-_[:alnum:]]+)((:)))?([-_.:[:alnum:]]+)",
    "endCaptures": {
      "6": {
        "name": "entity.name.tag.localname.xml"
      },
      "7": {
        "name": "punctuation.definition.tag.xml"
      },
      "8": {
        "name": "invalid.illegal.unexpected-end-tag.xml"
      },
      "1": {
        "name": "punctuation.definition.tag.xml"
      },
      "2": {
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
    "beginCaptures": {
      "6": {
        "name": "invalid.illegal.unexpected-end-tag.xml"
      },
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
    "end": "(/>)|(</)(\\2)((\\4))(\\5)(>)|(</[-_.:[:alnum:]]+>)",
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
        "match": "\\s+(?:([-_a-zA-Z0-9]+)((:)))?([a-zA-Z-]+)="
      },
      {
        "name": "string.quoted.double.xml",
        "begin": "\"",
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
      },
      {
        "name": "string.quoted.single.xml",
        "begin": "'",
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
      {
        "name": "meta.tag-content.xml",
        "begin": ">",
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.tag.xml"
          }
        },
        "end": "(?=</)",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  }
];

exports.XML strictSyntax = new TextmateSyntax(repositories, patterns);
