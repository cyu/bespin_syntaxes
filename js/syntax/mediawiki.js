"define metadata";
({
    "description": "Mediawiki syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "mediawiki",
            "pointer": "#MediawikiSyntax",
            "fileexts": [
  "mediawiki",
  "wikipedia",
  "wiki"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "comments": {
    "patterns": [
      {
        "name": "comment.block.html.mediawiki",
        "begin": "<!--",
        "end": "--\\s*>",
        "patterns": [
          {
            "name": "invalid.illegal.bad-comments-or-CDATA.html.mediawiki",
            "match": "--"
          }
        ]
      }
    ]
  },
  "entities": {
    "comment": "\n\t\t\t\tMediawiki supports Unicode, so these should not usually be\n\t\t\t\tnecessary, but they do show up on pages from time to time.\n\t\t\t",
    "patterns": [
      {
        "name": "constant.character.entity.html.mediawiki",
        "match": "&([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+);"
      },
      {
        "name": "invalid.illegal.bad-ampersand.html.mediawiki",
        "match": "&"
      }
    ]
  },
  "inline": {
    "patterns": [
      {
        "captures": {
          "1": {
            "name": "constant.other.date-time.mediawiki"
          },
          "2": {
            "name": "invalid.illegal.too-many-tildes.mediawiki"
          }
        },
        "match": "(~~~~~)(~{0,2})(?!~)"
      },
      {
        "name": "constant.other.signature.mediawiki",
        "comment": "3 ~s for sig, 4 for sig + timestamp",
        "match": "~~~~?"
      },
      {
        "include": "#link"
      },
      {
        "include": "#style"
      },
      {
        "include": "#template"
      },
      {
        "include": "#block_html"
      },
      {
        "include": "#comments"
      }
    ]
  },
  "table": {
    "patterns": [
      {
        "name": "markup.other.table.mediawiki",
        "begin": "^{\\|",
        "comment": "\n\t\t\t\t\t\twe are going to have to add the styling capabilities\n\t\t\t\t\t\tto this section eventually.  It is complicated,\n\t\t\t\t\t\tthough, so I am putting it off.\n\t\t\t\t\t",
        "end": "^\\|}",
        "patterns": [
          {
            "name": "markup.other.table.row.mediawiki",
            "begin": "^\\|-",
            "comment": "\n\t\t\t\t\t\t\t\thopefully we can allow selection of a whole\n\t\t\t\t\t\t\t\ttable row, and possibly later allow things\n\t\t\t\t\t\t\t\tlike moving a whole row up/down, etc.\n\t\t\t\t\t\t\t",
            "end": "^(?=\\|-|\\|})",
            "patterns": [
              {
                "include": "#inline"
              }
            ]
          },
          {
            "include": "#inline"
          }
        ]
      }
    ]
  },
  "block": {
    "patterns": [
      {
        "name": "meta.redirect.mediawiki",
        "begin": "^\\s*(?i)(#redirect)",
        "beginCaptures": {
          "1": {
            "name": "keyword.control.redirect.mediawiki"
          }
        },
        "end": "\\n",
        "patterns": [
          {
            "include": "#link"
          }
        ]
      },
      {
        "name": "markup.heading.mediawiki",
        "match": "^=+\\s*$"
      },
      {
        "name": "markup.heading.mediawiki",
        "begin": "^(=+)(?=.*\\1\\s*$)",
        "comment": "\n\t\t\t\t\t\tThis matches lines which begin and end with some\n\t\t\t\t\t    number of “=” marks.  If they are mismatched, then\n\t\t\t\t\t    interior “=” marks will be treated as invalid.\n\t\t\t\t    ",
        "end": "\\1\\s*$\\n?",
        "patterns": [
          {
            "name": "invalid.illegal.extra-equals-sign.mediawiki",
            "match": "(?<=^=|^==|^===|^====|^=====|^======)=+|=(?==*\\s*$)"
          },
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "meta.separator.mediawiki",
        "comment": "\n\t\t\t\t\t\tA separator is made up of 4 or more -s alone on a\n\t\t\t\t\t\tline by themselves.\n\t\t\t\t\t",
        "match": "^-{4,}[ \\t]*($\\n)?"
      },
      {
        "name": "markup.raw.block.mediawiki",
        "begin": "^ (?=\\s*\\S)",
        "comment": "\n\t\t\t\t\t\tCode blocks start with one space.  Wiki text and\n\t\t\t\t\t\thtml are still interpreted in MediaWiki, unlike in\n\t\t\t\t\t\tmediawiki.\n\t\t\t\t\t",
        "end": "^(?=[^ ])",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "markup.list.mediawiki",
        "begin": "^([#*:;])",
        "comment": "\n\t\t\t\t\t\tThis is preliminary.  Eventually it would be nice\n\t\t\t\t\t\tto scope each type of list differently, and even to\n\t\t\t\t\t\tdo scopes of nested lists.  There are 4 main things\n\t\t\t\t\t\twhich will be scoped as lists:\n\t\t\t\t\t\t\n\t\t\t\t\t\t  - numbered lists (#)\n\t\t\t\t\t\t  - unnumbered lists (*)\n\t\t\t\t\t\t  - definition lists (; :)\n\t\t\t\t\t\t  - indented paragraphs, as used on talk pages (:)\n\t\t\t\t\t\t\n\t\t\t\t\t\tthis last one might not even be scoped as a list in\n\t\t\t\t\t\tthe ideal case.  It is fine as a list for now,\n\t\t\t\t\t\thowever.\n\t\t\t\t\t",
        "end": "^(?!\\1)",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "include": "#table"
      },
      {
        "include": "#comments"
      },
      {
        "name": "meta.paragraph.mediawiki",
        "begin": "^(?![\\t ;*#:=]|----|$)",
        "comment": "\n\t\t\t\t\t\tAnything that is not a code block, list, header, etc.\n\t\t\t\t\t\tis a paragraph.\n\t\t\t\t\t",
        "end": "^(?:\\s*$|(?=[;*#:=]|----))",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      }
    ]
  },
  "template": {
    "comment": "\n\t\t\t\tThis repository item covers templates and parser functions.\n\t\t\t",
    "patterns": [
      {
        "name": "meta.template-parameter.mediawiki",
        "captures": {
          "1": {
            "name": "variable.parameter.template.numeric.mediawiki"
          }
        },
        "match": "{{{[ ]*([0-9]+)[ ]*}}}"
      },
      {
        "name": "meta.template-parameter.mediawiki",
        "captures": {
          "1": {
            "name": "variable.parameter.template.named.mediawiki"
          }
        },
        "match": "{{{[ ]*(.*?)[ ]*}}}"
      },
      {
        "name": "meta.template.parser-function.mediawiki",
        "begin": "({{)(?=[ ]*#)",
        "comment": "\n\t\t\t\t\t\tWhy oh why did mediawiki have to add these??\n\t\t\t\t\t",
        "endCaptures": {
          "1": {
            "name": "punctuation.fix_this_later.template.mediawiki"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.fix_this_later.template.mediawiki"
          },
          "2": {
            "name": "meta.function-call.template.mediawiki"
          }
        },
        "end": "(}})",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "meta.template.mediawiki",
        "begin": "({{)([^{}\\|]+)?",
        "comment": "\n\t\t\t\t\t\tI am not sure I really like the scope of\n\t\t\t\t\t\tmeta.function-call for templates, but it seems like\n\t\t\t\t\t\tthe closest thing to what a template is really doing,\n\t\t\t\t\t\twith parameters, etc.\n\t\t\t\t\t",
        "endCaptures": {
          "1": {
            "name": "punctuation.fix_this_later.template.mediawiki"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.fix_this_later.template.mediawiki"
          },
          "2": {
            "name": "meta.function-call.template.mediawiki"
          }
        },
        "end": "(}})",
        "patterns": [
          {
            "include": "#comments"
          },
          {
            "begin": "(\\|)\\s*(=)",
            "beginCaptures": {
              "1": {
                "name": "punctuation.fix_this_later.pipe.mediawiki"
              },
              "2": {
                "name": "punctuation.fix_this_later.equals-sign.mediawiki"
              }
            },
            "end": "(?=[|}])",
            "contentName": "comment.block.template-hack.mediawiki"
          },
          {
            "begin": "(\\|)(([^{}\\|=]+)(=))?",
            "beginCaptures": {
              "1": {
                "name": "punctuation.fix_this_later.pipe.mediawiki"
              },
              "2": {
                "name": "variable.parameter.template.mediawiki"
              },
              "3": {
                "name": "punctuation.fix_this_later.equals-sign.mediawiki"
              }
            },
            "end": "(?=[|}])",
            "contentName": "meta.value.template.mediawiki",
            "patterns": [
              {
                "include": "#inline"
              }
            ]
          },
          {
            "name": "punctuation.fix_this_later.pipe.mediawiki",
            "match": "\\|"
          }
        ]
      }
    ]
  },
  "block_html": {
    "comment": "\n\t\t\t\tThe available block HTML tags supported are:\n\t\t\t\t\n\t\t\t\t  * blockquote, center, pre, div, hr, p\n\t\t\t\t  * tables: table, th, tr, td, caption\n\t\t\t\t  * lists: ul, ol, li\n\t\t\t\t  * definition lists: dl, dt, dd\n\t\t\t\t  * headers: h1, h2, h3, h4, h5, h6\n\t\t\t\t  * br\n\t\t\t",
    "patterns": [
      {
        "begin": "(<math>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.math.mediawiki"
          }
        },
        "end": "(</math>)",
        "contentName": "source.math.tex.embedded.mediawiki",
        "patterns": [
          {
            "include": "text.tex.math"
          }
        ]
      },
      {
        "begin": "(<ref>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.ref.mediawiki"
          }
        },
        "end": "(</ref>)",
        "contentName": "meta.reference.content.mediawiki",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "(<gallery>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.ref.mediawiki"
          }
        },
        "end": "(</gallery>)",
        "contentName": "meta.gallery.mediawiki",
        "patterns": [
          {
            "name": "meta.item.gallery.mediawiki",
            "begin": "(?x)\n\t\t\t\t\t\t\t\t^(?!\\s*\\n)\t\t\t\t# not an empty line\n\t\t\t\t\t\t\t\t( [ ]*(((i|I)mage)(:))  # spaces, image, colon\n\t\t\t\t\t\t\t\t  ([^\\[\\]|]+)           # anything\n\t\t\t\t\t\t\t\t  (?<!\\s)[ ]*           # spaces\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t",
            "beginCaptures": {
              "6": {
                "name": "constant.other.wiki-link.image.mediawiki"
              },
              "3": {
                "name": "constant.other.namespace.image.mediawiki"
              },
              "5": {
                "name": "punctuation.fix_this_later.colon.mediawiki"
              }
            },
            "end": "\\n",
            "patterns": [
              {
                "begin": "^(?!\\|)|(\\|)",
                "beginCaptures": {
                  "1": {
                    "name": "punctuation.fix_this_later.pipe.mediawiki"
                  }
                },
                "end": "\\n|(?=\\|)",
                "contentName": "string.other.title.gallery.mediawiki",
                "patterns": [
                  {
                    "include": "#inline"
                  }
                ]
              },
              {
                "name": "punctuation.fix_this_later.pipe.mediawiki",
                "match": "\\|"
              }
            ]
          }
        ]
      }
    ]
  },
  "link": {
    "patterns": [
      {
        "name": "meta.image.wiki.mediawiki",
        "begin": "(?x:\n\t\t\t\t\t\t(\\[\\[)                         # opening brackets\n\t\t\t\t\t\t  ( [ ]*(((i|I)mage)(:))       # spaces, image, colon\n\t\t\t\t\t\t    ([^\\[\\]|]+)                # anything\n\t\t\t\t\t\t    (?<!\\s)[ ]*                # spaces\n\t\t\t\t\t\t  )\n\t\t\t\t\t)",
        "endCaptures": {
          "2": {
            "name": "punctuation.fix_this_later.pipe.mediawiki"
          },
          "3": {
            "name": "string.other.title.link.wiki-link.mediawiki"
          }
        },
        "applyEndPatternLast": 1,
        "beginCaptures": {
          "6": {
            "name": "punctuation.fix_this_later.colon.mediawiki"
          },
          "7": {
            "name": "constant.other.wiki-link.image.mediawiki"
          },
          "1": {
            "name": "punctuation.fix_this_later.brackets.mediwiki"
          },
          "4": {
            "name": "constant.other.namespace.image.mediawiki"
          }
        },
        "end": "(?x:\n\t\t\t\t\t\t  ((\\|)[ ]*( [^\\[\\]|]+ )[ ]*)? # pipe, spaces, anything, spaces\n\t\t\t\t\t\t(\\]\\])                         # closing brackets\n\t\t\t\t\t)",
        "patterns": [
          {
            "captures": {
              "1": {
                "name": "punctuation.fix_this_later.pipe.mediawiki"
              },
              "2": {
                "name": "keyword.control.image.formatting.mediawiki"
              },
              "3": {
                "name": "keyword.control.image.alignment.mediawiki"
              },
              "4": {
                "name": "constant.numeric.image.width.mediawiki"
              },
              "5": {
                "name": "constant.other.unit.mediawiki"
              }
            },
            "match": "(?x)\n\t\t\t\t\t\t\t\t(\\|)[ ]*\n\t\t\t\t\t\t\t\t( (thumb|thumbnail|frame)\n\t\t\t\t\t\t\t\t |(right|left|center|none)\n\t\t\t\t\t\t\t\t |([0-9]+)(px)\n\t\t\t\t\t\t\t\t)[ ]*\n\t\t\t\t\t\t\t"
          },
          {
            "name": "punctuation.fix_this_later.pipe.mediawiki",
            "match": "\\|"
          },
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "name": "meta.link.wiki.mediawiki",
        "begin": "(?x:\n\t\t\t\t\t\t(\\[\\[)                       # opening brackets\n\t\t\t\t\t\t  (:)?                       # colon to suppress image or category?\n\t\t\t\t\t\t  ((\\s+):[^\\[\\]]*(?=\\]\\]))?  # a colon after spaces is invalid\n\t\t\t\t\t\t  [ ]*                       # spaces\n\t\t\t\t\t\t  ( (([^\\[\\]|]+)(:))?        # namespace\n\t\t\t\t\t\t    ([^\\[\\]|]+)(?<!\\s)[ ]*   # link name\n\t\t\t\t\t\t  )?\n\t\t\t\t\t)",
        "endCaptures": {
          "2": {
            "name": "string.other.title.link.wiki-link.mediawiki"
          }
        },
        "beginCaptures": {
          "7": {
            "name": "constant.other.namespace.mediawiki"
          },
          "8": {
            "name": "punctuation.fix_this_later.colon.mediawiki"
          },
          "9": {
            "name": "constant.other.wiki-link.mediawiki"
          },
          "1": {
            "name": "punctuation.fix_this_later.brackets.mediawiki"
          },
          "2": {
            "name": "keyword.operator.wiki-link.suppress-image-or-category.mediawiki"
          },
          "4": {
            "name": "invalid.illegal.whitespace.mediawiki"
          }
        },
        "end": "(?x:\n\t\t\t\t\t\t  (\\|[ ]*([^\\[\\]|]+)[ ]*)?     # pipe, spaces, anything, spaces\n\t\t\t\t\t\t(\\]\\])                         # closing brackets\n\t\t\t\t\t)",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "name": "meta.link.inline.external.mediawiki",
        "begin": "\\[(\\S+)\\s*(?=[^\\]]*\\])",
        "beginCaptures": {
          "1": {
            "name": "markup.underline.link.external.mediawiki"
          }
        },
        "end": "\\]",
        "contentName": "string.other.title.link.external.mediawiki",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "name": "markup.underline.link.external.mediawiki",
        "match": "((https?|ftp|file)://|mailto:)[-:@a-zA-Z0-9_.~%+/?=&#]+(?<![.?:])"
      }
    ]
  },
  "style_in_link": {
    "patterns": [
      {
        "name": "markup.bold.mediawiki",
        "begin": "'''",
        "end": "'''",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "name": "markup.italic.mediawiki",
        "begin": "''",
        "end": "''",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "begin": "(<(b|strong)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.bold.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.bold.html.mediawiki",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "begin": "(<(i|em)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.italic.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.italic.html.mediawiki",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "begin": "(<(s|strike)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.strikethrough.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.other.strikethrough.html.mediawiki",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "begin": "(<(u)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.underline.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.underline.html.mediawiki",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "begin": "(<(tt|code)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.raw.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.raw.html.mediawiki",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "begin": "(<(big|small|sub|sup)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.any.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.other.inline-styles.html.mediawiki",
        "patterns": [
          {
            "include": "#style_in_link"
          }
        ]
      },
      {
        "include": "#comments"
      }
    ]
  },
  "style": {
    "comment": "\n\t\t\t\tTODO: We still need to add:\n\n\t\t\t\t  * font\n\t\t\t\t  * ruby, rb, rp, rt\n\t\t\t\t  * cite\n\t\t\t\t\n\t\t\t\tinline tags to this section, and make sure that the other\n\t\t\t\ttags can accept attributes in the tag opening, etc.  The\n\t\t\t\tcurrent implementation is intended to be naive, but covering\n\t\t\t\tthe majority of uses in mediawiki code.\n\t\t\t\t\n\t\t\t\tWe also need to add mediawiki-specific tags:\n\t\t\t\t\n\t\t\t\t  * nowiki, noinclude, includeonly\n\t\t\t\t\n\t\t\t",
    "patterns": [
      {
        "name": "markup.bold.mediawiki",
        "begin": "'''",
        "end": "'''",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "markup.italic.mediawiki",
        "begin": "''",
        "end": "''(?!'[^'])",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "(<(b|strong)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.bold.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.bold.html.mediawiki",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "(<(i|em)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.italic.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.italic.html.mediawiki",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "(<(s|strike)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.strikethrough.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.other.strikethrough.html.mediawiki",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "(<(u)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.underline.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.underline.html.mediawiki",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "(<(tt|code)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.raw.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.raw.html.mediawiki",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "begin": "(<(big|small|sub|sup)>)",
        "captures": {
          "1": {
            "name": "meta.tag.inline.any.html.mediawiki"
          }
        },
        "end": "(</\\2>)",
        "contentName": "markup.other.inline-styles.html.mediawiki",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "include": "#block"
  },
  {
    "include": "#inline"
  }
];

exports.MediawikiSyntax = new TextmateSyntax(repositories, patterns);
