"define metadata";
({
    "description": "HTML syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "html",
            "pointer": "#HTMLSyntax",
            "fileexts": [
  "html",
  "htm",
  "shtml",
  "xhtml",
  "phtml",
  "php",
  "inc",
  "tmpl",
  "tpl"
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
        "name": "source.php.embedded.line.empty.html",
        "captures": {
          "1": {
            "name": "source.php.embedded.line.empty.whitespace.html"
          }
        },
        "match": "<\\?(?i:php|=)?(\\s*\\?)>"
      },
      {
        "name": "source.php.embedded.block.html",
        "begin": "(?:^\\s*)(?=<\\?(?i:php|=)?(?!.*\\?>))",
        "comment": "match only multi-line PHP with leading whitespace",
        "applyEndPatternLast": 1,
        "end": "(?<=\\?>)(?:\\s*$\\n)?",
        "patterns": [
          {
            "include": "source.php"
          }
        ]
      },
      {
        "name": "source.php.embedded.line.html",
        "begin": "(?=<\\?(?i:php|=)?)",
        "applyEndPatternLast": 1,
        "end": "(?<=\\?>)",
        "patterns": [
          {
            "include": "source.php"
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
            "name": "punctuation.definition.entity.html"
          },
          "3": {
            "name": "punctuation.definition.entity.html"
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
        "include": "#tag-id-attribute"
      },
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
        "include": "#embedded-code"
      }
    ]
  },
  "python": {
    "begin": "(?:^\\s*)<\\?python(?!.*\\?>)",
    "name": "source.python.embedded.html",
    "end": "\\?>(?:\\s*$\\n)?",
    "patterns": [
      {
        "include": "source.python"
      }
    ]
  },
  "smarty": {
    "patterns": [
      {
        "begin": "(\\{(literal)\\})",
        "captures": {
          "1": {
            "name": "source.smarty.embedded.html"
          },
          "2": {
            "name": "support.function.built-in.smarty"
          }
        },
        "end": "(\\{/(literal)\\})"
      },
      {
        "name": "source.smarty.embedded.html",
        "begin": "{{|{",
        "end": "}}|}",
        "patterns": [
          {
            "include": "source.smarty"
          }
        ],
        "disabled": 1
      }
    ]
  },
  "tag-id-attribute": {
    "begin": "\\b(id)\\b\\s*(=)",
    "name": "meta.attribute-with-value.id.html",
    "captures": {
      "1": {
        "name": "entity.other.attribute-name.id.html"
      },
      "2": {
        "name": "punctuation.separator.key-value.html"
      }
    },
    "end": "(?<='|\")",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "\"",
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
        "contentName": "meta.toc-list.id.html",
        "patterns": [
          {
            "include": "#embedded-code"
          },
          {
            "include": "#entities"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "'",
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
        "contentName": "meta.toc-list.id.html",
        "patterns": [
          {
            "include": "#embedded-code"
          },
          {
            "include": "#entities"
          }
        ]
      }
    ]
  },
  "ruby": {
    "patterns": [
      {
        "name": "comment.block.erb",
        "begin": "<%+#",
        "captures": {
          "0": {
            "name": "punctuation.definition.comment.erb"
          }
        },
        "end": "%>"
      },
      {
        "name": "source.ruby.embedded.html",
        "begin": "<%+(?!>)=?",
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
      {
        "name": "source.ruby.nitro.embedded.html",
        "begin": "<\\?r(?!>)=?",
        "captures": {
          "0": {
            "name": "punctuation.section.embedded.ruby.nitro"
          }
        },
        "end": "-?\\?>",
        "patterns": [
          {
            "name": "comment.line.number-sign.ruby.nitro",
            "captures": {
              "1": {
                "name": "punctuation.definition.comment.ruby.nitro"
              }
            },
            "match": "(#).*?(?=-?\\?>)"
          },
          {
            "include": "source.ruby"
          }
        ]
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
        "include": "#ruby"
      },
      {
        "include": "#php"
      },
      {
        "include": "#smarty"
      },
      {
        "include": "#python"
      }
    ]
  },
  "tag-generic-attribute": {
    "name": "entity.other.attribute-name.html",
    "match": "\\b([a-zA-Z\\-:]+)"
  }
};

var patterns = [
  {
    "name": "meta.tag.any.html",
    "begin": "(<)([a-zA-Z0-9:]+)(?=[^>]*></\\2>)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "meta.scope.between-tag-pair.html"
      },
      "3": {
        "name": "entity.name.tag.html"
      },
      "4": {
        "name": "punctuation.definition.tag.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.html"
      }
    },
    "end": "(>(<)/)(\\2)(>)",
    "patterns": [
      {
        "include": "#tag-stuff"
      }
    ]
  },
  {
    "name": "meta.tag.preprocessor.xml.html",
    "begin": "(<\\?)(xml)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.xml.html"
      }
    },
    "end": "(\\?>)",
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
  {
    "name": "comment.block.html",
    "begin": "<!--",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.html"
      }
    },
    "end": "--\\s*>",
    "patterns": [
      {
        "name": "invalid.illegal.bad-comments-or-CDATA.html",
        "match": "--"
      },
      {
        "include": "#embedded-code"
      }
    ]
  },
  {
    "name": "meta.tag.sgml.html",
    "begin": "<!",
    "captures": {
      "0": {
        "name": "punctuation.definition.tag.html"
      }
    },
    "end": ">",
    "patterns": [
      {
        "name": "meta.tag.sgml.doctype.html",
        "begin": "(DOCTYPE)",
        "captures": {
          "1": {
            "name": "entity.name.tag.doctype.html"
          }
        },
        "end": "(?=>)",
        "patterns": [
          {
            "name": "string.quoted.double.doctype.identifiers-and-DTDs.html",
            "match": "\"[^\">]*\""
          }
        ]
      },
      {
        "name": "constant.other.inline-data.html",
        "begin": "\\[CDATA\\[",
        "end": "]](?=>)"
      },
      {
        "name": "invalid.illegal.bad-comments-or-CDATA.html",
        "match": "(\\s*)(?!--|>)\\S(\\s*)"
      }
    ]
  },
  {
    "include": "#embedded-code"
  },
  {
    "name": "source.css.embedded.html",
    "begin": "(?:^\\s+)?(<)((?i:style))\\b(?![^>]*/>)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.style.html"
      },
      "3": {
        "name": "punctuation.definition.tag.html"
      }
    },
    "end": "(</)((?i:style))(>)(?:\\s*\\n)?",
    "patterns": [
      {
        "include": "#tag-stuff"
      },
      {
        "begin": "(>)",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.tag.html"
          }
        },
        "end": "(?=</(?i:style))",
        "patterns": [
          {
            "include": "#embedded-code"
          },
          {
            "include": "source.css"
          }
        ]
      }
    ]
  },
  {
    "name": "source.js.embedded.html",
    "begin": "(?:^\\s+)?(<)((?i:script))\\b(?![^>]*/>)",
    "endCaptures": {
      "2": {
        "name": "punctuation.definition.tag.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.script.html"
      }
    },
    "end": "(?<=</(script|SCRIPT))(>)(?:\\s*\\n)?",
    "patterns": [
      {
        "include": "#tag-stuff"
      },
      {
        "begin": "(?<!</(?:script|SCRIPT))(>)",
        "captures": {
          "1": {
            "name": "punctuation.definition.tag.html"
          },
          "2": {
            "name": "entity.name.tag.script.html"
          }
        },
        "end": "(</)((?i:script))",
        "patterns": [
          {
            "name": "comment.line.double-slash.js",
            "captures": {
              "1": {
                "name": "punctuation.definition.comment.js"
              }
            },
            "match": "(//).*?((?=</script)|$\\n?)"
          },
          {
            "name": "comment.block.js",
            "begin": "/\\*",
            "captures": {
              "0": {
                "name": "punctuation.definition.comment.js"
              }
            },
            "end": "\\*/|(?=</script)"
          },
          {
            "include": "#php"
          },
          {
            "include": "source.js"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.tag.structure.any.html",
    "begin": "(</?)((?i:body|head|html)\\b)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.structure.any.html"
      }
    },
    "end": "(>)",
    "patterns": [
      {
        "include": "#tag-stuff"
      }
    ]
  },
  {
    "name": "meta.tag.block.any.html",
    "begin": "(</?)((?i:address|blockquote|dd|div|dl|dt|fieldset|form|frame|frameset|h1|h2|h3|h4|h5|h6|iframe|noframes|object|ol|p|ul|applet|center|dir|hr|menu|pre)\\b)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.block.any.html"
      }
    },
    "end": "(>)",
    "patterns": [
      {
        "include": "#tag-stuff"
      }
    ]
  },
  {
    "name": "meta.tag.inline.any.html",
    "begin": "(</?)((?i:a|abbr|acronym|area|b|base|basefont|bdo|big|br|button|caption|cite|code|col|colgroup|del|dfn|em|font|head|html|i|img|input|ins|isindex|kbd|label|legend|li|link|map|meta|noscript|optgroup|option|param|q|s|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|u|var)\\b)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.inline.any.html"
      }
    },
    "end": "(>)",
    "patterns": [
      {
        "include": "#tag-stuff"
      }
    ]
  },
  {
    "name": "meta.tag.other.html",
    "begin": "(</?)([a-zA-Z0-9:]+)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.other.html"
      }
    },
    "end": "(>)",
    "patterns": [
      {
        "include": "#tag-stuff"
      }
    ]
  },
  {
    "include": "#entities"
  },
  {
    "name": "invalid.illegal.incomplete.html",
    "match": "<>"
  },
  {
    "name": "invalid.illegal.bad-angle-bracket.html",
    "match": "<"
  }
];

exports.HTMLSyntax = new TextmateSyntax(repositories, patterns);
