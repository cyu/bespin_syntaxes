"define metadata";
({
    "description": "CSS v3 beta syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "css",
            "pointer": "#CSS v3 betaSyntax",
            "fileexts": [
  "css"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "font-other": {
    "name": "support.constant.property-value.css",
    "match": "(caption|icon|menu|message-box|small-caption|status-bar)"
  },
  "font-variant": {
    "name": "support.constant.property-value.css",
    "match": "(normal|small-caps)"
  },
  "angle": {
    "captures": {
      "1": {
        "name": "constant.numeric.degree.css"
      },
      "5": {
        "name": "constant.other.unit.css"
      }
    },
    "match": "([-+]?(3([1-5][0-9]|60)|[12]?([0-9]?[0-9]))(deg|rad|grad))"
  },
  "uri": {
    "begin": "(url)\\s*(\\()\\s*",
    "name": "meta.constructor.css",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.constructor.css"
      },
      "2": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "end": "(\\))",
    "contentName": "meta.constructor.argument.css",
    "patterns": [
      {
        "include": "#string-single"
      },
      {
        "include": "#string-double"
      }
    ]
  },
  "font-weight": {
    "captures": {
      "2": {
        "name": "support.constant.property-value.css"
      },
      "4": {
        "name": "constant.numeric.css"
      }
    },
    "match": "((normal|bold(er)?|lighter)|(100|200|300|400|500|600|700|800|900))"
  },
  "shape": {
    "begin": "(rect)\\s*(\\()",
    "name": "meta.constructor.css",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.constructor.css"
      },
      "2": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "end": "(\\))",
    "contentName": "meta.constructor.argument.css",
    "patterns": [
      {
        "include": "#length"
      },
      {
        "include": "#percentage"
      },
      {
        "name": "support.constant.property-value.css",
        "match": "auto"
      }
    ]
  },
  "font-absolute": {
    "name": "support.constant.property-value.css",
    "match": "(xx-small|x-small|small|medium|large|x-large|xx-large)\\b"
  },
  "string-single": {
    "begin": "'",
    "name": "string.quoted.single.css",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.css"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.css"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.css",
        "match": "\\\\."
      }
    ]
  },
  "font-adjust": {
    "name": "support.constant.property-value.css",
    "match": "(none)"
  },
  "color-named": {
    "name": "support.constant.named-color.css",
    "match": "(transparent|aqua|black|blue|fuchsia|gr[ae]y|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow)"
  },
  "percentage": {
    "captures": {
      "1": {
        "name": "constant.numeric.css"
      },
      "2": {
        "name": "constant.other.unit.css"
      }
    },
    "match": "([0-9]+)(%)"
  },
  "important": {
    "name": "support.constant.property-value.css",
    "match": "(inherit|!important)"
  },
  "string-double": {
    "begin": "\"",
    "name": "string.quoted.double.css",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.css"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.css"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.css",
        "match": "\\\\."
      }
    ]
  },
  "list-style-type": {
    "name": "support.constant.property-value.css",
    "match": "(none|decimal(-leading-zero)?|lower(-roman|-alpha|-greek|-alpha|-latin)?|upper(-roman|-alpha|-greek|-alpha|-latin)?|hebrew|armenian|georgian|cjk-ideographic|hiragana(-iroha)?|katakana(-iroha)?)"
  },
  "color-rgb": {
    "begin": "(rgb)\\s*(\\()",
    "name": "meta.constructor.css",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.constructor.css"
      },
      "2": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "end": "(\\))",
    "contentName": "meta.constructor.argument.css",
    "patterns": [
      {
        "name": "constant.numeric.css",
        "match": "[12]?[0-9]?[0-9]"
      },
      {
        "include": "#percentage"
      }
    ]
  },
  "font-generic": {
    "name": "support.constant.font-family.css",
    "match": "(serif|sans-serif|cursive|fantasy|monospace)"
  },
  "border-style": {
    "name": "support.constant.property-value.css",
    "match": "(dashed|dotted|double|groove|hidden|inset|outset|ridge|solid|collapse|separate)"
  },
  "border-width": {
    "name": "support.constant.property-value.css",
    "match": "(thin|thick|medium)"
  },
  "counter": {
    "begin": "(counter)\\s*(\\()",
    "name": "meta.constructor.css",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.constructor.css"
      },
      "2": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "end": "(\\))",
    "contentName": "meta.constructor.argument.css",
    "patterns": [
      {
        "include": "#list-style-type"
      }
    ]
  },
  "font-style": {
    "name": "support.constant.property-value.css",
    "match": "(normal|italic|oblique)"
  },
  "length": {
    "captures": {
      "6": {
        "name": "constant.numeric.css"
      },
      "2": {
        "name": "constant.numeric.css"
      },
      "5": {
        "name": "constant.other.unit.css"
      }
    },
    "match": "(((-|\\+)?\\s*[0-9]*(\\.)?[0-9]+)(px|pt|cm|mm|in|em|ex|pc)|(0))"
  },
  "comment-block": {
    "begin": "/\\*",
    "name": "comment.block.css",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.css"
      }
    },
    "end": "\\*/"
  },
  "font-specific": {
    "name": "support.constant.font-name.css",
    "match": "((?i:arial( black)?|century|comic|courier|garamond|georgia|geneva|helvetica|impact|lucida( sans)?( grande)?( unicode)?|symbol|system|tahoma|times( new roman)?|trebuchet( ms)?|utopia|verdana|webdings|monospace))"
  },
  "font-stretch": {
    "name": "support.constant.property-value.css",
    "match": "(normal|wider|narrower|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded)"
  },
  "attr": {
    "begin": "(attr)\\s*(\\()",
    "name": "meta.constructor.css",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "storage.type.constructor.css"
      },
      "2": {
        "name": "punctuation.definition.constructor.css"
      }
    },
    "end": "(\\))",
    "contentName": "meta.constructor.argument.css",
    "patterns": [
      {
        "name": "variable.parameter.css",
        "match": "[^'\") \\t]+"
      }
    ]
  },
  "color-hex": {
    "name": "constant.other.color.rgb-value.css",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.css"
      }
    },
    "match": "(#)([0-9a-fA-F]{6}|[0-9a-fA-F]{3})"
  },
  "font-relative": {
    "name": "support.constant.property-value.css",
    "match": "(larger|smaller)"
  }
};

