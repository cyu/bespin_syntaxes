"define metadata";
({
    "description": "HTML (Mason) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "mhtml",
            "pointer": "#HTML (Mason)Syntax",
            "fileexts": [
  "mhtml",
  "autohandler",
  "dhandler"
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
    "name": "source.perl.mason.block",
    "begin": "(<%(perl|global|once|init|cleanup|requestlocal|requestonce|shared|threadlocal|threadonce|flags)( scope.*?)?>)",
    "captures": {
      "1": {
        "name": "punctuation.section.embedded.perl.mason"
      },
      "2": {
        "name": "keyword.control"
      }
    },
    "end": "(</%(\\2)>)(\\s*$\\n)?",
    "patterns": [
      {
        "include": "source.perl"
      }
    ]
  },
  {
    "name": "source.perl.mason.doc",
    "begin": "(<(%text)>)",
    "captures": {
      "1": {
        "name": "keyword.control"
      },
      "2": {
        "name": "variable.other"
      }
    },
    "end": "(</(%text)>)",
    "patterns": [
      {
        "name": "comment.block",
        "begin": "(?<=<%text>)",
        "end": "(?=</%text>)"
      }
    ]
  },
  {
    "name": "source.perl.mason.doc",
    "begin": "(<(%doc)>)",
    "captures": {
      "1": {
        "name": "keyword.control"
      },
      "2": {
        "name": "variable.other"
      }
    },
    "end": "(</(%doc)>)",
    "patterns": [
      {
        "name": "comment.block",
        "begin": "(?<=<%doc>)",
        "end": "(?=</%doc>)"
      }
    ]
  },
  {
    "name": "source.perl.mason.line",
    "begin": "^(%)",
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.embedded.perl.mason"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "include": "source.perl"
      }
    ]
  },
  {
    "name": "source.mason.component.block",
    "begin": "(<&\\|)((\\w|\\.|\\:)*)(?!&>)",
    "endCaptures": {
      "1": {
        "name": "keyword.control"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control"
      },
      "2": {
        "name": "entity.name.function"
      }
    },
    "end": "(</&>)",
    "patterns": [
      {
        "name": "source.mason.nesty",
        "begin": "(&>)",
        "beginCaptures": {
          "1": {
            "name": "keyword.control"
          }
        },
        "end": "(?=</&>)",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  {
    "name": "source.mason.component",
    "begin": "(<&)(.{1,}?)( |,)+",
    "endCaptures": {
      "1": {
        "name": "keyword.control"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control"
      },
      "2": {
        "name": "entity.name.function"
      }
    },
    "end": "(&>)",
    "patterns": [
      {
        "include": "source.perl"
      }
    ]
  },
  {
    "name": "source.mason.args",
    "begin": "(<%(args.*?)>)",
    "captures": {
      "1": {
        "name": "keyword.control"
      },
      "2": {
        "name": "variable.other"
      }
    },
    "end": "(</%(\\2)>)",
    "patterns": [
      {
        "captures": {
          "2": {
            "name": "string.quoted.single"
          }
        },
        "include": "source.perl",
        "match": "(\\s*)?(\\w*)"
      }
    ]
  },
  {
    "name": "source.mason.methods",
    "begin": "(<%(method|def|closure) .*?>)",
    "captures": {
      "1": {
        "name": "keyword.control"
      },
      "2": {
        "name": "variable.other"
      }
    },
    "end": "(</%(\\2)>)",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "source.mason.substitution",
    "begin": "(<%) ",
    "captures": {
      "1": {
        "name": "keyword.control"
      }
    },
    "end": "(%>)",
    "patterns": [
      {
        "include": "source.perl"
      }
    ]
  },
  {
    "include": "text.html.basic"
  }
];

exports.HTML (Mason)Syntax = new TextmateSyntax(repositories, patterns);
