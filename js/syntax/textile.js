"define metadata";
({
    "description": "Textile syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "textile",
            "pointer": "#TextileSyntax",
            "fileexts": [
  "textile"
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
        "name": "text.html.textile",
        "comment": "& is handled automagically by textile, so we match it to avoid text.html.basic from flagging it",
        "match": "&(?![A-Za-z0-9]+;)"
      },
      {
        "name": "markup.list.unnumbered.textile",
        "captures": {
          "1": {
            "name": "entity.name.type.textile"
          }
        },
        "match": "^\\*+(\\([^)]*\\)|{[^}]*})*(\\s+|$)"
      },
      {
        "name": "markup.list.numbered.textile",
        "captures": {
          "1": {
            "name": "entity.name.type.textile"
          }
        },
        "match": "^#+(\\([^)]*\\)|{[^}]*})*\\s+"
      },
      {
        "name": "meta.link.reference.textile",
        "captures": {
          "1": {
            "name": "string.other.link.title.textile"
          },
          "2": {
            "name": "string.other.link.description.title.textile"
          },
          "3": {
            "name": "constant.other.reference.link.textile"
          }
        },
        "match": "(?x)\n\t\t\t\t\t\t\t\t\"\t\t\t\t\t\t\t\t# Start name, etc\n\t\t\t\t\t\t\t\t\t(?:\t\t\t\t\t\t\t# Attributes\n\t\t\t\t\t\t\t\t\t\t# I swear, this is how the language is defined,\n\t\t\t\t\t\t\t\t\t\t# couldnt make it up if I tried.\n\t\t\t\t\t\t\t\t\t\t(?:\\([^)]+\\))?(?:\\{[^}]+\\})?(?:\\[[^\\]]+\\])?\n\t\t\t\t\t\t\t\t\t\t\t# Class, Style, Lang\n\t\t\t\t\t\t\t\t\t  | (?:\\{[^}]+\\})?(?:\\[[^\\]]+\\])?(?:\\([^)]+\\))?\n\t\t\t\t\t\t\t\t\t\t\t# Style, Lang, Class\n\t\t\t\t\t\t\t\t\t  | (?:\\[[^\\]]+\\])?(?:\\{[^}]+\\})?(?:\\([^)]+\\))?\n\t\t\t\t\t\t\t\t\t\t\t# Lang, Style, Class\n\t\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t\t([^\"]+?)\t\t\t\t\t# Link name\n\t\t\t\t\t\t\t\t\t\\s?\t\t\t\t\t\t\t# Optional whitespace\n\t\t\t\t\t\t\t\t\t(?:\\(([^)]+?)\\))?\n\t\t\t\t\t\t\t\t\":\t\t\t\t\t\t\t\t# End name\n\t\t\t\t\t\t\t\t(\\w[-\\w_]*)\t\t\t\t\t\t# Linkref\n\t\t\t\t\t\t\t\t(?=[^\\w\\/;]*?(<|\\s|$))\t\t\t# Catch closing punctuation\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t#  and end of meta.link\n\t\t\t\t\t"
      },
      {
        "name": "meta.link.inline.textile",
        "captures": {
          "1": {
            "name": "string.other.link.title.textile"
          },
          "2": {
            "name": "string.other.link.description.title.textile"
          },
          "3": {
            "name": "markup.underline.link.textile"
          }
        },
        "match": "(?x)\n\t\t\t\t\t\t\t\t\"\t\t\t\t\t\t\t\t# Start name, etc\n\t\t\t\t\t\t\t\t\t(?:\t\t\t\t\t\t\t# Attributes\n\t\t\t\t\t\t\t\t\t\t# I swear, this is how the language is defined,\n\t\t\t\t\t\t\t\t\t\t# couldnt make it up if I tried.\n\t\t\t\t\t\t\t\t\t\t(?:\\([^)]+\\))?(?:\\{[^}]+\\})?(?:\\[[^\\]]+\\])?\n\t\t\t\t\t\t\t\t\t\t\t# Class, Style, Lang\n\t\t\t\t\t\t\t\t\t  | (?:\\{[^}]+\\})?(?:\\[[^\\]]+\\])?(?:\\([^)]+\\))?\n\t\t\t\t\t\t\t\t\t\t\t# Style, Lang, Class\n\t\t\t\t\t\t\t\t\t  | (?:\\[[^\\]]+\\])?(?:\\{[^}]+\\})?(?:\\([^)]+\\))?\n\t\t\t\t\t\t\t\t\t\t\t# Lang, Style, Class\n\t\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t\t([^\"]+?)\t\t\t\t\t# Link name\n\t\t\t\t\t\t\t\t\t\\s?\t\t\t\t\t\t\t# Optional whitespace\n\t\t\t\t\t\t\t\t\t(?:\\(([^)]+?)\\))?\n\t\t\t\t\t\t\t\t\":\t\t\t\t\t\t\t\t# End Name\n\t\t\t\t\t\t\t\t(\\S*?(?:\\w|\\/|;))\t\t\t\t# URL\n\t\t\t\t\t\t\t\t(?=[^\\w\\/;]*?(<|\\s|$))\t\t\t# Catch closing punctuation\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t#  and end of meta.link\n\t\t\t\t\t"
      },
      {
        "name": "meta.image.inline.textile",
        "captures": {
          "2": {
            "name": "markup.underline.link.image.textile"
          },
          "3": {
            "name": "string.other.link.description.textile"
          },
          "4": {
            "name": "markup.underline.link.textile"
          }
        },
        "match": "(?x)\n\t\t\t\t\t\t\t\t\\!\t\t\t\t\t\t\t\t\t\t# Open image\n\t\t\t\t\t\t\t\t(\\<|\\=|\\>)?\t\t\t\t\t\t\t\t# Optional alignment\n\t\t\t\t\t\t\t\t(?:\t\t\t\t\t\t\t\t\t\t# Attributes\n\t\t\t\t\t\t\t\t\t# I swear, this is how the language is defined,\n\t\t\t\t\t\t\t\t\t# couldnt make it up if I tried.\n\t\t\t\t\t\t\t\t\t(?:\\([^)]+\\))?(?:\\{[^}]+\\})?(?:\\[[^\\]]+\\])?\n\t\t\t\t\t\t\t\t\t\t# Class, Style, Lang\n\t\t\t\t\t\t\t\t  | (?:\\{[^}]+\\})?(?:\\[[^\\]]+\\])?(?:\\([^)]+\\))?\n\t\t\t\t\t\t\t\t\t\t# Style, Lang, Class\n\t\t\t\t\t\t\t\t  | (?:\\[[^\\]]+\\])?(?:\\{[^}]+\\})?(?:\\([^)]+\\))?\n\t\t\t\t\t\t\t\t\t\t# Lang, Style, Class\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t(?:\\.[ ])?            \t\t\t\t\t# Optional\n\t\t\t\t\t\t\t\t([^\\s(!]+?)         \t\t\t\t\t# Image URL\n\t\t\t\t\t\t\t\t\\s?                \t\t\t\t\t\t# Optional space\n\t\t\t\t\t\t\t\t(?:\\(((?:[^\\(\\)]|\\([^\\)]+\\))+?)\\))?   \t# Optional title\n\t\t\t\t\t\t\t\t\\!\t\t\t\t\t\t\t\t\t\t# Close image\n\t\t\t\t\t\t\t\t(?:\n\t\t\t\t\t\t\t\t\t:\n\t\t\t\t\t\t\t\t\t(\\S*?(?:\\w|\\/|;))\t\t\t\t\t# URL\n\t\t\t\t\t\t\t\t\t(?=[^\\w\\/;]*?(<|\\s|$))\t\t\t\t# Catch closing punctuation\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t"
      },
      {
        "name": "markup.other.table.cell.textile",
        "captures": {
          "1": {
            "name": "entity.name.type.textile"
          }
        },
        "match": "\\|(\\([^)]*\\)|{[^}]*})*(\\\\\\||.)+\\|"
      },
      {
        "name": "markup.bold.textile",
        "captures": {
          "3": {
            "name": "entity.name.type.textile"
          }
        },
        "match": "\\B(\\*\\*?)((\\([^)]*\\)|{[^}]*}|\\[[^]]+\\]){0,3})(\\S.*?\\S|\\S)\\1\\B"
      },
      {
        "name": "markup.deleted.textile",
        "captures": {
          "2": {
            "name": "entity.name.type.textile"
          }
        },
        "match": "\\B-((\\([^)]*\\)|{[^}]*}|\\[[^]]+\\]){0,3})(\\S.*?\\S|\\S)-\\B"
      },
      {
        "name": "markup.inserted.textile",
        "captures": {
          "2": {
            "name": "entity.name.type.textile"
          }
        },
        "match": "\\B\\+((\\([^)]*\\)|{[^}]*}|\\[[^]]+\\]){0,3})(\\S.*?\\S|\\S)\\+\\B"
      },
      {
        "name": "markup.italic.textile",
        "captures": {
          "2": {
            "name": "entity.name.type.textile"
          }
        },
        "match": "(?:\\b|\\s)_((\\([^)]*\\)|{[^}]*}|\\[[^]]+\\]){0,3})(\\S.*?\\S|\\S)_(?:\\b|\\s)"
      },
      {
        "name": "markup.italic.phrasemodifiers.textile",
        "captures": {
          "3": {
            "name": "entity.name.type.textile"
          }
        },
        "match": "\\B([@\\^~%]|\\?\\?)((\\([^)]*\\)|{[^}]*}|\\[[^]]+\\]){0,3})(\\S.*?\\S|\\S)\\1"
      },
      {
        "name": "entity.name.tag.textile",
        "comment": "Footnotes",
        "match": "(?<!w)\\[[0-9+]\\]"
      }
    ]
  }
};

