"define metadata";
({
    "description": "Bulletin Board syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "bbcode",
            "pointer": "#Bulletin BoardSyntax",
            "fileexts": [
  "bbcode"
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
    "begin": "(\\[)(?i:list)(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:list)(\\])",
    "patterns": [
      {
        "begin": "(\\[\\*\\])",
        "captures": {
          "0": {
            "name": "meta.tag.bbcode"
          },
          "1": {
            "name": "punctuation.definition.tag.bbcode"
          }
        },
        "end": "(?=\\[\\*\\]|\\[/(?i:list)\\])",
        "contentName": "markup.list.unnumbered.bbcode",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  {
    "begin": "(\\[)(?i:list)=(1|a)(\\])",
    "endCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "constant.other.list-type.bbcode"
      },
      "3": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:list)(\\])",
    "patterns": [
      {
        "begin": "(\\[\\*\\])",
        "captures": {
          "0": {
            "name": "meta.tag.bbcode"
          },
          "1": {
            "name": "punctuation.definition.tag.bbcode"
          }
        },
        "end": "(?=\\[\\*\\]|\\[/(?i:list)\\])",
        "contentName": "markup.list.numbered.bbcode",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  {
    "begin": "(\\[)(?i:quote)(?:=[^\\]]+)?(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:quote)(\\])",
    "contentName": "markup.quote.bbcode",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "begin": "(\\[)(?i:code)(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:code)(\\])",
    "contentName": "markup.raw.block.bbcode"
  },
  {
    "begin": "(\\[)(?i:i)(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:i)(\\])",
    "contentName": "markup.italic.bbcode",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "begin": "(\\[)(?i:b)(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:b)(\\])",
    "contentName": "markup.bold.bbcode",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "begin": "(\\[)(?i:u)(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:u)(\\])",
    "contentName": "markup.underline.bbcode",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "begin": "(\\[)(?i:strike)(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:strike)(\\])",
    "contentName": "markup.other.strikethrough.bbcode",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "begin": "(?x)(\\[)(?i:color)=(\n\t\t            (?i:(red|green|blue|yellow\n\t\t                |white|black|pink\n\t\t                |purple|brown|grey))\n                    |(\\#([0-9a-fA-F]{6}))\n                    |([^\\]]+))\n                (\\])",
    "endCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "beginCaptures": {
      "6": {
        "name": "invalid.illegal.expected-a-color.bbcode"
      },
      "7": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "constant.other.named-color.bbcode"
      },
      "3": {
        "name": "constant.other.rgb-value.bbcode"
      }
    },
    "end": "(\\[/)(?i:color)(\\])",
    "contentName": "markup.other.colored.bbcode",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "begin": "(?x)(\\[)(?i:size)=\n                 (?i:([0-9]{1,3})\\b\n                     |([^\\]]+))\n                 (\\])",
    "endCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "constant.numeric.size.bbcode"
      },
      "3": {
        "name": "invalid.illegal.expected-a-size.bbcode"
      },
      "4": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:size)(\\])",
    "contentName": "markup.other.resized.bbcode",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.link.inline.bbcode",
    "begin": "(\\[)(?i:url)=([^\\]]+)(\\])",
    "endCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "markup.underline.link.bbcode"
      },
      "3": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:url)(\\])",
    "contentName": "string.other.link.title.bbcode",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.link.inline.bbcode",
    "begin": "(\\[)(?i:url)(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:url)(\\])",
    "contentName": "markup.underline.link.bbcode",
    "patterns": [
      {
        "match": "[\\[]]+"
      }
    ]
  },
  {
    "name": "meta.link.inline.bbcode",
    "begin": "(\\[)(?i:email)(\\])",
    "captures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:email)(\\])",
    "contentName": "markup.underline.link.email.bbcode",
    "patterns": [
      {
        "match": "[\\[]]+"
      }
    ]
  },
  {
    "name": "meta.link.image.bbcode",
    "begin": "(\\[)(?i:img)(:((?i:right|left|top))|([^\\]]+))?(\\])",
    "endCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "2": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "meta.tag.bbcode"
      },
      "1": {
        "name": "punctuation.definition.tag.bbcode"
      },
      "3": {
        "name": "constant.other.alignment.bbcode"
      },
      "4": {
        "name": "invalid.illegal.expected-an-alignment.bbcode"
      },
      "5": {
        "name": "punctuation.definition.tag.bbcode"
      }
    },
    "end": "(\\[/)(?i:img)(\\])",
    "contentName": "markup.underline.link.image.bbcode",
    "patterns": [
      {
        "match": "[\\[]]+?"
      }
    ]
  },
  {
    "name": "constant.other.smiley.bbcode",
    "captures": {
      "3": {
        "name": "punctuation.definition.constant.bbcode"
      },
      "5": {
        "name": "punctuation.definition.constant.bbcode"
      }
    },
    "match": "(?x)\n\t\t\t\t(\n\t\t\t\t\t(\n\t\t\t\t\t\t(:)\n\t\t\t\t\t\t(mad|rolleyes|cool|eek|confused|devious|\n\t\t\t\t\t\tjudge|scared|eyebrow|bigdumbgrin)\n\t\t\t\t\t\t(:)\n\t\t\t\t\t)\n\t\t\t\t  | (?::\\)|;\\)|:D|:\\(|:p|:o)\n\t\t\t\t)"
  }
];

exports.Bulletin BoardSyntax = new TextmateSyntax(repositories, patterns);
