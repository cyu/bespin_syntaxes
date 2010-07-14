"define metadata";
({
    "description": "reStructuredText syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "rst",
            "pointer": "#reStructuredTextSyntax",
            "fileexts": [
  "rst",
  "rest"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "inline": {
    "patterns": [
      {
        "begin": "^([ \\t]*)((\\.\\.)\\sraw(::)) html",
        "comment": "directives.html",
        "captures": {
          "2": {
            "name": "meta.directive.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.directive.restructuredtext"
          },
          "4": {
            "name": "punctuation.separator.key-value.restructuredtext"
          }
        },
        "end": "^(?!\\1[ \\t])",
        "patterns": [
          {
            "include": "text.html.basic"
          }
        ]
      },
      {
        "name": "meta.other.directive.restructuredtext",
        "comment": "directives",
        "captures": {
          "1": {
            "name": "punctuation.definition.directive.restructuredtext"
          },
          "2": {
            "name": "punctuation.separator.key-value.restructuredtext"
          }
        },
        "match": "(\\.\\.)\\s[A-z][A-z0-9-_]+(::)\\s*$"
      },
      {
        "name": "meta.raw.block.restructuredtext",
        "begin": "^([ \\t]*).*?((::))",
        "comment": "verbatim blocks",
        "captures": {
          "2": {
            "name": "markup.raw.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.raw.restructuredtext"
          }
        },
        "end": "^(?=\\1[^\\s]+)",
        "patterns": [
          {
            "name": "markup.raw.restructuredtext",
            "match": ".+"
          }
        ]
      },
      {
        "name": "meta.startraw.restructuredtext",
        "comment": "directives",
        "match": "::"
      },
      {
        "name": "markup.bold.restructuredtext",
        "comment": "strong emphasis",
        "captures": {
          "1": {
            "name": "punctuation.definition.italic.restructuredtext"
          },
          "2": {
            "name": "punctuation.definition.italic.restructuredtext"
          }
        },
        "match": "(\\*\\*)[^*]+(\\*\\*)"
      },
      {
        "name": "markup.italic.restructuredtext",
        "comment": "emphasis",
        "captures": {
          "1": {
            "name": "punctuation.definition.italic.restructuredtext"
          },
          "2": {
            "name": "punctuation.definition.italic.restructuredtext"
          }
        },
        "match": "(\\*)\\w[^*]\\w+(\\*)"
      },
      {
        "name": "meta.link.reference.def.restructuredtext",
        "comment": "replacement",
        "captures": {
          "1": {
            "name": "punctuation.definition.link.restructuredtext"
          },
          "2": {
            "name": "punctuation.definition.string.restructuredtext"
          },
          "3": {
            "name": "string.other.link.title.restructuredtext"
          },
          "4": {
            "name": "punctuation.separator.key-value.restructuredtext"
          },
          "5": {
            "name": "markup.underline.link.restructuredtext"
          }
        },
        "match": "(\\.\\.)\\s+(_)([\\w\\s]+)(:)\\s+(.*)"
      },
      {
        "name": "markup.underline.substitution.restructuredtext",
        "comment": "substitution",
        "captures": {
          "1": {
            "name": "punctuation.definition.substitution.restructuredtext"
          }
        },
        "match": "(\\|)[^|]+(\\|_{0,2})"
      },
      {
        "name": "meta.link.reference",
        "comment": "links `...`_ or `...`__",
        "captures": {
          "1": {
            "name": "string.other.link.title.restructuredtext"
          },
          "2": {
            "name": "punctuation.definition.link.restructuredtext"
          }
        },
        "match": "\\b(\\w+)(_)\\b"
      },
      {
        "name": "meta.link.reference",
        "comment": "links `...`_ or `...`__",
        "captures": {
          "1": {
            "name": "punctuation.definition.link.restructuredtext"
          },
          "2": {
            "name": "string.other.link.title.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.link.restructuredtext"
          }
        },
        "match": "(`)([\\w\\s]+)(`_)"
      },
      {
        "name": "meta.link.inline.restructuredtext",
        "comment": "links `...`_ ",
        "captures": {
          "6": {
            "name": "punctuation.definition.link.restructuredtext"
          },
          "1": {
            "name": "punctuation.definition.link.restructuredtext"
          },
          "2": {
            "name": "string.other.link.title.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.location.restructuredtext"
          },
          "4": {
            "name": "markup.underline.link.restructuredtext"
          },
          "5": {
            "name": "punctuation.definition.location.restructuredtext"
          }
        },
        "match": "(`)([\\w\\s]+)\\s+(<)(.*?)(>)(`_)"
      },
      {
        "name": "meta.link.footnote.def.restructuredtext",
        "comment": "replacement",
        "captures": {
          "6": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "7": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "8": {
            "name": "string.other.footnote.restructuredtext"
          },
          "1": {
            "name": "punctuation.definition.link.restructuredtext"
          },
          "2": {
            "name": "constant.other.footnote.link.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.constant.restructuredtext"
          }
        },
        "match": "^(\\.\\.)\\s+((\\[)(((#?)[\\w\\s]*?)|\\*)(\\]))\\s+(.*)"
      },
      {
        "name": "meta.link.footnote.numeric.restructuredtext",
        "comment": "footnote reference: [0]_",
        "captures": {
          "1": {
            "name": "constant.other.footnote.link"
          },
          "2": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "4": {
            "name": "punctuation.definition.constant.restructuredtext"
          }
        },
        "match": "((\\[)[0-9]+(\\]))(_)"
      },
      {
        "name": "meta.link.footnote.auto.restructuredtext",
        "comment": "footnote reference [#]_ or [#foo]_",
        "captures": {
          "1": {
            "name": "constant.other.footnote.link"
          },
          "2": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "4": {
            "name": "punctuation.definition.constant.restructuredtext"
          }
        },
        "match": "((\\[#)[A-z0-9_]*(\\]))(_)"
      },
      {
        "name": "meta.link.footnote.symbol.auto.restructuredtext",
        "comment": "footnote reference [*]_",
        "captures": {
          "1": {
            "name": "constant.other.footnote.link.restructuredtext"
          },
          "2": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "4": {
            "name": "punctuation.definition.constant.restructuredtext"
          }
        },
        "match": "((\\[)\\*(\\]))(_)"
      },
      {
        "name": "meta.link.citation.def.restructuredtext",
        "comment": "replacement",
        "captures": {
          "6": {
            "name": "string.other.citation.restructuredtext"
          },
          "1": {
            "name": "punctuation.definition.link.restructuredtext"
          },
          "2": {
            "name": "constant.other.citation.link.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "4": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "5": {
            "name": "punctuation.definition.constant.restructuredtext"
          }
        },
        "match": "^(\\.\\.)\\s+((\\[)[A-z][A-z0-9]*(\\]))(_)\\s+(.*)"
      },
      {
        "name": "meta.link.citation.restructuredtext",
        "comment": "citation reference",
        "captures": {
          "1": {
            "name": "constant.other.citation.link.restructuredtext"
          },
          "2": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "3": {
            "name": "punctuation.definition.constant.restructuredtext"
          },
          "4": {
            "name": "punctuation.definition.constant.restructuredtext"
          }
        },
        "match": "((\\[)[A-z][A-z0-9_-]*(\\]))(_)"
      },
      {
        "name": "markup.raw.restructuredtext",
        "begin": "``",
        "comment": "inline literal",
        "captures": {
          "0": {
            "name": "punctuation.definition.raw.restructuredtext"
          }
        },
        "end": "``"
      },
      {
        "name": "markup.other.command.restructuredtext",
        "comment": "intepreted text",
        "captures": {
          "1": {
            "name": "punctuation.definition.intepreted.restructuredtext"
          },
          "2": {
            "name": "punctuation.definition.intepreted.restructuredtext"
          }
        },
        "match": "(`)[^`]+(`)(?!_)"
      },
      {
        "name": "entity.name.tag.restructuredtext",
        "comment": "field list",
        "captures": {
          "1": {
            "name": "punctuation.definition.field.restructuredtext"
          },
          "2": {
            "name": "punctuation.definition.field.restructuredtext"
          }
        },
        "match": "(:)[A-z][A-z0-9  =\\s\\t_]*(:)"
      },
      {
        "name": "markup.other.table.restructuredtext",
        "comment": "table",
        "captures": {
          "0": {
            "name": "punctuation.definition.table.restructuredtext"
          }
        },
        "match": "\\+-[+-]+"
      },
      {
        "name": "markup.other.table.restructuredtext",
        "comment": "table",
        "captures": {
          "0": {
            "name": "punctuation.definition.table.restructuredtext"
          }
        },
        "match": "\\+=[+=]+"
      },
      {
        "name": "markup.heading.restructuredtext",
        "captures": {
          "1": {
            "name": "punctuation.definition.heading.restructuredtext"
          }
        },
        "match": "(^(=|-|~|`|#|\"|\\^|\\+|\\*){3,}$){1,1}?"
      },
      {
        "name": "comment.line.double-dot.restructuredtext",
        "begin": "^(\\.\\.)",
        "comment": "comment",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.comment.restructuredtext"
          }
        },
        "end": "$\\n?"
      }
    ]
  }
};

var patterns = [
  {
    "begin": "^([ \\t]*)(?=\\S)",
    "end": "^(?!\\1(?=\\S))",
    "contentName": "meta.paragraph.restructuredtext",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  }
];

exports.reStructuredTextSyntax = new TextmateSyntax(repositories, patterns);