var patterns = [
  {
    "name": "meta.selector.css",
    "begin": "(^)?(?=\\s*[.*#a-zA-Z])",
    "end": "(/\\*|(?=\\{))",
    "patterns": [
      {
        "name": "entity.name.tag.css",
        "match": "\\b(?i:a|abbr|acronym|address|area|b|base|big|blockquote|body|br|button|caption|cite|code|col|colgroup|dd|del|dfn|div|dl|dt|em|embed|fieldset|form|frame|frameset|(h[1-6])|head|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|map|meta|noframes|noscript|object|ol|optgroup|option|p|param|pre|q|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|ul|var)\\b"
      },
      {
        "name": "meta.attribute-match.css",
        "captures": {
          "1": {
            "name": "punctuation.definition.attribute-name.css"
          },
          "2": {
            "name": "entity.other.attribute-name.css"
          },
          "3": {
            "name": "keyword.operator.css"
          },
          "4": {
            "comment": "according to CSS spec, this is an identifier or string",
            "name": "string.other.attribute-value.css"
          },
          "5": {
            "name": "punctuation.definition.attribute-name.css"
          }
        },
        "match": "(\\[)(.*?)(?:([\\|~]?=)([^\\]]*))?(\\])"
      },
      {
        "name": "entity.other.attribute-name.class.css",
        "captures": {
          "1": {
            "name": "punctuation.definition.entity.css"
          }
        },
        "match": "(\\.)[a-zA-Z0-9_-]+"
      },
      {
        "name": "entity.other.attribute-name.id.css",
        "captures": {
          "1": {
            "name": "punctuation.definition.entity.css"
          }
        },
        "match": "(#)[a-zA-Z0-9_-]+"
      },
      {
        "name": "entity.other.attribute-name.universal.css",
        "match": "\\*"
      },
      {
        "name": "entity.other.attribute-name.tag.pseudo-class.css",
        "captures": {
          "1": {
            "name": "punctuation.definition.entity.css"
          }
        },
        "match": "(:)(active|after|before|first-(letter|line)|focus|hover|link|visited)"
      }
    ]
  },
  {
    "include": "#comment-block"
  },
  {
    "name": "invalid.illegal.bad-comma.css",
    "match": "[^} \\t{/@][^{,]*?(,)\\s*?(?=\\{)"
  },
  {
    "name": "meta.preprocessor.at-rule.import.css",
    "begin": "(^\\s*)?((@)import)",
    "captures": {
      "2": {
        "name": "keyword.control.at-rule.import.css"
      },
      "3": {
        "name": "punctuation.definition.keyword.css"
      }
    },
    "end": "((?=;|\\}))",
    "patterns": [
      {
        "include": "#string-double"
      },
      {
        "include": "#uri"
      }
    ]
  },
  {
    "name": "meta.preprocessor.at-rule.media.css",
    "begin": "^\\s*((@)media)\\s+(((all|aural|braille|embossed|handheld|print|projection|screen|tty|tv)\\s*,?\\s*)+)\\s*{",
    "captures": {
      "1": {
        "name": "keyword.control.at-rule.media.css"
      },
      "2": {
        "name": "punctuation.definition.keyword.css"
      },
      "3": {
        "name": "support.constant.media.css"
      }
    },
    "end": "\\s*((?=;|\\}))",
    "patterns": [
      {
        "include": "source.css"
      }
    ]
  },
  {
    "name": "meta.scope.property-list.css",
    "begin": "\\{",
    "captures": {
      "0": {
        "name": "punctuation.section.property-list.css"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#comment-block"
      },
      {
        "name": "meta.property.azimuth.css",
        "begin": "(azimuth)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "((left|right)(-side|wards)?|(center|far)(-left|-right)?|behind)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#angle"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property-group.background.css",
        "begin": "(?=background)",
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property.background.css",
            "begin": "(background)(?=[:\\s])",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#color-hex"
                  },
                  {
                    "include": "#color-rgb"
                  },
                  {
                    "include": "#color-named"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#percentage"
                  },
                  {
                    "include": "#uri"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "((no-repeat)|repeat(-x|-y)?)"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none)"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(top|left|right|bottom|center)"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(fixed|scroll)"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.background-attachment.css",
            "begin": "(background-attachment)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(scroll|fixed)"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.background-color.css",
            "begin": "(background-color)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#color-hex"
                  },
                  {
                    "include": "#color-rgb"
                  },
                  {
                    "include": "#color-named"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.background-image.css",
            "begin": "(background-image)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#uri"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none)"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.background-position.css",
            "begin": "(background-position)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#percentage"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(top|left|right|bottom|center)"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.background-repeat.css",
            "begin": "(background-repeat)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "((no-repeat)|repeat(-x|-y)?)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property-group.border.css",
        "begin": "(?=border)",
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property.border.css",
            "begin": "(border(-bottom|-left|-right|-top)?)(?=[:\\s])",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#color-hex"
                  },
                  {
                    "include": "#color-rgb"
                  },
                  {
                    "include": "#color-named"
                  },
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#border-style"
                  },
                  {
                    "include": "#border-width"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "none"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.border-collapse.css",
            "begin": "(border-collapse)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(collapse|separate)"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.border-spacing.css",
            "begin": "(border-spacing)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.border-color.css",
            "begin": "(border((-bottom|-left|-right|-top)?(-color)))",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#color-hex"
                  },
                  {
                    "include": "#color-rgb"
                  },
                  {
                    "include": "#color-named"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.border-style.css",
            "begin": "(border((-bottom|-left|-right|-top)?(-style)))",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#border-style"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.border-width.css",
            "begin": "(border((-bottom|-left|-right|-top)?(-width)))",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#border-width"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.caption-side.css",
        "begin": "(caption-side)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(top|bottom|left|right)"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.clear.css",
        "begin": "(clear)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(left|right|both|none)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.clip.css",
        "begin": "(clip)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              },
              {
                "include": "#shape"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.color.css",
        "begin": "(color)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#color-hex"
              },
              {
                "include": "#color-rgb"
              },
              {
                "include": "#color-named"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.content.css",
        "begin": "(content)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#counter"
              },
              {
                "include": "#string-double"
              },
              {
                "include": "#string-single"
              },
              {
                "include": "#uri"
              },
              {
                "include": "#attr"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(open-quote|close-quote|no-open-quote|no-close-quote)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property-group.counter.css",
        "begin": "(?=counter)",
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property.counter-increment.css",
            "begin": "(counter-increment)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none)"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.counter-reset.css",
            "begin": "(counter-reset)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property-group.cue.css",
        "begin": "(?=cue)",
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property.cue.css",
            "begin": "(cue[:|\\s])",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#uri"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none)"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.cue-after.css",
            "begin": "(cue-after)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#uri"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none)"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.cue-before.css",
            "begin": "(cue-before)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#uri"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.cursor.css",
        "begin": "(cursor)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              },
              {
                "include": "#uri"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(auto|crosshair|default|pointer|move|e-resize|ne-resize|nw-resize|n-resize|se-resize|sw-resize|s-resize|w-resize|text|wait|help)"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.direction.css",
        "begin": "(direction)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(ltr|rtl)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.display.css",
        "begin": "(display)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(block|list-item|run-in|compact|marker|inline(-table|-block)?|table(((-row|-header|-footer|-column)-group)|-column|-row|-cell|-caption)?|none)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.elevation.css",
        "begin": "(elevation)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(below|level|above|higher|lower)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              },
              {
                "include": "#angle"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.empty-cells.css",
        "begin": "(empty-cells)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(show|hide)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.float.css",
        "begin": "(float)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(none|left|right)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property-group.font.css",
        "begin": "(?=font)",
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property.font.css",
            "begin": "(font)(?=[:\\s])",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#percentage"
                  },
                  {
                    "include": "#string-double"
                  },
                  {
                    "include": "#string-single"
                  },
                  {
                    "include": "#font-specific"
                  },
                  {
                    "include": "#font-generic"
                  },
                  {
                    "include": "#font-weight"
                  },
                  {
                    "include": "#font-stretch"
                  },
                  {
                    "include": "#font-style"
                  },
                  {
                    "include": "#font-variant"
                  },
                  {
                    "include": "#font-other"
                  },
                  {
                    "include": "#font-absolute"
                  },
                  {
                    "include": "#font-relative"
                  },
                  {
                    "include": "#font-adjust"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.font-family.css",
            "begin": "(font-family)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#font-specific"
                  },
                  {
                    "include": "#font-generic"
                  },
                  {
                    "include": "#string-double"
                  },
                  {
                    "include": "#string-single"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.font-size.css",
            "begin": "(font-size(-adjust)?)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#percentage"
                  },
                  {
                    "include": "#font-absolute"
                  },
                  {
                    "include": "#font-relative"
                  },
                  {
                    "include": "#font-adjust"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.font-stretch.css",
            "begin": "(font-stretch)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#font-stretch"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.font-style.css",
            "begin": "(font-style)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#font-style"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.font-variant.css",
            "begin": "(font-variant)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#font-variant"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.font-weight.css",
            "begin": "(font-weight)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  },
                  {
                    "include": "#font-weight"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.letter-spacing.css",
        "begin": "(letter-spacing)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#length"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(normal)"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.line-height.css",
        "begin": "(line-height)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#length"
              },
              {
                "include": "#percentage"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(normal)"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property-group.list-style.css",
        "begin": "(?=list)",
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property.list-style.css",
            "begin": "(list-style[:|\\s])",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(disc|circle|square|none)"
                  },
                  {
                    "include": "#list-style-type"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(inside|outside)"
                  },
                  {
                    "include": "#uri"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.list-style-image.css",
            "begin": "(list-style-image)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none)"
                  },
                  {
                    "include": "#uri"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.list-style-position.css",
            "begin": "(list-style-position)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(inside|outside)"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.list-style-type.css",
            "begin": "(list-style-type)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(disc|circle|square|none)"
                  },
                  {
                    "include": "#list-style-type"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.margin.css",
        "begin": "(margin(-bottom|-left|-right|-top)?)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#length"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.marker-offset.css",
        "begin": "(marker-offset)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#length"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.marks.css",
        "begin": "(marks)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(crop|cross|none)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.opacity.css",
        "begin": "(opacity)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "constant.numeric.css",
                "match": "(-|\\+)?\\s*[0-9]*(\\.)?[0-9]+"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.orphans.css",
        "begin": "(orphans)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "constant.numeric.css",
                "match": "[0-9]+"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property-group.outline.css",
        "begin": "(?=outline)",
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property.outline.css",
            "begin": "(outline)[:\\s]",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(invert)"
                  },
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#border-style"
                  },
                  {
                    "include": "#border-width"
                  },
                  {
                    "include": "#color-hex"
                  },
                  {
                    "include": "#color-rgb"
                  },
                  {
                    "include": "#color-named"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.outline-style.css",
            "begin": "(outline-style)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#border-style"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.outline-color.css",
            "begin": "(outline-color)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(invert)"
                  },
                  {
                    "include": "#color-hex"
                  },
                  {
                    "include": "#color-rgb"
                  },
                  {
                    "include": "#color-named"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.outline-width.css",
            "begin": "(outline-width)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#border-width"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.overflow.css",
        "begin": "(overflow)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(visible|hidden|scroll)"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.padding.css",
        "begin": "(padding(-bottom|-left|-right|-top)?)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#length"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.page.css",
        "begin": "(page)(?=[:\\s])",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(always|avoid|left|right)"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.page.css",
        "begin": "(page-break-(before|after|inside)?)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(always|avoid|left|right)"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.pause.css",
        "begin": "(pause(-after|-before)?)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "constant.numeric.css",
                "match": "(-|\\+)?\\s*[0-9]*(\\.)?[0-9]+"
              },
              {
                "name": "constant.other.unit.css",
                "match": "(m)?s"
              },
              {
                "name": "constant.other.unit.css",
                "match": "%"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.pitch.css",
        "begin": "(pitch(-range)?)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "constant.numeric.css",
                "match": "(-|\\+)?\\s*[0-9]*(\\.)?[0-9]+"
              },
              {
                "name": "constant.other.unit.css",
                "match": "(k)?Hz"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(x-low|low|medium|high|x-high)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.play-during.css",
        "begin": "(play-during)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(mix|repeat|auto|none)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              },
              {
                "include": "#uri"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.position.css",
        "begin": "(position)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(relative|fixed|absolute|static)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.quotes.css",
        "begin": "(quotes)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#string-double"
              },
              {
                "include": "#string-single"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "none"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.richness.css",
        "begin": "(richness)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "constant.numeric.css",
                "match": "(-|\\+)?\\s*[0-9]*(\\.)?[0-9]+"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.placement.css",
        "begin": "(bottom|left|right|top)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#length"
              },
              {
                "include": "#percentage"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.elem-size.css",
        "begin": "(((min|max)-)?(height|width))",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#length"
              },
              {
                "include": "#percentage"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "none"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.size.css",
        "begin": "(size)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "include": "#length"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(portrait|landscape)"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.speak.css",
        "begin": "(speak(-(header|numeral|punctuation))?)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(normal|none|spell-out)"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(once|always)"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(digits|continuous)"
              },
              {
                "name": "support.constant.property-value.css",
                "match": "(code|none)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.speech-rate.css",
        "begin": "(speech-rate)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(x-slow|slow(er)?|medium|fast(er)?|x-fast|inherit)"
              },
              {
                "name": "constant.numeric.css",
                "match": "(-|\\+)?\\s*[0-9]*(\\.)?[0-9]+"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.stress.css",
        "begin": "(stress)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "constant.numeric.css",
                "match": "(-|\\+)?\\s*[0-9]*(\\.)?[0-9]+"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.table-layout.css",
        "begin": "(table-layout)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(auto|fixed)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property-group.text.css",
        "begin": "(?=text)",
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property.text-align.css",
            "begin": "(text-align)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(left|right|center|justify)"
                  },
                  {
                    "include": "#string-double"
                  },
                  {
                    "include": "#string-single"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.text-decoration.css",
            "begin": "(text-decoration)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none|underline|overline|line-through|blink)"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.text-indent.css",
            "begin": "(text-indent)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#percentage"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.text-shadow.css",
            "begin": "(text-shadow)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "none"
                  },
                  {
                    "include": "#length"
                  },
                  {
                    "include": "#color-hex"
                  },
                  {
                    "include": "#color-rgb"
                  },
                  {
                    "include": "#color-named"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.text-transform.css",
            "begin": "(text-transform)",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none|uppercase|lowercase|capitalize)"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          },
          {
            "name": "meta.property.text.css",
            "begin": "(text)[-\\s]",
            "captures": {
              "1": {
                "name": "support.type.property-name.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "meta.property-value.css",
                "begin": ":",
                "beginCaptures": {
                  "0": {
                    "name": "punctuation.separator.key-value.css"
                  }
                },
                "end": "(?=[;}])",
                "patterns": [
                  {
                    "include": "#length"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(left|right|center|justify)"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(underline|overline|line-through|blink)"
                  },
                  {
                    "name": "support.constant.property-value.css",
                    "match": "(none|uppercase|lowercase|capitalize)"
                  },
                  {
                    "include": "#comment-block"
                  },
                  {
                    "include": "#important"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.vertical-align.css",
        "begin": "(vertical-align)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(baseline|sub|super|top|text-top|middle|bottom|text-bottom)"
              },
              {
                "include": "#length"
              },
              {
                "include": "#percentage"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.unicode-bidi.css",
        "begin": "(unicode-bidi)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-name.css",
            "begin": "(?=[a-z])",
            "end": "(?=:)",
            "patterns": [
              {
                "name": "support.type.property-name.css",
                "match": "unicode-bidi"
              }
            ]
          },
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(normal|embed|bidi-override)"
              },
              {
                "include": "#length"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.visibility.css",
        "begin": "(visibility)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(visible|hidden|collapse)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.voice-family.css",
        "begin": "(voice-family)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(male|female|child)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.volume.css",
        "begin": "(volume)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(silent|x-soft|soft|medium|loud|x-loud)"
              },
              {
                "include": "#percentage"
              },
              {
                "name": "constant.numeric.css",
                "match": "([-+]?[0-9]*(\\.)?[0-9]+)\\b"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.white-space.css",
        "begin": "(white-space)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "(normal|pre|nowrap)"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.widows.css",
        "begin": "(widows)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "constant.numeric.css",
                "match": "[0-9]+"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.word-spacing.css",
        "begin": "(word-spacing)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "normal"
              },
              {
                "include": "#length"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.property.z-index.css",
        "begin": "(z-index)",
        "captures": {
          "1": {
            "name": "support.type.property-name.css"
          }
        },
        "end": "(?=[;}])",
        "patterns": [
          {
            "name": "meta.property-value.css",
            "begin": ":",
            "beginCaptures": {
              "0": {
                "name": "punctuation.separator.key-value.css"
              }
            },
            "end": "(?=[;}])",
            "patterns": [
              {
                "name": "support.constant.property-value.css",
                "match": "auto"
              },
              {
                "name": "constant.numeric.css",
                "match": "[0-9]+"
              },
              {
                "include": "#comment-block"
              },
              {
                "include": "#important"
              }
            ]
          }
        ]
      }
    ]
  }
];

exports.CSS v3 betaSyntax = new TextmateSyntax(repositories, patterns);
