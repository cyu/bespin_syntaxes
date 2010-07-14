"define metadata";
({
    "description": "YAML syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "yaml",
            "pointer": "#YAMLSyntax",
            "fileexts": [
  "yaml",
  "yml"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "escaped_char": {
    "name": "constant.character.escape.yaml",
    "match": "\\\\."
  },
  "erb": {
    "begin": "<%+(?!>)=?",
    "name": "source.ruby.rails.embedded.html",
    "captures": {
      "0": {
        "name": "punctuation.section.embedded.ruby"
      }
    },
    "end": "%>",
    "patterns": [
      {
        "name": "comment.line.number-sign.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.ruby"
          }
        },
        "match": "(#).*?(?=%>)"
      },
      {
        "include": "source.ruby.rails"
      }
    ]
  }
};

var patterns = [
  {
    "include": "#erb"
  },
  {
    "name": "string.unquoted.block.yaml",
    "begin": "^(\\s*)(?:(-)|(?:(-\\s*)?(\\w+\\s*(:))))\\s*(\\||>)",
    "beginCaptures": {
      "2": {
        "name": "punctuation.definition.entry.yaml"
      },
      "3": {
        "name": "punctuation.definition.entry.yaml"
      },
      "4": {
        "name": "entity.name.tag.yaml"
      },
      "5": {
        "name": "punctuation.separator.key-value.yaml"
      }
    },
    "end": "^(?!^\\1)|^(?=\\1(-|\\w+\\s*:)|#)",
    "patterns": [
      {
        "include": "#erb"
      }
    ]
  },
  {
    "name": "constant.numeric.yaml",
    "captures": {
      "1": {
        "name": "punctuation.definition.entry.yaml"
      },
      "2": {
        "name": "entity.name.tag.yaml"
      },
      "3": {
        "name": "punctuation.separator.key-value.yaml"
      },
      "4": {
        "name": "punctuation.definition.entry.yaml"
      }
    },
    "match": "(?:(?:(-\\s*)?(\\w+\\s*(:)))|(-))\\s*((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f)?\\s*$"
  },
  {
    "name": "string.unquoted.yaml",
    "captures": {
      "1": {
        "name": "punctuation.definition.entry.yaml"
      },
      "2": {
        "name": "entity.name.tag.yaml"
      },
      "3": {
        "name": "punctuation.separator.key-value.yaml"
      },
      "4": {
        "name": "punctuation.definition.entry.yaml"
      },
      "5": {
        "name": "string.unquoted.yaml"
      }
    },
    "match": "(?:(?:(-\\s*)?(\\w+\\s*(:)))|(-))\\s*([A-Za-z0-9].*)\\s*$"
  },
  {
    "name": "constant.other.date.yaml",
    "captures": {
      "1": {
        "name": "punctuation.definition.entry.yaml"
      },
      "2": {
        "name": "entity.name.tag.yaml"
      },
      "3": {
        "name": "punctuation.separator.key-value.yaml"
      },
      "4": {
        "name": "punctuation.definition.entry.yaml"
      }
    },
    "match": "(?:(?:(-\\s*)?(\\w+\\s*(:)))|(-))\\s*([0-9]{4}-[0-9]{2}-[0-9]{2})\\s*$"
  },
  {
    "name": "meta.tag.yaml",
    "captures": {
      "1": {
        "name": "entity.name.tag.yaml"
      },
      "2": {
        "name": "punctuation.separator.key-value.yaml"
      },
      "3": {
        "name": "keyword.other.omap.yaml"
      },
      "4": {
        "name": "punctuation.definition.keyword.yaml"
      }
    },
    "match": "(\\w.*?)(:)\\s*((\\!\\!)omap)?"
  },
  {
    "name": "variable.other.yaml",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.yaml"
      }
    },
    "match": "(\\&|\\*)\\w.*?$"
  },
  {
    "name": "string.quoted.double.yaml",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.yaml"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.yaml"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#erb"
      }
    ]
  },
  {
    "name": "string.quoted.single.yaml",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.yaml"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.yaml"
      }
    },
    "end": "'",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#erb"
      }
    ]
  },
  {
    "name": "string.interpolated.yaml",
    "begin": "`",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.yaml"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.yaml"
      }
    },
    "end": "`",
    "patterns": [
      {
        "include": "#escaped_char"
      },
      {
        "include": "#erb"
      }
    ]
  },
  {
    "name": "keyword.operator.merge-key.yaml",
    "captures": {
      "1": {
        "name": "entity.name.tag.yaml"
      },
      "2": {
        "name": "keyword.operator.merge-key.yaml"
      },
      "3": {
        "name": "punctuation.definition.keyword.yaml"
      }
    },
    "match": "(\\<\\<): ((\\*).*)$"
  },
  {
    "name": "invalid.deprecated.trailing-whitespace.yaml",
    "disabled": "1",
    "match": "( |\t)+$"
  },
  {
    "name": "comment.line.number-sign.yaml",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.yaml"
      }
    },
    "match": "(?<!\\$)(#)(?!\\{).*$\\n?"
  },
  {
    "name": "keyword.operator.symbol",
    "match": "-"
  },
  {
    "name": "meta.leading-tabs.yaml",
    "begin": "^(?=\\t)",
    "end": "(?=[^\\t])",
    "patterns": [
      {
        "captures": {
          "1": {
            "name": "meta.odd-tab"
          },
          "2": {
            "name": "meta.even-tab"
          }
        },
        "match": "(\\t)(\\t)?"
      }
    ]
  }
];

exports.YAMLSyntax = new TextmateSyntax(repositories, patterns);
