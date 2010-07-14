"define metadata";
({
    "description": "HTML (ASP.net) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "aspx",
            "pointer": "#HTML (ASP.net)Syntax",
            "fileexts": [
  "aspx",
  "ascx"
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
        "endCaptures": {
          "0": {
            "name": "punctuation.section.embedded.end.php"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.section.embedded.begin.php"
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
      }
    ]
  },
  "source-asp-embedded-scripttag": {
    "begin": "(?:^\\s+)?(<)(script).*runat=.server[^>]*(>)",
    "name": "meta.source.embedded.script-tag",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.script.html"
      },
      "3": {
        "name": "punctuation.definition.tag.html"
      }
    },
    "end": "(</)(script)(>)(?:\\s*$\\n)?",
    "patterns": [
      {
        "name": "source.asp.embedded.html",
        "begin": "(?<=(>))",
        "end": "(?=</script>)",
        "patterns": [
          {
            "include": "source.asp.vb.net"
          }
        ]
      }
    ]
  },
  "source-asp-single-line": {
    "comment": "DEBUG",
    "begin": "<%(=|#|@)",
    "name": "meta.source.embedded.single-line",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.asp"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.asp"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "source.asp.embedded.html",
        "begin": "(?<=<%)",
        "end": "(?=%>)",
        "patterns": [
          {
            "include": "source.asp.vb.net"
          }
        ]
      }
    ]
  },
  "php-source": {
    "patterns": [
      {
        "name": "comment.line.number-sign.php",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.php"
          }
        },
        "match": "(#).*?(?=\\?>)"
      },
      {
        "name": "comment.line.double-slash.php",
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
  "source-asp-return": {
    "begin": "<%=",
    "name": "meta.source.embedded.return-value",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.asp"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.asp"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "source.asp.embedded.html",
        "begin": "(?<=<%=)",
        "end": "(?=%>)",
        "patterns": [
          {
            "include": "source.asp.vb.net"
          }
        ]
      }
    ]
  },
  "smarty": {
    "patterns": [
      {
        "begin": "((\\{)(literal)(\\}))",
        "captures": {
          "1": {
            "name": "source.smarty.embedded.html"
          },
          "2": {
            "name": "punctuation.section.embedded.smarty"
          },
          "3": {
            "name": "support.function.built-in.smarty"
          },
          "4": {
            "name": "punctuation.section.embedded.smarty"
          }
        },
        "end": "((\\{/)(literal)(\\}))"
      },
      {
        "name": "source.smarty.embedded.html",
        "begin": "{{|{",
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
        "disabled": 1
      }
    ]
  },
  "source-asp-bound": {
    "begin": "<%#",
    "name": "meta.source.embedded.bound",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.asp"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.asp"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "source.asp.embedded.html",
        "begin": "(?<=<%#)",
        "end": "(?=%>)",
        "patterns": [
          {
            "include": "source.asp.vb.net"
          }
        ]
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
  "asp": {
    "patterns": [
      {
        "include": "#source-asp-embedded-scripttag"
      },
      {
        "include": "#source-asp-embedded"
      },
      {
        "include": "#source-asp-bound"
      },
      {
        "include": "#source-asp-return"
      },
      {
        "name": "meta.source.embedded.asp.include",
        "captures": {
          "1": {
            "name": "punctuation.definition.tag.asp"
          },
          "3": {
            "name": "punctuation.definition.tag.asp"
          }
        },
        "match": "(<!--)\\s+#include.*(-->)"
      }
    ]
  },
  "ruby": {
    "begin": "<%+(?!>)=?",
    "name": "source.ruby.embedded.html",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.ruby"
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
        "include": "#asp"
      },
      {
        "include": "#smarty"
      }
    ]
  },
  "source-asp-embedded": {
    "begin": "<%(?![=#])",
    "name": "meta.source.embedded",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.asp"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.asp"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "source.asp.embedded.html",
        "begin": "(?<=<%)",
        "end": "(?=%>)",
        "patterns": [
          {
            "include": "source.asp.vb.net"
          }
        ]
      }
    ]
  },
  "tag-generic-attribute": {
    "name": "entity.other.attribute-name.html",
    "match": "\\b([a-zA-Z-:]+)"
  }
};

var patterns = [
  {
    "include": "#php"
  },
  {
    "include": "#asp"
  },
  {
    "include": "#smarty"
  },
  {
    "name": "meta.tag.html",
    "captures": {
      "6": {
        "name": "punctuation.definition.tag.html"
      },
      "1": {
        "name": "punctuation.definition.tag.html"
      },
      "2": {
        "name": "entity.name.tag.html"
      },
      "3": {
        "name": "punctuation.definition.tag.html"
      },
      "4": {
        "name": "meta.scope.between-tag-pair.html"
      },
      "5": {
        "name": "entity.name.tag.html"
      }
    },
    "match": "(<)(\\w+)[^>]*((>)</)(\\2)(>)"
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
        "name": "punctuation.definition.comment.asp.net"
      }
    },
    "end": "-->",
    "patterns": [
      {
        "name": "invalid.illegal.bad-comments-or-CDATA.html",
        "match": "--"
      }
    ]
  },
  {
    "name": "meta.tag.sgml.html",
    "begin": "<!",
    "captures": {
      "0": {
        "name": "punctuation.definition.tag.asp.net"
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
    "name": "source.js.embedded.html",
    "begin": "(?:^\\s+)?(<)((?i:script))\\b(?![^>]*/>)",
    "captures": {
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
          }
        },
        "end": "(</)((?i:script))",
        "patterns": [
          {
            "include": "source.js"
          }
        ]
      }
    ]
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
            "include": "source.css"
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
    "match": "<(?=\\W)|>"
  }
];

exports.HTML (ASP.net)Syntax = new TextmateSyntax(repositories, patterns);
