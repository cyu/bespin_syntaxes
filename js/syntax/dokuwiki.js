"define metadata";
({
    "description": "DokuWiki syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#DokuWikiSyntax",
            "fileexts": [

]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "php": {
    "patterns": [
      {
        "name": "source.php.embedded.dokuwiki",
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
        "name": "source.php.embedded.dokuwiki",
        "begin": "(?=<\\?(?i:php|=)?)",
        "applyEndPatternLast": 1,
        "end": "(?<=\\?>)",
        "patterns": [
          {
            "include": "source.php"
          }
        ]
      },
      {
        "name": "source.php.embedded.dokuwiki",
        "begin": "(<)php(>)",
        "captures": {
          "1": {
            "name": "punctuation.definition.tag.dokuwiki"
          },
          "2": {
            "name": "punctuation.definition.tag.dokuwiki"
          }
        },
        "applyEndPatternLast": 1,
        "end": "(</)php(>)",
        "patterns": [
          {
            "include": "source.php"
          }
        ]
      }
    ]
  },
  "inline": {
    "patterns": [
      {
        "name": "markup.bold.dokuwiki",
        "begin": "\\*\\*",
        "captures": {
          "0": {
            "name": "punctuation.definition.bold.dokuwiki"
          }
        },
        "end": "\\*\\*",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "markup.italic.dokuwiki",
        "begin": "//",
        "captures": {
          "0": {
            "name": "punctuation.definition.italic.dokuwiki"
          }
        },
        "end": "//",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "markup.underline.dokuwiki",
        "begin": "__",
        "captures": {
          "0": {
            "name": "punctuation.definition.underline.dokuwiki"
          }
        },
        "end": "__",
        "patterns": [
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "meta.image.inline.dokuwiki",
        "captures": {
          "1": {
            "name": "punctuation.definition.image.dokuwiki"
          },
          "2": {
            "name": "markup.underline.link.dokuwiki"
          },
          "3": {
            "name": "punctuation.definition.image.dokuwiki"
          }
        },
        "match": "(\\{\\{)(.+?)(\\}\\})"
      },
      {
        "name": "meta.link.dokuwiki",
        "captures": {
          "1": {
            "name": "punctuation.definition.link.dokuwiki"
          },
          "2": {
            "name": "markup.underline.link.dokuwiki"
          },
          "3": {
            "name": "punctuation.definition.link.dokuwiki"
          }
        },
        "match": "(\\[\\[)(.*?)(\\]\\])"
      },
      {
        "captures": {
          "1": {
            "name": "punctuation.definition.link.dokuwiki"
          },
          "2": {
            "name": "markup.underline.link.interwiki.dokuwiki"
          },
          "3": {
            "name": "punctuation.definition.link.dokuwiki"
          }
        },
        "match": "(\\[\\[)([^\\[\\]]+\\>[^|\\]]+)(\\]\\])"
      },
      {
        "captures": {
          "1": {
            "name": "markup.underline.link.dokuwiki"
          }
        },
        "match": "((https?|telnet|gopher|wais|ftp|ed2k|irc)://[\\w/\\#~:.?+=&%@!\\-;,]+?(?=[.:?\\-;,]*[^\\w/\\#~:.?+=&%@!\\-;,]))"
      },
      {
        "name": "meta.link.email.dokuwiki",
        "captures": {
          "1": {
            "name": "punctuation.definition.link.dokuwiki"
          },
          "2": {
            "name": "markup.underline.link.dokuwiki"
          },
          "3": {
            "name": "punctuation.definition.link.dokuwiki"
          }
        },
        "match": "(<)([\\w0-9\\-_.]+?@[\\w\\-]+\\.[\\w\\-\\.]+\\.*[\\w]+)(\\>)"
      }
    ]
  }
};

var patterns = [
  {
    "include": "#php"
  },
  {
    "include": "#inline"
  },
  {
    "name": "string.quoted.double.dokuwiki",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.dokuwiki"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.dokuwiki"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.dokuwiki",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "comment.block.documentation.dokuwiki",
    "begin": "\\(\\(",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.dokuwiki"
      }
    },
    "end": "\\)\\)"
  },
  {
    "name": "markup.heading.dokuwiki",
    "captures": {
      "1": {
        "name": "punctuation.definition.heading.dokuwiki"
      },
      "3": {
        "name": "punctuation.definition.heading.dokuwiki"
      }
    },
    "match": "^\\s*(={2,})(.*)(={2,})\\s*$\\n?"
  },
  {
    "name": "keyword.other.notoc.dokuwiki",
    "match": "~~NOTOC~~"
  },
  {
    "name": "keyword.other.nocache.dokuwiki",
    "match": "~~NOCACHE~~"
  },
  {
    "name": "meta.separator.dokuwiki",
    "match": "^\\s*-{4,}\\s*$"
  },
  {
    "name": "markup.other.paragraph.dokuwiki",
    "match": "\\\\\\\\\\s"
  },
  {
    "name": "markup.list.unnumbered.dokuwiki",
    "begin": "^((\\t+)|( {2,}))(\\*)",
    "captures": {
      "4": {
        "name": "punctuation.definition.list_item.dokuwiki"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "name": "markup.list.numbered.dokuwiki",
    "begin": "^((\\t+)|( {2,}))(-)",
    "captures": {
      "4": {
        "name": "punctuation.definition.list_item.dokuwiki"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "name": "markup.other.table.dokuwiki",
    "begin": "^[|^]",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.table.dokuwiki"
      }
    },
    "end": "$",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "name": "markup.raw.dokuwiki",
    "begin": "(\\<)(file|nowiki)(\\>)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.dokuwiki"
      },
      "3": {
        "name": "punctuation.definition.tag.dokuwiki"
      }
    },
    "end": "(<\\/)(\\2)(\\>)"
  },
  {
    "name": "markup.raw.dokuwiki",
    "begin": "(%%|\\'\\')",
    "captures": {
      "0": {
        "name": "punctuation.definition.raw.dokuwiki"
      }
    },
    "end": "\\1"
  },
  {
    "begin": "(<)html(>)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.dokuwiki"
      },
      "2": {
        "name": "punctuation.definition.tag.dokuwiki"
      }
    },
    "end": "(</)html(>)",
    "patterns": [
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "name": "markup.raw.dokuwiki",
    "match": "^((\\s\\s)|(\\t))[^\\*\\-].*$"
  },
  {
    "name": "markup.other.dokuwiki",
    "begin": "(\\<)(sub|sup|del)(\\>)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.dokuwiki"
      },
      "3": {
        "name": "punctuation.definition.tag.dokuwiki"
      }
    },
    "end": "(\\</)(\\2)(\\>)",
    "patterns": [
      {
        "include": "#inline"
      }
    ]
  },
  {
    "name": "markup.raw.dokuwiki",
    "begin": "(<)code(?:\\s+[^>]*)?(>)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.dokuwiki"
      },
      "2": {
        "name": "punctuation.definition.tag.dokuwiki"
      }
    },
    "end": "(</)code(>)"
  }
];

exports.DokuWikiSyntax = new TextmateSyntax(repositories, patterns);
