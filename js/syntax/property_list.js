"define metadata";
({
    "description": "Property List syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "plist",
            "pointer": "#Property ListSyntax",
            "fileexts": [
  "plist",
  "dict",
  "tmCommand",
  "tmDelta",
  "tmDragCommand",
  "tmLanguage",
  "tmMacro",
  "tmPreferences",
  "tmSnippet",
  "tmTheme",
  "scriptSuite",
  "scriptTerminology",
  "savedSearch"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "openstep_name": {
    "patterns": [
      {
        "name": "meta.rule.named.plist",
        "begin": "(?=([-a-zA-Z0-9_.]+)|(\"|'))",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.array.plist"
          },
          "2": {
            "name": "punctuation.terminator.dictionary.plist"
          },
          "3": {
            "name": "punctuation.terminator.rule.plist"
          }
        },
        "end": "((?<=\\));)|((?<=\\});)|(;)",
        "patterns": [
          {
            "name": "constant.other.key.plist",
            "match": "[-a-zA-Z0-9_.]+"
          },
          {
            "begin": "(?<=('|\"|[-a-zA-Z0-9_.]))(?!=)|\\s",
            "comment": "Mark anything between the name and the =\n\t\t\t\t\t\t\t\t\t\tas invalid.",
            "end": "(?==)",
            "patterns": [
              {
                "include": "#openstep_stray-char"
              }
            ]
          },
          {
            "name": "constant.other.key.plist",
            "begin": "(\"|')",
            "endCaptures": {
              "0": {
                "name": "punctuation.definition.string.end.plist"
              }
            },
            "beginCaptures": {
              "0": {
                "name": "punctuation.definition.string.begin.plist"
              }
            },
            "end": "(\\1)",
            "patterns": [
              {
                "include": "#openstep_string-contents"
              }
            ]
          },
          {
            "begin": "(=)(?!;)",
            "beginCaptures": {
              "1": {
                "name": "punctuation.separator.key-value.plist"
              }
            },
            "end": "(?=;)",
            "patterns": [
              {
                "include": "#openstep_post-value"
              },
              {
                "include": "#openstep_string"
              },
              {
                "include": "#openstep_data"
              },
              {
                "include": "#openstep_array"
              },
              {
                "include": "#openstep_dictionary"
              }
            ]
          }
        ]
      }
    ]
  },
  "openstep_dictionary": {
    "begin": "(\\{)",
    "name": "meta.group.dictionary.plist",
    "captures": {
      "1": {
        "name": "punctuation.section.dictionary.plist"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "include": "#openstep_name"
      },
      {
        "include": "#openstep_comment"
      },
      {
        "include": "#openstep_stray-char"
      }
    ]
  },
  "xml": {
    "patterns": [
      {
        "begin": "((<)((plist\\b)))",
        "captures": {
          "1": {
            "name": "meta.tag.plist.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((/)((plist))(>))",
        "patterns": [
          {
            "name": "meta.tag.plist.xml.plist",
            "begin": "(?<=<plist)(?!>)\\s*(?:(version)(=)(?:((\").*?(\"))|((').*?('))))?",
            "beginCaptures": {
              "6": {
                "name": "string.quoted.single.xml.plist"
              },
              "7": {
                "name": "punctuation.definition.string.begin.xml.plist"
              },
              "8": {
                "name": "punctuation.definition.string.end.xml.plist"
              },
              "1": {
                "name": "entity.other.attribute-name.version.xml.plist"
              },
              "2": {
                "name": "punctuation.separator.key-value.xml.plist"
              },
              "3": {
                "name": "string.quoted.double.xml.plist"
              },
              "4": {
                "name": "punctuation.definition.string.begin.xml.plist"
              },
              "5": {
                "name": "punctuation.definition.string.end.xml.plist"
              }
            },
            "end": "(?=>)"
          },
          {
            "comment": "Tag with no content",
            "captures": {
              "1": {
                "name": "meta.tag.plist.xml.plist"
              },
              "2": {
                "name": "punctuation.definition.tag.xml.plist"
              },
              "3": {
                "name": "meta.scope.between-tag-pair.xml.plist"
              }
            },
            "match": "((>(<)))(?=/plist)"
          },
          {
            "begin": "((>))(?!</plist)",
            "endCaptures": {
              "0": {
                "name": "meta.tag.plist.xml.plist"
              },
              "1": {
                "name": "punctuation.definition.tag.xml.plist"
              }
            },
            "beginCaptures": {
              "1": {
                "name": "meta.tag.plist.xml.plist"
              },
              "2": {
                "name": "punctuation.definition.tag.xml.plist"
              }
            },
            "end": "(<)(?=/plist)",
            "patterns": [
              {
                "include": "#xml_tags"
              }
            ]
          }
        ]
      },
      {
        "include": "#xml_invalid"
      },
      {
        "include": "#xml_comment"
      },
      {
        "include": "text.xml"
      },
      {
        "include": "#xml_stray-char"
      }
    ]
  },
  "xml_innertag": {
    "patterns": [
      {
        "name": "constant.character.entity.xml.plist",
        "match": "&([a-zA-Z0-9_-]+|#[0-9]+|#x[0-9a-fA-F]+);"
      },
      {
        "name": "invalid.illegal.bad-ampersand.xml.plist",
        "match": "&"
      }
    ]
  },
  "xml_stray-char": {
    "name": "invalid.illegal.character-data-not-allowed-here.xml.plist",
    "match": "\\S"
  },
  "openstep": {
    "patterns": [
      {
        "include": "#openstep_comment"
      },
      {
        "include": "#openstep_dictionary"
      },
      {
        "include": "#openstep_array"
      },
      {
        "include": "#openstep_stray-char"
      }
    ]
  },
  "openstep_comment": {
    "patterns": [
      {
        "name": "comment.block.plist",
        "begin": "/\\*",
        "captures": {
          "0": {
            "name": "punctuation.definition.comment.plist"
          }
        },
        "end": "\\*/"
      },
      {
        "name": "comment.line.double-slash.plist",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.plist"
          }
        },
        "match": "(//).*$\\n?"
      }
    ]
  },
  "xml_comment": {
    "begin": "<!--",
    "name": "comment.block.xml.plist",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.xml.plist"
      }
    },
    "end": "(?<!-)-->",
    "patterns": [
      {
        "name": "invalid.illegal.double-dash-not-allowed.xml.plist",
        "match": "-(?=-->)|--"
      }
    ]
  },
  "xml_tags": {
    "patterns": [
      {
        "comment": "Empty tag: Dictionary",
        "captures": {
          "11": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "6": {
            "name": "meta.tag.dict.xml.plist"
          },
          "7": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "8": {
            "name": "meta.scope.between-tag-pair.xml.plist"
          },
          "9": {
            "name": "entity.name.tag.xml.plist"
          },
          "1": {
            "name": "meta.tag.dict.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "10": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "match": "((<)((dict))(>))(((<)/)((dict))(>))"
      },
      {
        "comment": "Empty tag: Array",
        "captures": {
          "11": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "6": {
            "name": "meta.tag.array.xml.plist"
          },
          "7": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "8": {
            "name": "meta.scope.between-tag-pair.xml.plist"
          },
          "9": {
            "name": "entity.name.tag.xml.plist"
          },
          "1": {
            "name": "meta.tag.array.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "10": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "match": "((<)((array))(>))(((<)/)((array))(>))"
      },
      {
        "comment": "Empty tag: String",
        "captures": {
          "11": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "6": {
            "name": "meta.tag.string.xml.plist"
          },
          "7": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "8": {
            "name": "meta.scope.between-tag-pair.xml.plist"
          },
          "9": {
            "name": "entity.name.tag.xml.plist"
          },
          "1": {
            "name": "meta.tag.string.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "10": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "match": "((<)((string))(>))(((<)/)((string))(>))"
      },
      {
        "begin": "((<)((key))(>))",
        "comment": "the extra captures are required to duplicate the effect of the namespace parsing in the XML syntax",
        "captures": {
          "1": {
            "name": "meta.tag.key.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((</)((key))(>))",
        "contentName": "constant.other.name.xml.plist",
        "patterns": [
          {
            "begin": "<!\\[CDATA\\[",
            "captures": {
              "0": {
                "name": "punctuation.definition.constant.xml"
              }
            },
            "end": "]]>"
          }
        ]
      },
      {
        "comment": "Self-closing Dictionary",
        "captures": {
          "1": {
            "name": "meta.tag.dict.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "match": "((<)((dict))\\s*?/(>))"
      },
      {
        "comment": "Self-closing Array",
        "captures": {
          "1": {
            "name": "meta.tag.array.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "match": "((<)((array))\\s*?/(>))"
      },
      {
        "comment": "Self-closing String",
        "captures": {
          "1": {
            "name": "meta.tag.string.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "match": "((<)((string))\\s*?/(>))"
      },
      {
        "comment": "Self-closing Key",
        "captures": {
          "1": {
            "name": "meta.tag.key.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "match": "((<)((key))\\s*?/(>))"
      },
      {
        "begin": "((<)((dict))(>))",
        "comment": "Dictionary",
        "captures": {
          "1": {
            "name": "meta.tag.dict.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((</)((dict))(>))",
        "patterns": [
          {
            "include": "#xml_tags"
          }
        ]
      },
      {
        "begin": "((<)((array))(>))",
        "comment": "Array",
        "captures": {
          "1": {
            "name": "meta.tag.array.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((</)((array))(>))",
        "patterns": [
          {
            "include": "#xml_tags"
          }
        ]
      },
      {
        "begin": "((<)((string))(>))",
        "comment": "Strings",
        "captures": {
          "1": {
            "name": "meta.tag.string.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((</)((string))(>))",
        "contentName": "string.quoted.other.xml.plist",
        "patterns": [
          {
            "include": "#xml_innertag"
          },
          {
            "name": "string.unquoted.cdata.xml",
            "begin": "<!\\[CDATA\\[",
            "captures": {
              "0": {
                "name": "punctuation.definition.string.xml"
              }
            },
            "end": "]]>"
          }
        ]
      },
      {
        "begin": "((<)((real))(>))",
        "comment": "Numeric",
        "captures": {
          "1": {
            "name": "meta.tag.real.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((</)((real))(>))",
        "patterns": [
          {
            "begin": "(<!\\[CDATA\\[)",
            "captures": {
              "0": {
                "name": "punctuation.definition.constant.xml"
              },
              "1": {
                "name": "constant.numeric.real.xml.plist"
              }
            },
            "end": "(]]>)",
            "patterns": [
              {
                "name": "constant.numeric.real.xml.plist",
                "match": "[-+]?\\d+(\\.\\d*)?(E[-+]\\d+)?"
              },
              {
                "name": "invalid.illegal.not-a-number.xml.plist",
                "match": "."
              }
            ]
          },
          {
            "name": "constant.numeric.real.xml.plist",
            "match": "[-+]?\\d+(\\.\\d*)?(E[-+]\\d+)?"
          },
          {
            "name": "invalid.illegal.not-a-number.xml.plist",
            "match": "."
          }
        ]
      },
      {
        "begin": "((<)((integer))(>))",
        "comment": "Integer",
        "captures": {
          "1": {
            "name": "meta.tag.integer.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((</)((integer))(>))",
        "patterns": [
          {
            "name": "constant.numeric.integer.xml.plist",
            "match": "[-+]?\\d+"
          },
          {
            "name": "invalid.illegal.not-a-number.xml.plist",
            "match": "."
          }
        ]
      },
      {
        "comment": "Boolean",
        "captures": {
          "1": {
            "name": "meta.tag.boolean.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "match": "((<)((true|false))\\s*?(/>))"
      },
      {
        "begin": "((<)((data))(>))",
        "comment": "Data",
        "captures": {
          "1": {
            "name": "meta.tag.data.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((</)((data))(>))",
        "patterns": [
          {
            "name": "constant.numeric.base64.xml.plist",
            "match": "[A-Za-z0-9+/]"
          },
          {
            "name": "constant.numeric.base64.xml.plist",
            "match": "="
          },
          {
            "name": "invalid.illegal.invalid-character.xml.plist",
            "match": "[^ \\n\\t]"
          }
        ]
      },
      {
        "begin": "((<)((date))(>))",
        "comment": "Date",
        "captures": {
          "1": {
            "name": "meta.tag.date.xml.plist"
          },
          "2": {
            "name": "punctuation.definition.tag.xml.plist"
          },
          "3": {
            "name": "entity.name.tag.xml.plist"
          },
          "4": {
            "name": "entity.name.tag.localname.xml.plist"
          },
          "5": {
            "name": "punctuation.definition.tag.xml.plist"
          }
        },
        "end": "((</)((date))(>))",
        "patterns": [
          {
            "name": "constant.other.date.xml.plist",
            "match": "(?x)\n\t\t\t\t\t\t\t\t\t\t[0-9]{4}\t\t\t\t\t\t# Year\n\t\t\t\t\t\t\t\t\t\t-\t\t\t\t\t\t\t\t# Divider\n\t\t\t\t\t\t\t\t\t\t(0[1-9]|1[012])\t\t\t\t\t# Month\n\t\t\t\t\t\t\t\t\t\t-\t\t\t\t\t\t\t\t# Divider\n\t\t\t\t\t\t\t\t\t\t(?!00|3[2-9])[0-3][0-9]\t\t\t# Day\n\t\t\t\t\t\t\t\t\t\tT\t\t\t\t\t\t\t\t# Separator\n\t\t\t\t\t\t\t\t\t\t(?!2[5-9])[0-2][0-9]\t\t\t# Hour\n\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t# Divider\n\t\t\t\t\t\t\t\t\t\t[0-5][0-9]\t\t\t\t\t\t# Minute\n\t\t\t\t\t\t\t\t\t\t:\t\t\t\t\t\t\t\t# Divider\n\t\t\t\t\t\t\t\t\t\t(?!6[1-9])[0-6][0-9]\t\t\t# Second\n\t\t\t\t\t\t\t\t\t\tZ\t\t\t\t\t\t\t\t# Zulu\n\t\t\t\t\t\t\t\t\t"
          }
        ]
      },
      {
        "include": "#xml_invalid"
      },
      {
        "include": "#xml_comment"
      },
      {
        "include": "#xml_stray-char"
      }
    ]
  },
  "openstep_string-contents": {
    "name": "constant.character.escape.plist",
    "match": "\\\\([uU](\\h{4}|\\h{2})|\\d{1,3}|.)"
  },
  "openstep_post-value": {
    "begin": "(?<='|\"|\\}|\\)|>|[-a-zA-Z0-9_.])(?!;)",
    "end": "(?=;)",
    "patterns": [
      {
        "include": "#openstep_stray-char"
      }
    ]
  },
  "openstep_stray-char": {
    "name": "invalid.illegal.character-not-allowed-here.plist",
    "match": "[^\\s\\n]"
  },
  "openstep_string": {
    "patterns": [
      {
        "name": "string.quoted.single.plist",
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.plist"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.plist"
          }
        },
        "end": "'",
        "patterns": [
          {
            "include": "#openstep_string-contents"
          }
        ]
      },
      {
        "name": "string.quoted.double.plist",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.plist"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.plist"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "include": "#openstep_string-contents"
          }
        ]
      },
      {
        "name": "constant.numeric.plist",
        "match": "[-+]?\\d+(\\.\\d*)?(E[-+]\\d+)?(?!\\w)"
      },
      {
        "name": "string.unquoted.plist",
        "match": "[-a-zA-Z0-9_.]+"
      }
    ]
  },
  "xml_invalid": {
    "comment": "Invalid tag",
    "captures": {
      "1": {
        "name": "meta.tag.boolean.xml.plist"
      },
      "2": {
        "name": "punctuation.definition.tag.xml.plist"
      },
      "3": {
        "name": "invalid.illegal.tag-not-recognized.xml.plist"
      },
      "4": {
        "name": "punctuation.definition.tag.xml.plist"
      }
    },
    "match": "((<)/?(\\w+).*?(>))"
  },
  "openstep_array": {
    "begin": "(\\()",
    "name": "meta.group.array.plist",
    "captures": {
      "1": {
        "name": "punctuation.section.array.plist"
      }
    },
    "end": "(\\))",
    "patterns": [
      {
        "include": "#openstep_array-item"
      },
      {
        "include": "#openstep_comment"
      },
      {
        "include": "#openstep_stray-char"
      }
    ]
  },
  "openstep_array-item": {
    "begin": "(?={|\\(|\"|'|[-a-zA-Z0-9_.]|<)",
    "endCaptures": {
      "1": {
        "name": "punctuation.separator.array.plist"
      }
    },
    "end": "(,)|(?=\\))",
    "patterns": [
      {
        "include": "#openstep_string"
      },
      {
        "include": "#openstep_data"
      },
      {
        "include": "#openstep_dictionary"
      },
      {
        "include": "#openstep_array"
      },
      {
        "begin": "(?<=\"|'|\\}|\\))",
        "comment": "Catch stray chars",
        "end": "(?=,|\\))",
        "patterns": [
          {
            "include": "#openstep_comment"
          },
          {
            "include": "#openstep_stray-char"
          }
        ]
      }
    ]
  },
  "openstep_data": {
    "begin": "(<)",
    "name": "meta.binary-data.plist",
    "endCaptures": {
      "1": {
        "name": "punctuation.terminator.data.plist"
      },
      "2": {
        "name": "punctuation.definition.data.plist"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.data.plist"
      }
    },
    "end": "(=?)\\s*?(>)",
    "patterns": [
      {
        "name": "constant.numeric.base64.plist",
        "match": "[A-Za-z0-9+/]"
      },
      {
        "name": "invalid.illegal.invalid-character.plist",
        "match": "[^ \\n]"
      }
    ]
  }
};

var patterns = [
  {
    "name": "text.xml.plist",
    "begin": "xml|plist",
    "comment": "This gives us the proper scope for the xml or plist snippet.",
    "end": "\\Z(?!\\n)"
  },
  {
    "name": "source.plist.binary",
    "begin": "^bplist00",
    "comment": "This gives us the proper scope for the convert plist command.",
    "end": "\\Z(?!\\n)"
  },
  {
    "name": "text.xml.plist",
    "begin": "(?=\\s*(<\\?xml|<!DOCTYPE\\s*plist))",
    "end": "\\Z(?!\\n)",
    "patterns": [
      {
        "include": "#xml"
      }
    ]
  },
  {
    "name": "source.plist",
    "begin": "(?=\\s*({|\\(|//|/\\*))",
    "end": "\\Z(?!\\n)",
    "patterns": [
      {
        "include": "#openstep"
      }
    ]
  }
];

exports.Property ListSyntax = new TextmateSyntax(repositories, patterns);
