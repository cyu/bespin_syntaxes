"define metadata";
({
    "description": "Lex/Flex syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "l",
            "pointer": "#Lex/FlexSyntax",
            "fileexts": [
  "l"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "regexp": {
    "begin": "\\G(?=\\S)(\\^)?",
    "name": "string.regexp.lex",
    "captures": {
      "1": {
        "name": "keyword.control.anchor.regexp.lex"
      }
    },
    "end": "(\\$)?(?:(?=\\s)|$)",
    "patterns": [
      {
        "include": "#subregexp"
      }
    ]
  },
  "includes": {
    "patterns": [
      {
        "name": "meta.embedded.source.c.lex",
        "begin": "^%\\{$",
        "comment": "TODO: $} should override the embedded scopes",
        "end": "^%\\}$",
        "patterns": [
          {
            "include": "source.c"
          }
        ]
      },
      {
        "name": "meta.embedded.source.c.lex",
        "begin": "^[ \\t]+",
        "comment": "TODO: eol should override the embedded scopes",
        "end": "$",
        "patterns": [
          {
            "include": "source.c"
          }
        ]
      }
    ]
  },
  "subregexp": {
    "patterns": [
      {
        "include": "#re_escape"
      },
      {
        "name": "constant.other.character-class.set.lex",
        "begin": "(\\[)(\\^)?-?",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.character-class.set.lex"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.character-class.set.lex"
          },
          "2": {
            "name": "keyword.operator.negation.regexp.lex"
          }
        },
        "end": "-?(\\])",
        "patterns": [
          {
            "include": "#re_escape"
          },
          {
            "name": "constant.other.character-class.set.lex",
            "captures": {
              "1": {
                "name": "invalid.illegal.regexp.lex"
              }
            },
            "match": "\\[:(?:(?:alnum|alpha|blank|cntrl|x?digit|graph|lower|print|punct|space|upper)|(.*?)):\\]"
          }
        ]
      },
      {
        "name": "variable.other.lex",
        "match": "(?i){[a-z_][a-z0-9_-]*}"
      },
      {
        "name": "keyword.operator.quantifier.regexp.lex",
        "begin": "\\{",
        "end": "\\}",
        "patterns": [
          {
            "match": "(?<=\\{)[0-9]*(?:,[0-9]*)?(?=\\})"
          },
          {
            "name": "invalid.illegal.regexp.lex",
            "comment": "{3} counts should only have digit[,digit]",
            "match": "[^}]"
          }
        ]
      },
      {
        "name": "string.quoted.double.regexp.lex",
        "begin": "\"",
        "end": "\"",
        "patterns": [
          {
            "include": "#re_escape"
          }
        ]
      },
      {
        "begin": "([*+?])(?=[*+?])",
        "comment": "make ** or +? or other combinations illegal",
        "beginCaptures": {
          "1": {
            "name": "keyword.operator.quantifier.regexp.lex"
          }
        },
        "end": "(?=[^*+?])",
        "patterns": [
          {
            "name": "invalid.illegal.regexp.lex",
            "match": "."
          }
        ]
      },
      {
        "name": "keyword.operator.quantifier.regexp.lex",
        "match": "[*+?]"
      },
      {
        "name": "invalid.illegal.regexp.lex",
        "comment": "<<EOF>> is handled in the rule pattern",
        "match": "<<EOF>>"
      },
      {
        "name": "meta.group.regexp.lex",
        "begin": "(\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.group.regexp.lex"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.group.regexp.lex"
          }
        },
        "end": "(\\))|(?=\\s)|$(?#end on whitespace because regex does)",
        "patterns": [
          {
            "name": "invalid.illegal.regexp.lex",
            "match": "/"
          },
          {
            "include": "#subregexp"
          }
        ]
      },
      {
        "begin": "(/)",
        "comment": "detection of multiple trailing contexts",
        "beginCaptures": {
          "1": {
            "name": "keyword.operator.trailing-match.regexp.lex"
          }
        },
        "end": "(?=\\s)|$",
        "patterns": [
          {
            "name": "invalid.illegal.regexp.lex",
            "match": "/|\\$(?!\\S)"
          },
          {
            "include": "#subregexp"
          }
        ]
      }
    ]
  },
  "re_escape": {
    "name": "constant.character.escape.lex",
    "match": "\\\\(?i:[0-9]{1,3}|x[0-9a-f]{1,2}|.)"
  },
  "rec_csource": {
    "begin": "\\{",
    "end": "\\}",
    "patterns": [
      {
        "include": "source.c"
      },
      {
        "include": "#csource"
      }
    ]
  },
  "csource": {
    "patterns": [
      {
        "name": "support.function.c.lex",
        "match": "\\b(?:ECHO|BEGIN|REJECT|YY_FLUSH_BUFFER|YY_BREAK|yy(?:more|less|unput|input|terminate|text|leng|restart|_(?:push|pop|top)_state|_(?:create|switch_to|flush|delete)_buffer|_scan_(?:string|bytes|buffer)|_set_(?:bol|interactive))(?=\\(|$))\\b"
      },
      {
        "include": "source.c"
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.section.definitions.lex",
    "begin": "\\A(?!%%$)",
    "comment": "first section of the file - definitions",
    "end": "^(?=%%$)",
    "patterns": [
      {
        "include": "#includes"
      },
      {
        "name": "comment.block.c.lex",
        "begin": "/\\*",
        "end": "\\*/|$"
      },
      {
        "name": "meta.definition.lex",
        "begin": "^(?i)([a-z_][a-z0-9_-]*)(?=\\s|$)",
        "beginCaptures": {
          "1": {
            "name": "entity.name.function.lex"
          }
        },
        "end": "$",
        "patterns": [
          {
            "include": "#regexp"
          }
        ]
      },
      {
        "name": "meta.start-condition.lex",
        "begin": "^(%[sx])(?=\\s|$)",
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.start-condition.lex"
          }
        },
        "end": "$",
        "patterns": [
          {
            "match": "(?i)[a-z_][a-z0-9_-]*"
          },
          {
            "name": "invalid.illegal.lex",
            "match": "\\S"
          }
        ]
      },
      {
        "name": "meta.options.lex",
        "begin": "^(%option)\\s(?=\\S)",
        "beginCaptures": {
          "1": {
            "name": "keyword.other.option.lex"
          }
        },
        "end": "$",
        "patterns": [
          {
            "name": "support.other.option.lex",
            "match": "\\b(?:(?:no)?(?:[78]bit|align|backup|batch|c\\+\\+|debug|default|ecs|fast|full|interactive|lex-compat|meta-ecs|perf-report|read|stdout|verbose|warn|array|pointer|input|unput|yy_(?:(?:push|pop|top)_state|scan_(?:buffer|bytes|string))|main|stack|stdinit|yylineno|yywrap)|(?:case(?:ful|less)|case-(?:in)?sensitive|(?:always|never)-interactive))\\b"
          }
        ]
      },
      {
        "name": "keyword.other.option.lex",
        "begin": "^%(?:array|pointer)",
        "end": "$",
        "patterns": [
          {
            "name": "invalid.illegal.lex",
            "match": "\\S"
          }
        ]
      }
    ]
  },
  {
    "begin": "^(%%)$",
    "beginCaptures": {
      "1": {
        "name": "punctuation.separator.sections.lex"
      }
    },
    "end": "\\Z.\\A(?# never end)",
    "patterns": [
      {
        "name": "meta.section.rules.lex",
        "begin": "^(?!%%$)",
        "comment": "second section of the file - rules",
        "end": "^(?=%%$)",
        "patterns": [
          {
            "name": "meta.rule.lex",
            "begin": "^(?!$)",
            "end": "$",
            "patterns": [
              {
                "include": "#includes"
              },
              {
                "begin": "(?i)^(<(?:(?:[a-z_][a-z0-9_-]*,)*[a-z_][a-z0-9_-]|\\*)>)?(?:(<<EOF>>)(\\s*))?(?=\\S)",
                "comment": "rule pattern",
                "beginCaptures": {
                  "1": {
                    "name": "keyword.other.start-condition.lex"
                  },
                  "2": {
                    "name": "keyword.operator.eof.lex"
                  },
                  "3": {
                    "name": "invalid.illegal.regexp.lex"
                  }
                },
                "end": "(?=\\s)|$",
                "patterns": [
                  {
                    "include": "#regexp"
                  }
                ]
              },
              {
                "begin": "(%\\{)",
                "comment": "TODO: %} should override embedded scopes",
                "endCaptures": {
                  "1": {
                    "name": "punctuation.terminator.code.lex"
                  },
                  "2": {
                    "name": "invalid.illegal.ignored.lex"
                  }
                },
                "beginCaptures": {
                  "1": {
                    "name": "punctuation.definition.code.lex"
                  }
                },
                "end": "(%\\})(.*)",
                "patterns": [
                  {
                    "include": "#csource"
                  }
                ]
              },
              {
                "name": "meta.rule.action.lex",
                "begin": "(?=\\S)",
                "comment": "TODO: eol should override embedded scopes",
                "end": "$",
                "patterns": [
                  {
                    "include": "#csource"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "begin": "^(%%)$",
        "comment": "third section of the file - user code",
        "beginCaptures": {
          "1": {
            "name": "punctuation.separator.sections.lex"
          }
        },
        "end": "\\Z.\\A(?# never end)",
        "contentName": "meta.section.user-code.lex",
        "patterns": [
          {
            "include": "#csource"
          }
        ]
      }
    ]
  }
];

exports.Lex/FlexSyntax = new TextmateSyntax(repositories, patterns);
