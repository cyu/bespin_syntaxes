"define metadata";
({
    "description": "Ruby syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "rb",
            "pointer": "#RubySyntax",
            "fileexts": [
  "rb",
  "rbx",
  "rjs",
  "Rakefile",
  "rake",
  "cgi",
  "fcgi",
  "gemspec"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "nest_brackets": {
    "begin": "\\[",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#nest_brackets"
      }
    ]
  },
  "interpolated_ruby": {
    "patterns": [
      {
        "name": "source.ruby.embedded.source",
        "captures": {
          "0": {
            "name": "punctuation.section.embedded.ruby"
          },
          "1": {
            "name": "source.ruby.embedded.source.empty"
          }
        },
        "match": "#\\{(\\})"
      },
      {
        "name": "source.ruby.embedded.source",
        "begin": "#\\{",
        "captures": {
          "0": {
            "name": "punctuation.section.embedded.ruby"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "#nest_curly_and_self"
          },
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "variable.other.readwrite.instance.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.ruby"
          }
        },
        "match": "(#@)[a-zA-Z_]\\w*"
      },
      {
        "name": "variable.other.readwrite.class.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.ruby"
          }
        },
        "match": "(#@@)[a-zA-Z_]\\w*"
      },
      {
        "name": "variable.other.readwrite.global.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.ruby"
          }
        },
        "match": "(#\\$)[a-zA-Z_]\\w*"
      }
    ]
  },
  "nest_curly_r": {
    "begin": "\\{",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#regex_sub"
      },
      {
        "include": "#nest_curly_r"
      }
    ]
  },
  "nest_parens_r": {
    "begin": "\\(",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#regex_sub"
      },
      {
        "include": "#nest_parens_r"
      }
    ]
  },
  "nest_curly_and_self": {
    "patterns": [
      {
        "begin": "\\{",
        "captures": {
          "0": {
            "name": "punctuation.section.scope.ruby"
          }
        },
        "end": "\\}",
        "patterns": [
          {
            "include": "#nest_curly_and_self"
          }
        ]
      },
      {
        "include": "$self"
      }
    ]
  },
  "nest_parens_i": {
    "begin": "\\(",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_parens_i"
      }
    ]
  },
  "nest_curly_i": {
    "begin": "\\{",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_curly_i"
      }
    ]
  },
  "nest_ltgt_r": {
    "begin": "\\<",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#regex_sub"
      },
      {
        "include": "#nest_ltgt_r"
      }
    ]
  },
  "nest_brackets_r": {
    "begin": "\\[",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#regex_sub"
      },
      {
        "include": "#nest_brackets_r"
      }
    ]
  },
  "nest_parens": {
    "begin": "\\(",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#nest_parens"
      }
    ]
  },
  "nest_brackets_i": {
    "begin": "\\[",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_brackets_i"
      }
    ]
  },
  "nest_ltgt": {
    "begin": "\\<",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#nest_ltgt"
      }
    ]
  },
  "nest_ltgt_i": {
    "begin": "\\<",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_ltgt_i"
      }
    ]
  },
  "escaped_char": {
    "name": "constant.character.escape.ruby",
    "match": "\\\\(?:0\\d{1,2}|x[\\da-fA-F]{1,2}|.)"
  },
  "nest_curly": {
    "begin": "\\{",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.ruby"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#nest_curly"
      }
    ]
  },
  "heredoc": {
    "begin": "^<<-?\\w+",
    "end": "$",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  "regex_sub": {
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "name": "string.regexp.arbitrary-repitition.ruby",
        "captures": {
          "1": {
            "name": "punctuation.definition.arbitrary-repitition.ruby"
          },
          "3": {
            "name": "punctuation.definition.arbitrary-repitition.ruby"
          }
        },
        "match": "(\\{)\\d+(,\\d+)?(\\})"
      },
      {
        "name": "string.regexp.character-class.ruby",
        "begin": "\\[(?:\\^?\\])?",
        "captures": {
          "0": {
            "name": "punctuation.definition.character-class.ruby"
          }
        },
        "end": "\\]",
        "patterns": [
          {
            "include": "#escaped_char"
          }
        ]
      },
      {
        "name": "string.regexp.group.ruby",
        "begin": "\\(",
        "captures": {
          "0": {
            "name": "punctuation.definition.group.ruby"
          }
        },
        "end": "\\)",
        "patterns": [
          {
            "include": "#regex_sub"
          }
        ]
      },
      {
        "name": "comment.line.number-sign.ruby",
        "comment": "We are restrictive in what we allow to go after the comment character to avoid false positives, since the availability of comments depend on regexp flags.",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.ruby"
          }
        },
        "match": "(?<=^|\\s)(#)\\s[[a-zA-Z0-9,. \\t?!-][^\\x00-\\x7F]]*$"
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.class.ruby",
    "captures": {
      "6": {
        "name": "variable.other.object.ruby"
      },
      "7": {
        "name": "punctuation.definition.variable.ruby"
      },
      "1": {
        "name": "keyword.control.class.ruby"
      },
      "2": {
        "name": "entity.name.type.class.ruby"
      },
      "4": {
        "name": "entity.other.inherited-class.ruby"
      },
      "5": {
        "name": "punctuation.separator.inheritance.ruby"
      }
    },
    "match": "^\\s*(class)\\s+(([.a-zA-Z0-9_:]+(\\s*(<)\\s*[.a-zA-Z0-9_:]+)?)|((<<)\\s*[.a-zA-Z0-9_:]+))"
  },
  {
    "name": "meta.module.ruby",
    "captures": {
      "6": {
        "name": "punctuation.separator.inheritance.ruby"
      },
      "7": {
        "name": "entity.other.inherited-class.module.third.ruby"
      },
      "8": {
        "name": "punctuation.separator.inheritance.ruby"
      },
      "1": {
        "name": "keyword.control.module.ruby"
      },
      "2": {
        "name": "entity.name.type.module.ruby"
      },
      "3": {
        "name": "entity.other.inherited-class.module.first.ruby"
      },
      "4": {
        "name": "punctuation.separator.inheritance.ruby"
      },
      "5": {
        "name": "entity.other.inherited-class.module.second.ruby"
      }
    },
    "match": "^\\s*(module)\\s+(([A-Z]\\w*(::))?([A-Z]\\w*(::))?([A-Z]\\w*(::))*[A-Z]\\w*)"
  },
  {
    "name": "invalid.deprecated.ruby",
    "comment": "else if is a common mistake carried over from other languages. it works if you put in a second end, but it’s never what you want.",
    "match": "(?<!\\.)\\belse(\\s)+if\\b"
  },
  {
    "name": "keyword.control.ruby",
    "comment": "everything being a reserved word, not a value and needing a 'end' is a..",
    "match": "(?<!\\.)\\b(BEGIN|begin|case|class|else|elsif|END|end|ensure|for|if|in|module|rescue|then|unless|until|when|while)\\b(?![?!])"
  },
  {
    "name": "keyword.control.ruby.start-block",
    "comment": "contextual smart pair support for block parameters",
    "match": "(?<!\\.)\\bdo\\b\\s*"
  },
  {
    "name": "meta.syntax.ruby.start-block",
    "comment": "contextual smart pair support",
    "match": "(?<=\\{)(\\s+)"
  },
  {
    "name": "keyword.operator.logical.ruby",
    "comment": " as above, just doesn't need a 'end' and does a logic operation",
    "match": "(?<!\\.)\\b(and|not|or)\\b"
  },
  {
    "name": "keyword.control.pseudo-method.ruby",
    "comment": " just as above but being not a logical operation",
    "match": "(?<!\\.)\\b(alias|alias_method|break|next|redo|retry|return|super|undef|yield)\\b(?![?!])|\\bdefined\\?|\\bblock_given\\?"
  },
  {
    "name": "constant.language.ruby",
    "match": "\\b(nil|true|false)\\b(?![?!])"
  },
  {
    "name": "variable.language.ruby",
    "match": "\\b(__(FILE|LINE)__|self)\\b(?![?!])"
  },
  {
    "name": "keyword.other.special-method.ruby",
    "comment": " everything being a method but having a special function is a..",
    "match": "\\b(initialize|new|loop|include|extend|raise|attr_reader|attr_writer|attr_accessor|attr|catch|throw|private|module_function|public|protected)\\b(?![?!])"
  },
  {
    "name": "meta.require.ruby",
    "begin": "\\b(require)\\b",
    "captures": {
      "1": {
        "name": "keyword.other.special-method.ruby"
      }
    },
    "end": "$|(?=#)",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "variable.other.readwrite.instance.ruby",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.ruby"
      }
    },
    "match": "(@)[a-zA-Z_]\\w*"
  },
  {
    "name": "variable.other.readwrite.class.ruby",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.ruby"
      }
    },
    "match": "(@@)[a-zA-Z_]\\w*"
  },
  {
    "name": "variable.other.readwrite.global.ruby",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.ruby"
      }
    },
    "match": "(\\$)[a-zA-Z_]\\w*"
  },
  {
    "name": "variable.other.readwrite.global.pre-defined.ruby",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.ruby"
      }
    },
    "match": "(\\$)(!|@|&|`|'|\\+|\\d|~|=|/|\\\\|,|;|\\.|<|>|_|\\*|\\$|\\?|:|\"|-[0adFiIlpv])"
  },
  {
    "name": "support.class.ruby",
    "match": "\\b[A-Z][a-z]\\w*(?=((\\.|::)[A-Za-z]|\\[))"
  },
  {
    "name": "meta.environment-variable.ruby",
    "begin": "\\b(ENV)\\[",
    "beginCaptures": {
      "1": {
        "name": "variable.other.constant.ruby"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "variable.other.constant.ruby",
    "match": "\\b[A-Z]\\w*\\b"
  },
  {
    "name": "meta.function.method.with-arguments.ruby",
    "begin": "(?<=^|\\s)\\b(def)\\b\\s+((?>[a-zA-Z_]\\w*(?>\\.|::))?(?>[a-zA-Z_]\\w*(?>[?!]|=(?!>))?|===?|>[>=]?|<=>|<[<=]?|[%&`/\\|]|\\*\\*?|=?~|[-+]@?|\\[\\]=?))\\s*(\\()",
    "comment": " the method pattern comes from the symbol pattern, see there for a explaination",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.parameters.ruby"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.def.ruby"
      },
      "2": {
        "name": "entity.name.function.ruby"
      },
      "3": {
        "name": "punctuation.definition.parameters.ruby"
      }
    },
    "end": "\\)",
    "contentName": "variable.parameter.function.ruby",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.function.method.without-arguments.ruby",
    "comment": " the optional name is just to catch the def also without a method-name",
    "captures": {
      "1": {
        "name": "keyword.control.def.ruby"
      },
      "3": {
        "name": "entity.name.function.ruby"
      }
    },
    "match": "(?<=^|\\s)(def)\\b(\\s+((?>[a-zA-Z_]\\w*(?>\\.|::))?(?>[a-zA-Z_]\\w*(?>[?!]|=(?!>))?|===?|>[>=]?|<=>|<[<=]?|[%&`/\\|]|\\*\\*?|=?~|[-+]@?|\\[\\]=?)))?"
  },
  {
    "name": "constant.numeric.ruby",
    "match": "\\b(0[xX]\\h(?>_?\\h)*|\\d(?>_?\\d)*(\\.(?![^[:space:][:digit:]])(?>_?\\d)*)?([eE][-+]?\\d(?>_?\\d)*)?|0[bB][01]+)\\b"
  },
  {
    "name": "constant.other.symbol.single-quoted.ruby",
    "begin": ":'",
    "captures": {
      "0": {
        "name": "punctuation.definition.constant.ruby"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.ruby",
        "match": "\\\\['\\\\]"
      }
    ]
  },
  {
    "name": "constant.other.symbol.double-quoted.ruby",
    "begin": ":\"",
    "captures": {
      "0": {
        "name": "punctuation.definition.constant.ruby"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.quoted.single.ruby",
    "begin": "'",
    "comment": "single quoted string (does not allow interpolation)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.ruby",
        "match": "\\\\'|\\\\\\\\"
      }
    ]
  },
  {
    "name": "string.quoted.double.ruby",
    "begin": "\"",
    "comment": "double quoted string (allows for interpolation)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.interpolated.ruby",
    "begin": "`",
    "comment": "execute string (allows for interpolation)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "`",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.interpolated.ruby",
    "begin": "%x\\{",
    "comment": "execute string (allow for interpolation)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_curly_i"
      }
    ]
  },
  {
    "name": "string.interpolated.ruby",
    "begin": "%x\\[",
    "comment": "execute string (allow for interpolation)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_brackets_i"
      }
    ]
  },
  {
    "name": "string.interpolated.ruby",
    "begin": "%x\\<",
    "comment": "execute string (allow for interpolation)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_ltgt_i"
      }
    ]
  },
  {
    "name": "string.interpolated.ruby",
    "begin": "%x\\(",
    "comment": "execute string (allow for interpolation)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_parens_i"
      }
    ]
  },
  {
    "name": "string.interpolated.ruby",
    "begin": "%x([^\\w])",
    "comment": "execute string (allow for interpolation)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\1",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "begin": "(?x)\n\t\t\t   (?:\n\t\t\t     ^                      # beginning of line\n\t\t\t   | (?<=                   # or look-behind on:\n\t\t\t       [=>~(?:\\[,|&]\n\t\t\t     | (?:\\s|;)when\\s\n\t\t\t     | (?:\\s|;)or\\s\n\t\t\t     | (?:\\s|;)and\\s\n\t\t\t     | (?:\\s|;|\\.)index\\s\n\t\t\t     | (?:\\s|;|\\.)scan\\s\n\t\t\t     | (?:\\s|;|\\.)sub\\s\n\t\t\t     | (?:\\s|l|\\.)sub!\\s\n\t\t\t     | (?:\\s|;|\\.)gsub\\s\n\t\t\t     | (?:\\s|;|\\.)gsub!\\s\n\t\t\t     | (?:\\s|;|\\.)match\\s\n\t\t\t     | (?:\\s|;)if\\s\n\t\t\t     | (?:\\s|;)elsif\\s\n\t\t\t     | (?:\\s|;)while\\s\n\t\t\t     | (?:\\s|;)unless\\s\n\t\t\t     )\n\t\t\t   | (?<=                  # or a look-behind with line anchor:\n\t\t\t        ^when\\s              # duplication necessary due to limits of regex\n\t\t\t      | ^index\\s\n\t\t\t      | ^scan\\s\n\t\t\t      | ^sub\\s\n\t\t\t      | ^gsub\\s\n\t\t\t      | ^sub!\\s\n\t\t\t      | ^gsub!\\s\n\t\t\t      | ^match\\s\n\t\t\t      | ^if\\s\n\t\t\t      | ^elsif\\s\n\t\t\t      | ^while\\s\n\t\t\t      | ^unless\\s\n\t\t\t      )\n\t\t\t   )\n\t\t\t   \\s*((/))(?![*+{}?])\n\t\t\t",
    "comment": "regular expressions (normal)\n\t\t\twe only start a regexp if the character before it (excluding whitespace)\n\t\t\tis what we think is before a regexp\n\t\t\t",
    "captures": {
      "1": {
        "name": "string.regexp.classic.ruby"
      },
      "2": {
        "name": "punctuation.definition.string.ruby"
      }
    },
    "end": "((/[eimnosux]*))",
    "contentName": "string.regexp.classic.ruby",
    "patterns": [
      {
        "include": "#regex_sub"
      }
    ]
  },
  {
    "name": "string.regexp.mod-r.ruby",
    "begin": "%r\\{",
    "comment": "regular expressions (literal)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\}[eimnosux]*",
    "patterns": [
      {
        "include": "#regex_sub"
      },
      {
        "include": "#nest_curly_r"
      }
    ]
  },
  {
    "name": "string.regexp.mod-r.ruby",
    "begin": "%r\\[",
    "comment": "regular expressions (literal)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\][eimnosux]*",
    "patterns": [
      {
        "include": "#regex_sub"
      },
      {
        "include": "#nest_brackets_r"
      }
    ]
  },
  {
    "name": "string.regexp.mod-r.ruby",
    "begin": "%r\\(",
    "comment": "regular expressions (literal)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\)[eimnosux]*",
    "patterns": [
      {
        "include": "#regex_sub"
      },
      {
        "include": "#nest_parens_r"
      }
    ]
  },
  {
    "name": "string.regexp.mod-r.ruby",
    "begin": "%r\\<",
    "comment": "regular expressions (literal)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\>[eimnosux]*",
    "patterns": [
      {
        "include": "#regex_sub"
      },
      {
        "include": "#nest_ltgt_r"
      }
    ]
  },
  {
    "name": "string.regexp.mod-r.ruby",
    "begin": "%r([^\\w])",
    "comment": "regular expressions (literal)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\1[eimnosux]*",
    "patterns": [
      {
        "include": "#regex_sub"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.upper.ruby",
    "begin": "%[QWSR]?\\(",
    "comment": "literal capable of interpolation ()",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_parens_i"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.upper.ruby",
    "begin": "%[QWSR]?\\[",
    "comment": "literal capable of interpolation []",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_brackets_i"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.upper.ruby",
    "begin": "%[QWSR]?\\<",
    "comment": "literal capable of interpolation <>",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_ltgt_i"
      }
    ]
  },
  {
    "name": "string.quoted.double.ruby.mod",
    "begin": "%[QWSR]?\\{",
    "comment": "literal capable of interpolation -- {}",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      },
      {
        "include": "#nest_curly_i"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.upper.ruby",
    "begin": "%[QWSR]([^\\w])",
    "comment": "literal capable of interpolation -- wildcard",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\1",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.other.ruby",
    "begin": "%([^\\w\\s=])",
    "comment": "literal capable of interpolation -- wildcard",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\1",
    "patterns": [
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.lower.ruby",
    "begin": "%[qws]\\(",
    "comment": "literal incapable of interpolation -- ()",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "name": "constant.character.escape.ruby",
        "match": "\\\\\\)|\\\\\\\\"
      },
      {
        "include": "#nest_parens"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.lower.ruby",
    "begin": "%[qws]\\<",
    "comment": "literal incapable of interpolation -- <>",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\>",
    "patterns": [
      {
        "name": "constant.character.escape.ruby",
        "match": "\\\\\\>|\\\\\\\\"
      },
      {
        "include": "#nest_ltgt"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.lower.ruby",
    "begin": "%[qws]\\[",
    "comment": "literal incapable of interpolation -- []",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "name": "constant.character.escape.ruby",
        "match": "\\\\\\]|\\\\\\\\"
      },
      {
        "include": "#nest_brackets"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.lower.ruby",
    "begin": "%[qws]\\{",
    "comment": "literal incapable of interpolation -- {}",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "name": "constant.character.escape.ruby",
        "match": "\\\\\\}|\\\\\\\\"
      },
      {
        "include": "#nest_curly"
      }
    ]
  },
  {
    "name": "string.quoted.other.literal.lower.ruby",
    "begin": "%[qws]([^\\w])",
    "comment": "literal incapable of interpolation -- wildcard",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\1",
    "patterns": [
      {
        "comment": "Cant be named because its not neccesarily an escape.",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "constant.other.symbol.ruby",
    "comment": "symbols",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.ruby"
      }
    },
    "match": "(?<!:)(:)(?>[a-zA-Z_]\\w*(?>[?!]|=(?![>=]))?|===?|>[>=]?|<[<=]?|<=>|[%&`/\\|]|\\*\\*?|=?~|[-+]@?|\\[\\]=?|@@?[a-zA-Z_]\\w*)"
  },
  {
    "name": "comment.block.documentation.ruby",
    "begin": "^=begin",
    "comment": "multiline comments",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.ruby"
      }
    },
    "end": "^=end"
  },
  {
    "name": "comment.line.number-sign.ruby",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.ruby"
      }
    },
    "match": "(?:^[ \\t]+)?(#).*$\\n?"
  },
  {
    "name": "constant.numeric.ruby",
    "comment": "\n\t\t\tmatches questionmark-letters.\n\n\t\t\texamples (1st alternation = hex):\n\t\t\t?\\x1     ?\\x61\n\n\t\t\texamples (2nd alternation = octal):\n\t\t\t?\\0      ?\\07     ?\\017\n\n\t\t\texamples (3rd alternation = escaped):\n\t\t\t?\\n      ?\\b\n\n\t\t\texamples (4th alternation = meta-ctrl):\n\t\t\t?\\C-a    ?\\M-a    ?\\C-\\M-\\C-\\M-a\n\n\t\t\texamples (4th alternation = normal):\n\t\t\t?a       ?A       ?0 \n\t\t\t?*       ?\"       ?( \n\t\t\t?.       ?#\n\t\t\t\n\t\t\t\n\t\t\tthe negative lookbehind prevents against matching\n\t\t\tp(42.tainted?)\n\t\t\t",
    "match": "(?<!\\w)\\?(\\\\(x\\h{1,2}(?!\\h)\\b|0[0-7]{0,2}(?![0-7])\\b|[^x0MC])|(\\\\[MC]-)+\\w|[^\\s\\\\])"
  },
  {
    "begin": "^__END__\\n",
    "comment": "__END__ marker",
    "captures": {
      "0": {
        "name": "string.unquoted.program-block.ruby"
      }
    },
    "end": "(?=not)impossible",
    "contentName": "text.plain",
    "patterns": [
      {
        "name": "text.html.embedded.ruby",
        "begin": "(?=<?xml|<(?i:html\\b)|!DOCTYPE (?i:html\\b))",
        "end": "(?=not)impossible",
        "patterns": [
          {
            "include": "text.html.basic"
          }
        ]
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.ruby",
    "begin": "(?>\\=\\s*<<(\\w+))(?!\\s+#\\s*([Cc]|sh|[Jj]ava))",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "^\\1$",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.unquoted.embedded.html.ruby",
    "begin": "(?><<-HTML\\b)",
    "comment": "heredoc with embedded HTML and indented terminator",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\s*HTML$",
    "contentName": "text.html.embedded.ruby",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "text.html.basic"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.unquoted.embedded.ruby.ruby",
    "begin": "(?><<-([\"\\\\']?)(\\w+_(?i:eval))\\1)",
    "comment": "ruby code in heredoc, interpolated",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\s*\\2$",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "source.ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.ruby",
    "begin": "(?><<-(\\w+))",
    "comment": "heredoc with indented terminator",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "\\s*\\1$",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.unquoted.embedded.c.ruby",
    "begin": "(?>\\=\\s*<<(\\w+))(?=\\s+#\\s*[Cc](?!(\\+\\+|[Ss][Ss])))",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "^\\1$",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "source.c"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.unquoted.embedded.cplusplus.ruby",
    "begin": "(?>\\=\\s*<<(\\w+))(?=\\s+#\\s*[Cc]\\+\\+)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "^\\1$",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "source.c++"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.unquoted.embedded.css.ruby",
    "begin": "(?>\\=\\s*<<(\\w+))(?=\\s+#\\s*[Cc][Ss][Ss])",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "^\\1$",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "source.css"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.unquoted.embedded.js.ruby",
    "begin": "(?>\\=\\s*<<(\\w+))(?=\\s+#\\s*[Jj]ava[Ss]cript)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "^\\1$",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "source.js"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "string.unquoted.embedded.shell.ruby",
    "begin": "(?>\\=\\s*<<(\\w+))(?=\\s+#\\s*sh)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.ruby"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.ruby"
      }
    },
    "end": "^\\1$",
    "patterns": [
      {
        "include": "#heredoc"
      },
      {
        "include": "source.shell"
      },
      {
        "include": "#interpolated_ruby"
      },
      {
        "include": "#escaped_char"
      }
    ]
  },
  {
    "name": "meta.function-call.method.with-arguments.ruby",
    "begin": "(?<=[^\\.])(?=(\\.|::)[a-zA-Z][a-zA-Z0-9_!?=]*\\()(\\.|::)",
    "beginCaptures": {
      "1": {
        "name": "punctuation.separator.method.ruby"
      }
    },
    "end": "(?<=[a-zA-Z0-9_!?=])(?=\\()",
    "patterns": [
      {
        "comment": "made this way to eventually support including #known_function_names"
      },
      {
        "name": "entity.name.function.ruby",
        "match": "([a-zA-Z][a-zA-Z0-9_!?=]*)(?=[^a-zA-Z0-9_!?])"
      }
    ]
  },
  {
    "name": "meta.function-call.method.without-arguments.ruby",
    "begin": "(?<=[^\\.])(?=(\\.|::)[a-zA-Z][a-zA-Z0-9_!?]*[^a-zA-Z0-9_!?])(\\.|::)",
    "beginCaptures": {
      "1": {
        "name": "punctuation.separator.method.ruby"
      }
    },
    "end": "(?<=[a-zA-Z0-9_!?])(?=[^a-zA-Z0-9_!?])",
    "patterns": [
      {
        "comment": "made this way to eventually support including #known_function_names"
      },
      {
        "name": "entity.name.function.ruby",
        "match": "([a-zA-Z][a-zA-Z0-9_!?]*)(?=[^a-zA-Z0-9_!?])"
      }
    ]
  },
  {
    "name": "meta.function-call.ruby",
    "begin": "(?=[a-zA-Z][a-zA-Z0-9_!?]+\\()",
    "end": "(?=\\()",
    "patterns": [
      {
        "comment": "eventually include #known_function_names"
      },
      {
        "name": "entity.name.function.ruby",
        "match": "([a-zA-Z0-9_!?]+)(?=\\()"
      }
    ]
  },
  {
    "begin": "(?<=\\{|do|\\{\\s|do\\s)(\\|)",
    "captures": {
      "1": {
        "name": "punctuation.separator.variable.ruby"
      }
    },
    "end": "(\\|)",
    "patterns": [
      {
        "name": "variable.other.block.ruby",
        "match": "[_a-zA-Z][_a-zA-Z0-9]*"
      },
      {
        "name": "punctuation.separator.variable.ruby",
        "match": ","
      }
    ]
  },
  {
    "name": "punctuation.separator.key-value",
    "match": "=>"
  },
  {
    "name": "keyword.operator.unary.ruby",
    "match": "\\+@|-@"
  },
  {
    "name": "keyword.operator.assignment.augmented.ruby",
    "match": "<<=|%=|&=|\\*=|\\*\\*=|\\+=|\\-=|\\^=|\\|{1,2}=|/=|<<"
  },
  {
    "name": "keyword.operator.comparison.ruby",
    "match": "<=>|<(?!<|=)|>(?!<|=|>)|<=|>=|===|==|=~|!=|!~|(?<=[ \\t])\\?"
  },
  {
    "name": "keyword.operator.logical.ruby",
    "match": "(?<=[ \\t])!|\\bnot\\b|&&|\\band\\b|\\|\\||\\bor\\b|\\^"
  },
  {
    "name": "keyword.operator.arithmetic.ruby",
    "match": "(%|&|\\*\\*|\\*|\\+|\\-|/)"
  },
  {
    "name": "keyword.operator.assignment.ruby",
    "match": "="
  },
  {
    "name": "keyword.operator.other.ruby",
    "match": "\\||~|>>"
  },
  {
    "name": "punctuation.separator.other.ruby",
    "match": ":"
  },
  {
    "name": "punctuation.separator.statement.ruby",
    "match": "\\;"
  },
  {
    "name": "punctuation.separator.object.ruby",
    "match": ","
  },
  {
    "name": "punctuation.separator.method.ruby",
    "match": "\\.|::"
  },
  {
    "name": "punctuation.section.scope.ruby",
    "match": "\\{|\\}"
  },
  {
    "name": "punctuation.section.array.ruby",
    "match": "\\[|\\]"
  },
  {
    "name": "punctuation.section.function.ruby",
    "match": "\\(|\\)"
  }
];

exports.RubySyntax = new TextmateSyntax(repositories, patterns);
