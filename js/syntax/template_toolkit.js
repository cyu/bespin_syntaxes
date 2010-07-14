"define metadata";
({
    "description": "Template Toolkit syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "tt",
            "pointer": "#Template ToolkitSyntax",
            "fileexts": [
  "tt"
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
    "name": "string.quoted.double.tt",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.tt"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.tt"
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
      },
      {
        "include": "#keyword"
      }
    ]
  },
  "tmpl-container-tag": {
    "patterns": [
      {
        "name": "meta.tag.template.tt",
        "begin": "\\[%",
        "captures": {
          "0": {
            "name": "punctuation.definition.tag.tt"
          }
        },
        "end": "%\\]",
        "patterns": [
          {
            "include": "#tt-stuff"
          }
        ]
      }
    ]
  },
  "string-single-quoted": {
    "begin": "'",
    "name": "string.quoted.single.tt",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.tt"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.tt"
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

  },
  "keyword": {
    "name": "string.unquoted.tt",
    "match": "\\b([A-Za-z0-9_]+)"
  },
  "tt-stuff": {
    "patterns": [
      {
        "name": "comment.line.number-sign.tt",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.tt"
          }
        },
        "match": "(#).*?(?=%\\])"
      },
      {
        "captures": {
          "1": {
            "name": "string.quoted.double.filename.tt"
          },
          "2": {
            "name": "punctuation.definition.string.begin.tt"
          },
          "4": {
            "name": "punctuation.definition.string.begin.tt"
          },
          "5": {
            "name": "string.unquoted.other.filename.tt"
          }
        },
        "match": "((\")([a-z][a-z0-9_]+\\/)+[a-z0-9_\\.]+(\"))|(\\b([a-z][a-z0-9_]+\\/)+[a-z0-9_\\.]+\\b)"
      },
      {
        "include": "#string-double-quoted"
      },
      {
        "include": "#string-single-quoted"
      },
      {
        "name": "variable.other.tt",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.tt"
          }
        },
        "match": "(\\$?)\\b[a-z]([a-z0-9_]\\.?)*\\b"
      },
      {
        "name": "keyword.control.tt",
        "match": "\\b(?:IF|END|BLOCK|INCLUDE|ELSE|ELSIF|SWITCH|CASE|UNLESS|WRAPPER|FOR|FOREACH|LAST|NEXT|USE|WHILE|FILTER|IN|GET|CALL|SET|INSERT|MACRO|PERL|TRY|CATCH|THROW|FINAL|STOP|META|DEBUG|RAWPERL)\\b"
      },
      {
        "name": "keyword.operator.tt",
        "match": "\\||\\|\\||=|_|-|\\*|\\/|\\?|:|div|mod|;|\\+"
      }
    ]
  },
  "tag-generic-attribute": {
    "name": "entity.other.attribute-name.tt",
    "captures": {
      "2": {
        "name": "punctuation.separator.key-value.tt"
      }
    },
    "match": "\\b([a-zA-Z-_:]+)\\s*(=)"
  }
};

var patterns = [
  {
    "begin": "(?=\\[% *(?:RAW)?PERL\\b.*? *%\\])",
    "endCaptures": {
      "0": {
        "name": "meta.tag.template.tt"
      },
      "1": {
        "name": "punctuation.definition.tag.tt"
      },
      "2": {
        "name": "entity.name.tag.tt"
      },
      "3": {
        "name": "punctuation.definition.tag.tt"
      }
    },
    "end": "(\\[%) *(END) *(%\\])",
    "contentName": "source.perl",
    "patterns": [
      {
        "include": "#tmpl-container-tag"
      },
      {
        "include": "source.perl"
      }
    ]
  },
  {
    "include": "#tmpl-container-tag"
  },
  {
    "include": "text.html.basic"
  }
];

exports.Template ToolkitSyntax = new TextmateSyntax(repositories, patterns);
