"define metadata";
({
    "description": "Language Grammar syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "textmate",
            "pointer": "#Language GrammarSyntax",
            "fileexts": [
  "textmate"
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
        "name": "comment.block.tm-grammar",
        "begin": "/\\*",
        "end": "\\*/"
      },
      {
        "name": "comment.line.double-slash.tm-grammar",
        "match": "//.*$\\n?"
      }
    ]
  },
  "regexp": {
    "patterns": [
      {
        "name": "string.regexp.oniguruma.single.tm-grammar",
        "begin": "(')",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          }
        },
        "end": "(')(?!')",
        "patterns": [
          {
            "name": "constant.character.escape.apostrophe.tm-grammar",
            "match": "''"
          },
          {
            "include": "source.regexp.oniguruma"
          }
        ]
      },
      {
        "name": "string.regexp.oniguruma.double.tm-grammar",
        "begin": "(\")",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          }
        },
        "end": "(\")",
        "patterns": [
          {
            "name": "constant.character.escape.tm-grammar",
            "match": "\\\\\\\\|\\\\\""
          },
          {
            "include": "source.regexp.oniguruma"
          }
        ]
      }
    ]
  },
  "scope": {
    "patterns": [
      {
        "name": "string.quoted.single.scope.tm-grammar",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          },
          "2": {
            "name": "constant.other.scope.tm-grammar"
          },
          "3": {
            "name": "constant.other.scope.tm-grammar"
          },
          "4": {
            "name": "invalid.deprecated.scope_not_allowed.tm-grammar"
          },
          "5": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "match": "(?x)\n\t\t\t\t\t\t(')\t\t\t\t\t\t\t\t# Open String\n\t\t\t\t\t\t\t(\t\t\t\t\t\t\t# Optionally match the valid\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t# scopes, and the following\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t# part of the scope, meaning\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t# anything else is invalid\n\t\t\t\t\t\t\t\tcomment(?:\n\t\t\t\t\t\t\t\t\t\\.(?:line|block)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | constant(?:\n\t\t\t\t\t\t\t\t\t\\.(?:numeric|character|language|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | entity(?:\n\t\t\t\t\t\t\t\t\t\\.name(?:\n\t\t\t\t\t\t\t\t\t\t\\.(?:function|type|tag|section)\n\t\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t  | \\.other(?:\n\t\t\t\t\t\t\t\t\t\t\\.(?:inherited-class|attribute-name)\n\t\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | invalid(?:\n\t\t\t\t\t\t\t\t\t\\.(?:illegal|deprecated)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | keyword(?:\n\t\t\t\t\t\t\t\t\t\\.(?:control|operator|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | markup(?:\n\t\t\t\t\t\t\t\t\t\\.(?:underline|bold|heading|italic|list|quote|raw|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | meta\n\t\t\t\t\t\t\t  | punctuation(?:\n\t\t\t\t\t\t\t\t\t\\.(?:definition|section|separator|terminator|whitespace)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | source\n\t\t\t\t\t\t\t  | storage(?:\n\t\t\t\t\t\t\t\t\t\\.(?:type|modifier)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | string(?:\n\t\t\t\t\t\t\t\t\t\\.(?:\n\t\t\t\t\t\t\t\t\t\tquoted(?:\n\t\t\t\t\t\t\t\t\t\t\t\\.(?:single|double|triple|other)\n\t\t\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t\t  | (?:unquoted|interpolated|regexp|other)\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | support(?:\n\t\t\t\t\t\t\t\t\t\\.(?:function|class|type|constant|variable|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | text\n\t\t\t\t\t\t\t  | variable(?:\n\t\t\t\t\t\t\t\t\t\\.(?:parameter|language|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t((?<!')[^\\s,()&|\\[\\]:\"'{}<>*?=^;]*(?<!\\.))?\n\t\t\t\t\t\t\t([^']*)?\n\t\t\t\t\t\t(')\t\t\t\t\t\t\t\t# Close String\n\t\t\t\t\t"
      },
      {
        "name": "string.quoted.double.scope.tm-grammar",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          },
          "2": {
            "name": "constant.other.scope.tm-grammar"
          },
          "3": {
            "name": "constant.other.scope.tm-grammar"
          },
          "4": {
            "name": "invalid.deprecated.scope_not_allowed.tm-grammar"
          },
          "5": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "match": "(?x)\n\t\t\t\t\t\t(\")\t\t\t\t\t\t\t\t# Open String\n\t\t\t\t\t\t\t(\t\t\t\t\t\t\t# Optionally match the valid\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t# scopes, and the following\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t# part of the scope, meaning\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t# anything else is invalid\n\t\t\t\t\t\t\t\tcomment(?:\n\t\t\t\t\t\t\t\t\t\\.(?:line|block)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | constant(?:\n\t\t\t\t\t\t\t\t\t\\.(?:numeric|character|language|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | entity(?:\n\t\t\t\t\t\t\t\t\t\\.name(?:\n\t\t\t\t\t\t\t\t\t\t\\.(?:function|type|tag|section)\n\t\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t  | \\.other(?:\n\t\t\t\t\t\t\t\t\t\t\\.(?:inherited-class|attribute-name)\n\t\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | invalid(?:\n\t\t\t\t\t\t\t\t\t\\.(?:illegal|deprecated)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | keyword(?:\n\t\t\t\t\t\t\t\t\t\\.(?:control|operator|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | markup(?:\n\t\t\t\t\t\t\t\t\t\\.(?:underline|bold|heading|italic|list|quote|raw|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | meta\n\t\t\t\t\t\t\t  | punctuation(?:\n\t\t\t\t\t\t\t\t\t\\.(?:definition|section|separator|terminator|whitespace)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | source\n\t\t\t\t\t\t\t  | storage(?:\n\t\t\t\t\t\t\t\t\t\\.(?:type|modifier)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | string(?:\n\t\t\t\t\t\t\t\t\t\\.(?:\n\t\t\t\t\t\t\t\t\t\tquoted(?:\n\t\t\t\t\t\t\t\t\t\t\t\\.(?:single|double|triple|other)\n\t\t\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t\t\t  | (?:unquoted|interpolated|regexp|other)\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | support(?:\n\t\t\t\t\t\t\t\t\t\\.(?:function|class|type|constant|variable|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t  | text\n\t\t\t\t\t\t\t  | variable(?:\n\t\t\t\t\t\t\t\t\t\\.(?:parameter|language|other)\n\t\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t)?\n\t\t\t\t\t\t\t((?<!\")[^\\s,()&|\\[\\]:\"'{}<>*?=^;]*(?<!\\.))?\n\t\t\t\t\t\t\t([^\"]*)?\n\t\t\t\t\t\t(\")\t\t\t\t\t\t\t\t# Close String\n\t\t\t\t\t"
      }
    ]
  },
  "any": {
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "include": "#string"
      },
      {
        "include": "#array"
      },
      {
        "include": "#dictionary"
      },
      {
        "include": "#catch-all"
      }
    ]
  },
  "invalid-keyword": {
    "patterns": [
      {
        "name": "invalid.illegal.constant.misplaced-keyword.tm-grammar",
        "match": "\\b(fileTypes|foldingStartMarker|foldingStopMarker|patterns|match|begin|end|include|scopeName|captures|beginCaptures|endCaptures|firstLineMatch|comment|repository|disabled|contentName|applyEndPatternLast)\\b(?=\\s*=)"
      },
      {
        "name": "invalid.deprecated.constant.tm-grammar",
        "match": "\\b(swallow|mode)\\b(?=\\s*=)"
      },
      {
        "name": "invalid.illegal.constant.outdated.tm-grammar",
        "match": "\\b(foregroundColor|backgroundColor|fontStyle|elementForegroundColor|elementBackgroundColor|elementFontStyle|highlightPairs|smartTypingPairs|increaseIndentPattern)\\b(?=\\s*=)"
      },
      {
        "name": "invalid.illegal.constant.unknown-keyword.tm-grammar",
        "match": "[-a-zA-Z_.]+(?=\\s*=)"
      }
    ]
  },
  "dictionary": {
    "begin": "(\\{)",
    "captures": {
      "1": {
        "name": "punctuation.section.dictionary.tm-grammar"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "include": "#string"
      },
      {
        "begin": "(=)",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#any"
          }
        ]
      },
      {
        "name": "punctuation.terminator.dictionary.tm-grammar",
        "match": ";"
      },
      {
        "include": "#catch-all"
      }
    ]
  },
  "catch-all": {
    "patterns": [
      {
        "match": "\\s+"
      },
      {
        "name": "invalid.illegal.unrecognized-character.tm-grammar",
        "match": "."
      }
    ]
  },
  "array": {
    "begin": "(\\()",
    "captures": {
      "1": {
        "name": "punctuation.section.array.tm-grammar"
      }
    },
    "end": "(\\))",
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "begin": "(?=[^\\s,])",
        "endCaptures": {
          "1": {
            "name": "punctuation.separator.array.tm-grammar"
          }
        },
        "end": "(,)|(?=\\))",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "match": "\\s+(?=//|/\\*)"
          },
          {
            "name": "invalid.illegal.missing-comma.tm-grammar",
            "begin": "[[^\\n]&&\\s](?!\\s*(,|\\)|$)).*",
            "end": "^$not possible$^"
          },
          {
            "include": "#any"
          }
        ]
      },
      {
        "include": "#catch-all"
      }
    ]
  },
  "patterns": {
    "begin": "\\b(patterns)\\s*(=)",
    "name": "meta.array.patterns.tm-grammar",
    "endCaptures": {
      "1": {
        "name": "punctuation.terminator.dictionary.tm-grammar"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.constant.tm-grammar"
      },
      "2": {
        "name": "punctuation.separator.key-value.tm-grammar"
      }
    },
    "end": "(;)",
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "begin": "(\\()",
        "captures": {
          "1": {
            "name": "punctuation.section.array.tm-grammar"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "begin": "(?=[^\\s,])",
            "endCaptures": {
              "1": {
                "name": "punctuation.separator.array.tm-grammar"
              }
            },
            "end": "(,)|(?=\\))",
            "patterns": [
              {
                "include": "#comment"
              },
              {
                "match": "\\s+(?=//|/\\*)"
              },
              {
                "name": "invalid.illegal.missing-comma.tm-grammar",
                "begin": "[[^\\n]&&\\s](?!\\s*(,|\\)|$)).*",
                "end": "^$not possible$^"
              },
              {
                "include": "#rule"
              },
              {
                "include": "#catch-all"
              }
            ]
          },
          {
            "include": "#catch-all"
          }
        ]
      },
      {
        "include": "#catch-all"
      }
    ]
  },
  "scope-root": {
    "patterns": [
      {
        "name": "string.quoted.single.scope.root.tm-grammar",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          },
          "2": {
            "name": "constant.other.scope.tm-grammar"
          },
          "3": {
            "name": "invalid.deprecated.scope_not_allowed.tm-grammar"
          },
          "4": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "match": "(')(?:((?:source|text)(?='|\\.)[^']*)|([^']*))(')"
      },
      {
        "name": "string.quoted.double.scope.root.tm-grammar",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          },
          "2": {
            "name": "constant.other.scope.tm-grammar"
          },
          "3": {
            "name": "invalid.deprecated.scope_not_allowed.tm-grammar"
          },
          "4": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "match": "(\")(?:((?:source|text)(?=\"|\\.)[^\"]*)|([^\"]*))(\")"
      }
    ]
  },
  "string": {
    "patterns": [
      {
        "name": "constant.numeric.tm-grammar",
        "match": "\\b[0-9]+\\b"
      },
      {
        "name": "string.unquoted.tm-grammar",
        "match": "[-a-zA-Z0-9_.]+"
      },
      {
        "name": "string.quoted.single.tm-grammar",
        "begin": "(')",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "applyEndPatternLast": 1,
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          }
        },
        "end": "('(?!'))",
        "patterns": [
          {
            "name": "constant.character.escape.apostrophe.tm-grammar",
            "match": "''"
          }
        ]
      },
      {
        "name": "string.quoted.double.tm-grammar",
        "begin": "(\")",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          }
        },
        "end": "(\")",
        "patterns": [
          {
            "name": "constant.character.escape.tm-grammar",
            "match": "\\\\[\\\\\"]"
          }
        ]
      }
    ]
  },
  "comment-keyword": {
    "begin": "\\b(comment)\\s*(=)",
    "endCaptures": {
      "1": {
        "name": "punctuation.terminator.dictionary.tm-grammar"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.constant.tm-grammar"
      },
      "2": {
        "name": "punctuation.separator.key-value.tm-grammar"
      }
    },
    "end": "(;)",
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "name": "string.quoted.single.tm-grammar",
        "begin": "(')",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "applyEndPatternLast": 1,
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          }
        },
        "end": "(')(?!')",
        "contentName": "comment.block.string.tm-grammar",
        "patterns": [
          {
            "name": "constant.character.escape.apostrophe.tm-grammar",
            "match": "''"
          }
        ]
      },
      {
        "name": "string.quoted.double.tm-grammar",
        "begin": "(\")",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.string.end.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          }
        },
        "end": "(\")",
        "contentName": "comment.block.string.tm-grammar",
        "patterns": [
          {
            "name": "constant.character.escape.tm-grammar",
            "match": "\\\\[\\\\\"]"
          }
        ]
      },
      {
        "include": "#catch-all"
      }
    ]
  },
  "rule": {
    "begin": "(\\{)",
    "name": "meta.dictionary.rule.tm-grammar",
    "captures": {
      "1": {
        "name": "punctuation.section.dictionary.tm-grammar"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "name": "meta.value-pair.tm-grammar",
        "begin": "\\b((contentN|n)ame)\\s*(=)",
        "comment": "name, contentName",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "support.constant.tm-grammar"
          },
          "3": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "include": "#scope"
          },
          {
            "include": "#catch-all"
          }
        ]
      },
      {
        "begin": "\\b(begin|end|while|match)\\s*(=)",
        "comment": "begin, end, while, match",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "support.constant.tm-grammar"
          },
          "2": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "include": "#regexp"
          },
          {
            "include": "#catch-all"
          }
        ]
      },
      {
        "begin": "\\b(include)\\s*(=)",
        "comment": "include",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "support.constant.tm-grammar"
          },
          "2": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "name": "string.quoted.single.include.tm-grammar",
            "captures": {
              "6": {
                "name": "punctuation.definition.string.end.tm-grammar"
              },
              "1": {
                "name": "punctuation.definition.string.begin.tm-grammar"
              },
              "2": {
                "name": "constant.other.reference.repository-item.tm-grammar"
              },
              "3": {
                "name": "punctuation.definition.constant.tm-grammar"
              },
              "4": {
                "name": "constant.other.reference.grammar.tm-grammar"
              },
              "5": {
                "name": "punctuation.definition.constant.tm-grammar"
              }
            },
            "match": "(')(?:((#)[-a-zA-Z0-9._]+)|((\\$)(?:base|self)))?(')"
          },
          {
            "name": "string.quoted.double.include.tm-grammar",
            "captures": {
              "6": {
                "name": "punctuation.definition.string.end.tm-grammar"
              },
              "1": {
                "name": "punctuation.definition.string.begin.tm-grammar"
              },
              "2": {
                "name": "constant.other.reference.repository-item.tm-grammar"
              },
              "3": {
                "name": "punctuation.definition..tm-grammar"
              },
              "4": {
                "name": "constant.other.reference.grammar.tm-grammar"
              },
              "5": {
                "name": "punctuation.definition..tm-grammar"
              }
            },
            "match": "(')(?:((#)[-a-zA-Z0-9._]+)|((\\$)(?:base|self)))?(')"
          },
          {
            "include": "#scope-root"
          },
          {
            "include": "#catch-all"
          }
        ]
      },
      {
        "name": "meta.dictionary.captures.tm-grammar",
        "begin": "\\b((beginC|endC|whileC|c)aptures)\\s*(=)",
        "comment": "captures",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "support.constant.tm-grammar"
          },
          "3": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "begin": "(\\{)",
            "captures": {
              "1": {
                "name": "punctuation.section.dictionary.tm-grammar"
              }
            },
            "end": "(\\})",
            "patterns": [
              {
                "include": "#comment"
              },
              {
                "include": "#string"
              },
              {
                "begin": "(=)",
                "endCaptures": {
                  "1": {
                    "name": "punctuation.terminator.dictionary.tm-grammar"
                  }
                },
                "beginCaptures": {
                  "1": {
                    "name": "punctuation.separator.key-value.tm-grammar"
                  }
                },
                "end": "(;)",
                "patterns": [
                  {
                    "include": "#comment"
                  },
                  {
                    "begin": "(\\{)",
                    "captures": {
                      "1": {
                        "name": "punctuation.section.dictionary.tm-grammar"
                      }
                    },
                    "end": "(\\})",
                    "patterns": [
                      {
                        "include": "#comment"
                      },
                      {
                        "include": "#comment-keyword"
                      },
                      {
                        "name": "meta.value-pair.tm-grammar",
                        "begin": "\\b(name)\\s*(=)",
                        "comment": "name",
                        "endCaptures": {
                          "1": {
                            "name": "punctuation.terminator.dictionary.tm-grammar"
                          }
                        },
                        "beginCaptures": {
                          "1": {
                            "name": "support.constant.tm-grammar"
                          },
                          "2": {
                            "name": "punctuation.separator.key-value.tm-grammar"
                          }
                        },
                        "end": "(;)",
                        "patterns": [
                          {
                            "include": "#comment"
                          },
                          {
                            "include": "#scope"
                          },
                          {
                            "include": "#catch-all"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "include": "#catch-all"
                  }
                ]
              },
              {
                "name": "punctuation.terminator.dictionary.tm-grammar",
                "match": ";"
              },
              {
                "include": "#catch-all"
              }
            ]
          }
        ]
      },
      {
        "comment": "disabled, applyEndPatternLast",
        "captures": {
          "11": {
            "name": "punctuation.definition.string.end.tm-grammar"
          },
          "6": {
            "name": "constant.numeric.tm-grammar"
          },
          "12": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          },
          "7": {
            "name": "punctuation.definition.string.end.tm-grammar"
          },
          "8": {
            "name": "string.quoted.single.tm-grammar"
          },
          "9": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          },
          "1": {
            "name": "support.constant.tm-grammar"
          },
          "2": {
            "name": "punctuation.separator.key-value.tm-grammar"
          },
          "3": {
            "name": "constant.numeric.tm-grammar"
          },
          "10": {
            "name": "constant.numeric.tm-grammar"
          },
          "4": {
            "name": "string.quoted.double.tm-grammar"
          },
          "5": {
            "name": "punctuation.definition.string.begin.tm-grammar"
          }
        },
        "match": "\\b(disabled|applyEndPatternLast)\\s*(=)\\s*(?:(0|1)|((\")(0|1)(\"))|((')(0|1)(')))\\s*(;)"
      },
      {
        "include": "#patterns"
      },
      {
        "include": "#comment-keyword"
      },
      {
        "include": "#invalid-keyword"
      },
      {
        "include": "#string"
      },
      {
        "begin": "(=)",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#any"
          }
        ]
      },
      {
        "name": "punctuation.terminator.dictionary.tm-grammar",
        "match": ";"
      },
      {
        "include": "#catch-all"
      }
    ]
  }
};

