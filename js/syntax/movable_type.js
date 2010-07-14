"define metadata";
({
    "description": "Movable Type syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "mtml",
            "pointer": "#Movable TypeSyntax",
            "fileexts": [
  "mtml"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "string-double-quoted": {
    "begin": "\"",
    "name": "string.quoted.double.html",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.html"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.html"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#embedded-code"
      },
      {
        "include": "#entities"
      }
    ]
  },
  "php": {
    "patterns": [
      {
        "name": "source.php.embedded.html",
        "begin": "(?:^\\s*)(<\\?(php|=)?)(?!.*\\?>)",
        "comment": "match only multi-line PHP with leading whitespace",
        "captures": {
          "1": {
            "name": "punctuation.section.embedded.php"
          }
        },
        "end": "(\\?>)(?:\\s*$\\n)?",
        "patterns": [
          {
            "include": "#php-source"
          }
        ]
      },
      {
        "name": "source.php.embedded.html",
        "begin": "<\\?(php|=)?",
        "captures": {
          "0": {
            "name": "punctuation.section.embedded.php"
          }
        },
        "end": "\\?>",
        "patterns": [
          {
            "include": "#php-source"
          }
        ]
      }
    ]
  },
  "entities": {
    "patterns": [
      {
        "name": "constant.character.entity.html",
        "captures": {
          "1": {
            "name": "punctuation.definition.constant.html"
          },
          "3": {
            "name": "punctuation.definition.constant.html"
          }
        },
        "match": "(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)"
      },
      {
        "name": "invalid.illegal.bad-ampersand.html",
        "match": "&"
      }
    ]
  },
  "tag-stuff": {
    "patterns": [
      {
        "include": "#tag-generic-attribute"
      },
      {
        "include": "#string-double-quoted"
      },
      {
        "include": "#string-single-quoted"
      }
    ]
  },
  "mt-variable-tag": {
    "patterns": [
      {
        "name": "meta.tag.mt.variable.html",
        "begin": "(<)(\\$MT\\w+)",
        "endCaptures": {
          "1": {
            "name": "variable.other.mt"
          },
          "2": {
            "name": "punctuation.definition.tag.mt"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.tag.mt"
          },
          "2": {
            "name": "variable.other.mt"
          }
        },
        "end": "(\\$)?(>)",
        "patterns": [
          {
            "include": "#tag-stuff"
          }
        ]
      }
    ]
  },
  "php-source": {
    "patterns": [
      {
        "name": "comment.line.number-sign.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.php"
          }
        },
        "match": "(#).*?(?=\\?>)"
      },
      {
        "name": "comment.line.double-slash.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.php"
          }
        },
        "match": "(//).*?(?=\\?>)"
      },
      {
        "include": "source.php"
      }
    ]
  },
  "smarty": {
    "begin": "{{|{",
    "name": "source.smarty.embedded.xhtml",
    "captures": {
      "0": {
        "name": "punctuation.section.embedded.smarty"
      }
    },
    "end": "}}|}",
    "patterns": [
      {
        "include": "source.smarty"
      }
    ],
    "disabled": "1"
  },
  "ruby": {
    "begin": "<%+(?!>)=?",
    "name": "source.ruby.embedded.html",
    "captures": {
      "0": {
        "name": "punctuation.section.embedded.ruby"
      }
    },
    "end": "-?%>",
    "patterns": [
      {
        "name": "comment.line.number-sign.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.ruby"
          }
        },
        "match": "(#).*?(?=-?%>)"
      },
      {
        "include": "source.ruby"
      }
    ]
  },
  "string-single-quoted": {
    "begin": "'",
    "name": "string.quoted.single.html",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.html"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.html"
      }
    },
    "end": "'",
    "patterns": [
      {
        "include": "#embedded-code"
      },
      {
        "include": "#entities"
      }
    ]
  },
  "embedded-code": {
    "patterns": [
      {
        "include": "#php"
      },
      {
        "include": "#ruby"
      },
      {
        "include": "#smarty"
      }
    ]
  },
  "tag-generic-attribute": {
    "name": "entity.other.attribute-name.html",
    "match": "\\b([a-zA-Z-_:]+)"
  },
  "mt-container-tag": {
    "patterns": [
      {
        "name": "meta.tag.mt.container.html",
        "begin": "(</?)(MT\\w+)",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.tag.mt"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.tag.mt"
          },
          "2": {
            "name": "entity.name.tag.mt"
          }
        },
        "end": ">",
        "patterns": [
          {
            "include": "#tag-stuff"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "include": "#mt-container-tag"
  },
  {
    "include": "#mt-variable-tag"
  },
  {
    "comment": "This is set to use XHTML standards, but you can change that by changing .strict to .basic for HTML standards",
    "include": "text.html.basic"
  },
  {
    "name": "source.smarty.embedded.html",
    "begin": "{{",
    "captures": {
      "0": {
        "name": "punctuation.section.embedded.smarty"
      }
    },
    "end": "}}",
    "patterns": [
      {
        "include": "source.smarty"
      }
    ]
  }
];

exports.Movable TypeSyntax = new TextmateSyntax(repositories, patterns);
