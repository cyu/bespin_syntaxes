"define metadata";
({
    "description": "Context Free syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "cfdg",
            "pointer": "#Context FreeSyntax",
            "fileexts": [
  "cfdg",
  "context free"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "comment": {
    "patterns": [
      {
        "name": "comment.line.cfdg",
        "begin": "(//|#)",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.comment.cfdg"
          }
        },
        "end": "$\\n?"
      },
      {
        "name": "comment.block.cfdg",
        "begin": "(/\\*)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.comment.end.cfdg"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.comment.begin.cfdg"
          }
        },
        "end": "(\\*/)"
      }
    ]
  },
  "number": {
    "name": "constant.numeric.cfdg",
    "captures": {
      "1": {
        "name": "keyword.operator.sign.cfdg"
      },
      "4": {
        "name": "punctuation.separator.integer-float.cfdg"
      }
    },
    "match": "(\\+|\\-)?((\\d++)?(\\.))?\\d++"
  },
  "shape-adjustment-block": {
    "patterns": [
      {
        "begin": "(\\{)",
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.unordered-block.begin.cfdg"
          }
        },
        "end": "(?=\\})",
        "patterns": [
          {
            "include": "#color-adjustment"
          },
          {
            "include": "#geometry-adjustment"
          },
          {
            "include": "#number"
          },
          {
            "include": "#comment"
          }
        ]
      },
      {
        "begin": "(\\[)",
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.ordered-block.begin.cfdg"
          }
        },
        "end": "(?=\\])",
        "patterns": [
          {
            "include": "#color-adjustment"
          },
          {
            "include": "#geometry-adjustment"
          },
          {
            "include": "#number"
          },
          {
            "include": "#comment"
          }
        ]
      }
    ]
  },
  "color-adjustment": {
    "name": "constant.language.color-adjustment.cfdg",
    "match": "\\||\\b(h(ue)?|sat(uration)?|b(rightness)?|a(lpha)?)\\b"
  },
  "color-adjustment-block": {
    "patterns": [
      {
        "begin": "(\\{)",
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.unordered-block.begin.cfdg"
          }
        },
        "end": "(?=\\})",
        "patterns": [
          {
            "include": "#color-adjustment"
          },
          {
            "include": "#number"
          },
          {
            "include": "#comment"
          }
        ]
      },
      {
        "begin": "(\\[)",
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.ordered-block.begin.cfdg"
          }
        },
        "end": "(?=\\])",
        "patterns": [
          {
            "include": "#color-adjustment"
          },
          {
            "include": "#number"
          },
          {
            "include": "#comment"
          }
        ]
      }
    ]
  },
  "startshape-directive": {
    "captures": {
      "1": {
        "name": "keyword.control.startshape.cfdg"
      },
      "2": {
        "name": "entity.name.function.rule.cfdg"
      }
    },
    "match": "\\b(startshape)\\s++([a-zA-Z_][a-zA-Z_\\.\\d]*+)"
  },
  "shape-replacement": {
    "begin": "([a-zA-Z_][a-zA-Z_\\.\\d]*+)",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.unordered-block.end.cfdg"
      },
      "2": {
        "name": "punctuation.section.ordered-block.end.cfdg"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "entity.name.function.rule.cfdg"
      }
    },
    "end": "(\\})|(\\])",
    "patterns": [
      {
        "include": "#shape-adjustment-block"
      },
      {
        "include": "#comment"
      }
    ]
  },
  "background-directive": {
    "begin": "\\b(background)",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.unordered-block.end.cfdg"
      },
      "2": {
        "name": "punctuation.section.ordered-block.end.cfdg"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.background.cfdg"
      }
    },
    "end": "(\\})|(\\])",
    "patterns": [
      {
        "include": "#color-adjustment-block"
      },
      {
        "include": "#comment"
      }
    ]
  },
  "geometry-adjustment": {
    "name": "constant.language.geometry-adjustment.cfdg",
    "match": "\\b(x|y|z|s(ize)?|r(ot(ate)?)?|f(lip)?|skew)\\b"
  },
  "loop": {
    "begin": "(\\d++)\\s*+(\\*)",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.unordered-block.end.cfdg"
      },
      "2": {
        "name": "punctuation.section.ordered-block.end.cfdg"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "constant.numeric.cfdg"
      },
      "2": {
        "name": "keyword.operator.loop.cfdg"
      }
    },
    "end": "(\\})|(\\])",
    "patterns": [
      {
        "include": "#shape-adjustment-block"
      },
      {
        "include": "#comment"
      }
    ]
  },
  "include-directive": {
    "captures": {
      "1": {
        "name": "keyword.control.include.cfdg"
      },
      "2": {
        "name": "string.unquoted.file-name.cfdg"
      }
    },
    "match": "\\b(include)\\s++(\\S++)"
  },
  "rule": {
    "begin": "(\\{)",
    "beginCaptures": {
      "1": {
        "name": "punctuation.section.rule.begin.cfdg"
      }
    },
    "end": "(?=\\})",
    "patterns": [
      {
        "include": "#loop"
      },
      {
        "include": "#shape-replacement"
      },
      {
        "include": "#comment"
      }
    ]
  },
  "rule-directive": {
    "begin": "\\b(rule)\\s++([a-zA-Z_][a-zA-Z_\\.\\d]*+)(\\s++(((\\d++)?(\\.))?\\d++))?",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.rule.end.cfdg"
      }
    },
    "beginCaptures": {
      "7": {
        "name": "punctuation.separator.integer-float.cfdg"
      },
      "1": {
        "name": "keyword.control.rule.cfdg"
      },
      "2": {
        "name": "entity.name.function.rule.definition.cfdg"
      },
      "4": {
        "name": "constant.numeric.cfdg"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "include": "#rule"
      },
      {
        "include": "#comment"
      }
    ]
  }
};

var patterns = [
  {
    "include": "#comment"
  },
  {
    "include": "#startshape-directive"
  },
  {
    "include": "#include-directive"
  },
  {
    "include": "#background-directive"
  },
  {
    "include": "#rule-directive"
  }
];

exports.Context FreeSyntax = new TextmateSyntax(repositories, patterns);