var patterns = [
  {
    "begin": "(\\{)",
    "captures": {
      "1": {
        "name": "punctuation.section.dictionary.tm-grammar"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "include": "#comment"
      },
      {
        "name": "meta.value-pair.scopename.tm-grammar",
        "begin": "\\b(scopeName)\\s*(=)",
        "comment": "scopeName",
        "endCaptures": {
          "1": {
            "name": "punctuation.section.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "support.constant.tm-grammar"
          },
          "2": {
            "name": "punctuation.section.dictionary.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "include": "#scope-root"
          },
          {
            "include": "#catch-all"
          }
        ]
      },
      {
        "begin": "\\b(fileTypes)\\s*(=)",
        "comment": "fileTypes",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "support.constant.tm-grammar"
          },
          "2": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "begin": "(\\()",
            "captures": {
              "1": {
                "name": "punctuation.section.array.tm-grammar"
              }
            },
            "end": "(\\))",
            "patterns": [
              {
                "include": "#comment"
              },
              {
                "begin": "(?=[^\\s,])",
                "endCaptures": {
                  "1": {
                    "name": "punctuation.separator.array.tm-grammar"
                  }
                },
                "end": "(,)|(?=\\))",
                "patterns": [
                  {
                    "include": "#comment"
                  },
                  {
                    "match": "\\s+(?=//|/\\*)"
                  },
                  {
                    "name": "invalid.illegal.missing-comma.tm-grammar",
                    "begin": "[[^\\n]&&\\s](?!\\s*(,|\\)|$)).*",
                    "end": "^$not possible$^"
                  },
                  {
                    "include": "#string"
                  }
                ]
              },
              {
                "include": "#catch-all"
              }
            ]
          }
        ]
      },
      {
        "begin": "\\b(firstLineMatch|folding(Start|Stop)Marker)\\s*(=)",
        "comment": "firstLineMatch, foldingStartMarker, foldingStopMarker",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "support.constant.tm-grammar"
          },
          "3": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#comment"
          },
          {
            "include": "#regexp"
          },
          {
            "include": "#catch-all"
          }
        ]
      },
      {
        "include": "#patterns"
      },
      {
        "name": "meta.dictionary.repository.tm-grammar",
        "begin": "\\b(repository)\\s*(=)",
        "comment": "repository",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "support.constant.repository.tm-grammar"
          },
          "2": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "begin": "(\\{)",
            "captures": {
              "1": {
                "name": "punctuation.section.dictionary.tm-grammar"
              }
            },
            "end": "(\\})",
            "patterns": [
              {
                "include": "#comment"
              },
              {
                "name": "meta.value-pair.repository-item.tm-grammar",
                "begin": "([\"']?)([-a-zA-Z0-9._]+)\\1\\s*(=)",
                "endCaptures": {
                  "1": {
                    "name": "punctuation.terminator.dictionary.tm-grammar"
                  }
                },
                "beginCaptures": {
                  "2": {
                    "name": "entity.name.section.repository.tm-grammar"
                  },
                  "3": {
                    "name": "punctuation.separator.key-value.tm-grammar"
                  }
                },
                "end": "(;)",
                "patterns": [
                  {
                    "include": "#comment"
                  },
                  {
                    "include": "#rule"
                  },
                  {
                    "include": "#catch-all"
                  }
                ]
              },
              {
                "include": "#string"
              },
              {
                "begin": "(=)",
                "endCaptures": {
                  "1": {
                    "name": "punctuation.terminator.dictionary.tm-grammar"
                  }
                },
                "beginCaptures": {
                  "1": {
                    "name": "punctuation.separator.key-value.tm-grammar"
                  }
                },
                "end": "(;)",
                "patterns": [
                  {
                    "include": "#any"
                  }
                ]
              },
              {
                "name": "punctuation.terminator.dictionary.tm-grammar",
                "match": ";"
              },
              {
                "include": "#catch-all"
              }
            ]
          }
        ]
      },
      {
        "include": "#comment-keyword"
      },
      {
        "include": "#invalid-keyword"
      },
      {
        "include": "#string"
      },
      {
        "begin": "(=)",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.dictionary.tm-grammar"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.separator.key-value.tm-grammar"
          }
        },
        "end": "(;)",
        "patterns": [
          {
            "include": "#any"
          }
        ]
      },
      {
        "name": "punctuation.terminator.dictionary.tm-grammar",
        "match": ";"
      },
      {
        "include": "#catch-all"
      }
    ]
  }
];

exports.Language GrammarSyntax = new TextmateSyntax(repositories, patterns);