var patterns = [
  {
    "name": "markup.heading.textile",
    "begin": "(^h[1-6]([<>=()]+)?)(\\([^)]*\\)|{[^}]*})*(\\.)",
    "captures": {
      "1": {
        "name": "entity.name.tag.heading.textile"
      },
      "3": {
        "name": "entity.name.type.textile"
      },
      "4": {
        "name": "entity.name.tag.heading.textile"
      }
    },
    "end": "^$",
    "patterns": [
      {
        "include": "#inline"
      },
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "name": "markup.quote.textile",
    "begin": "(^bq([<>=()]+)?)(\\([^)]*\\)|{[^}]*})*(\\.)",
    "captures": {
      "1": {
        "name": "entity.name.tag.blockquote.textile"
      },
      "3": {
        "name": "entity.name.type.textile"
      },
      "4": {
        "name": "entity.name.tag.blockquote.textile"
      }
    },
    "end": "^$",
    "patterns": [
      {
        "include": "#inline"
      },
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "name": "markup.other.footnote.textile",
    "begin": "(^fn[0-9]+([<>=()]+)?)(\\([^)]*\\)|{[^}]*})*(\\.)",
    "captures": {
      "1": {
        "name": "entity.name.tag.footnote.textile"
      },
      "3": {
        "name": "entity.name.type.textile"
      },
      "4": {
        "name": "entity.name.tag.footnote.textile"
      }
    },
    "end": "^$",
    "patterns": [
      {
        "include": "#inline"
      },
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "name": "markup.other.table.textile",
    "begin": "(^table([<>=()]+)?)(\\([^)]*\\)|{[^}]*})*(\\.)",
    "captures": {
      "1": {
        "name": "entity.name.tag.footnote.textile"
      },
      "3": {
        "name": "entity.name.type.textile"
      },
      "4": {
        "name": "entity.name.tag.footnote.textile"
      }
    },
    "end": "^$",
    "patterns": [
      {
        "include": "#inline"
      },
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "name": "meta.paragraph.textile",
    "begin": "^(?=\\S)",
    "end": "^$",
    "patterns": [
      {
        "name": "entity.name.section.paragraph.textile",
        "captures": {
          "1": {
            "name": "entity.name.tag.paragraph.textile"
          },
          "3": {
            "name": "entity.name.type.textile"
          },
          "4": {
            "name": "entity.name.tag.paragraph.textile"
          }
        },
        "match": "(^p([<>=()]+)?)(\\([^)]*\\)|{[^}]*})*(\\.)"
      },
      {
        "include": "#inline"
      },
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "comment": "Since html is valid in Textile include the html patterns",
    "include": "text.html.basic"
  }
];

exports.TextileSyntax = new TextmateSyntax(repositories, patterns);