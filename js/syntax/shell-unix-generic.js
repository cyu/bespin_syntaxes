"define metadata";
({
    "description": "Shell Script (Bash) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "sh",
            "pointer": "#Shell Script (Bash)Syntax",
            "fileexts": [
  "sh",
  "ss",
  "bashrc",
  "bash_profile",
  "bash_login",
  "profile",
  "bash_logout"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "interpolation": {
    "patterns": [
      {
        "name": "string.interpolated.backtick.shell",
        "begin": "`",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.shell"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.shell"
          }
        },
        "end": "`",
        "patterns": [
          {
            "name": "constant.character.escape.shell",
            "match": "\\\\[`\\\\$]"
          }
        ]
      },
      {
        "name": "string.interpolated.dollar.shell",
        "begin": "\\$\\(",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.shell"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.shell"
          }
        },
        "end": "\\)",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  "variable": {
    "patterns": [
      {
        "name": "variable.other.special.shell",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.shell"
          }
        },
        "match": "(\\$)[-*@#?$!0_]"
      },
      {
        "name": "variable.other.positional.shell",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.shell"
          }
        },
        "match": "(\\$)[1-9]"
      },
      {
        "name": "variable.other.normal.shell",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.shell"
          }
        },
        "match": "(\\$)[a-zA-Z_][a-zA-Z0-9_]*"
      },
      {
        "name": "variable.other.bracket.shell",
        "begin": "\\$\\{",
        "captures": {
          "0": {
            "name": "punctuation.definition.variable.shell"
          }
        },
        "end": "\\}"
      }
    ]
  }
};

var patterns = [
  {
    "name": "support.function.shell",
    "match": "\\b(time)\\b"
  },
  {
    "name": "keyword.operator.list.shell",
    "match": ";|&&|&|\\|\\|"
  },
  {
    "name": "keyword.operator.pipe.shell",
    "match": "[|!]"
  },
  {
    "name": "meta.scope.logical-expression.shell",
    "begin": "(\\[{2})",
    "captures": {
      "1": {
        "name": "punctuation.definition.logical-expression.shell"
      }
    },
    "end": "(\\]{2})",
    "patterns": [
      {
        "name": "keyword.operator.logical.shell",
        "comment": "do we want a special rule for ( expr )?",
        "match": "==|!=|&&|!|\\|\\|"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.scope.expression.shell",
    "begin": "(\\({2})",
    "captures": {
      "1": {
        "name": "punctuation.definition.expression.shell"
      }
    },
    "end": "(\\){2})",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.scope.subshell.shell",
    "begin": "(\\()",
    "captures": {
      "1": {
        "name": "punctuation.definition.subshell.shell"
      }
    },
    "end": "(\\))",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.scope.group.shell",
    "begin": "(?<=\\s|^)(\\{)(?=\\s|$)",
    "captures": {
      "1": {
        "name": "punctuation.definition.group.shell"
      }
    },
    "end": "(?<=^|;)\\s*(\\})",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "constant.character.escape.shell",
    "match": "\\\\."
  },
  {
    "name": "string.quoted.single.shell",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.shell"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.shell"
      }
    },
    "end": "'"
  },
  {
    "name": "string.quoted.double.shell",
    "begin": "\\$?\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.shell"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.shell"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.shell",
        "match": "\\\\[\\$`\"\\\\\\n]"
      },
      {
        "include": "#variable"
      },
      {
        "include": "#interpolation"
      }
    ]
  },
  {
    "name": "string.quoted.single.dollar.shell",
    "begin": "\\$'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.shell"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.shell"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.ansi-c.shell",
        "match": "\\\\(a|b|e|f|n|r|t|v|\\\\|')"
      },
      {
        "name": "constant.character.escape.octal.shell",
        "match": "\\\\[0-9]{3}"
      },
      {
        "name": "constant.character.escape.hex.shell",
        "match": "\\\\x[0-9a-fA-F]{2}"
      },
      {
        "name": "constant.character.escape.control-char.shell",
        "match": "\\\\c."
      }
    ]
  },
  {
    "name": "keyword.operator.tilde.shell",
    "match": "(?<=\\s|:|=|^)~"
  },
  {
    "include": "#variable"
  },
  {
    "include": "#interpolation"
  },
  {
    "name": "string.other.math.shell",
    "begin": "\\$\\({2}",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.shell"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.shell"
      }
    },
    "end": "\\){2}"
  },
  {
    "name": "string.interpolated.process-substitution.shell",
    "begin": "[><]\\(",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.shell"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.shell"
      }
    },
    "end": "\\)"
  },
  {
    "name": "string.unquoted.heredoc.no-indent.ruby.shell",
    "begin": "(<<)-(\"|'|)(RUBY)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^\\t*(RUBY)$",
    "contentName": "source.ruby.embedded.shell",
    "patterns": [
      {
        "include": "source.ruby"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.ruby.shell",
    "begin": "(<<)(\"|'|)(RUBY)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^(RUBY)$",
    "contentName": "source.ruby.embedded.shell",
    "patterns": [
      {
        "include": "source.ruby"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.no-indent.applescript.shell",
    "begin": "(<<)-(\"|'|)(APPLESCRIPT)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^\\t*(APPLESCRIPT)$",
    "contentName": "source.applescript.embedded.shell",
    "patterns": [
      {
        "include": "source.applescript"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.applescript.shell",
    "begin": "(<<)(\"|'|)(APPLESCRIPT)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^(APPLESCRIPT)$",
    "contentName": "source.applescript.embedded.shell",
    "patterns": [
      {
        "include": "source.applescript"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.no-indent.html.shell",
    "begin": "(<<)-(\"|'|)(HTML)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^\\t*(HTML)$",
    "contentName": "text.html.embedded.shell",
    "patterns": [
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.html.shell",
    "begin": "(<<)(\"|'|)(HTML)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^(HTML)$",
    "contentName": "text.html.embedded.shell",
    "patterns": [
      {
        "include": "text.html.basic"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.no-indent.markdown.shell",
    "begin": "(<<)-(\"|'|)(MARKDOWN)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^\\t*(MARKDOWN)$",
    "contentName": "text.html.markdown.embedded.shell",
    "patterns": [
      {
        "include": "text.html.markdown"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.markdown.shell",
    "begin": "(<<)(\"|'|)(MARKDOWN)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^(MARKDOWN)$",
    "contentName": "text.html.markdown.embedded.shell",
    "patterns": [
      {
        "include": "text.html.markdown"
      }
    ]
  },
  {
    "name": "string.unquoted.heredoc.no-indent.shell",
    "begin": "(<<)-(\"|'|)\\\\?(\\w+)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^\\t*(\\3)$"
  },
  {
    "name": "string.unquoted.heredoc.shell",
    "begin": "(<<)(\"|'|)\\\\?(\\w+)\\2",
    "endCaptures": {
      "1": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "captures": {
      "0": {
        "name": "punctuation.definition.string.shell"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.heredoc.shell"
      },
      "3": {
        "name": "keyword.control.heredoc-token.shell"
      }
    },
    "end": "^(\\3)$"
  },
  {
    "name": "meta.herestring.shell",
    "captures": {
      "1": {
        "name": "keyword.operator.herestring.shell"
      },
      "2": {
        "name": "string.quoted.single.herestring.shell"
      },
      "3": {
        "name": "punctuation.definition.string.begin.shell"
      },
      "4": {
        "name": "punctuation.definition.string.end.shell"
      }
    },
    "match": "(<<<)((')[^']*('))"
  },
  {
    "name": "meta.herestring.shell",
    "captures": {
      "6": {
        "name": "punctuation.definition.string.end.shell"
      },
      "1": {
        "name": "keyword.operator.herestring.shell"
      },
      "2": {
        "name": "string.quoted.double.herestring.shell"
      },
      "3": {
        "name": "punctuation.definition.string.begin.shell"
      }
    },
    "match": "(<<<)((\")(\\\\(\"|\\\\)|[^\"])*(\"))"
  },
  {
    "name": "meta.herestring.shell",
    "captures": {
      "1": {
        "name": "keyword.operator.herestring.shell"
      },
      "2": {
        "name": "string.unquoted.herestring.shell"
      }
    },
    "match": "(<<<)(([^\\s\\\\]|\\\\.)+)"
  },
  {
    "name": "keyword.operator.redirect.shell",
    "comment": "valid: &>word >&word >word [n]>&[n] [n]<word [n]>word [n]>>word [n]<&word (last one is duplicate)",
    "match": "&>|\\d*>&\\d*|\\d*(>>|>|<)|\\d*<&|\\d*<>"
  },
  {
    "name": "comment.line.number-sign.shell",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.shell"
      }
    },
    "match": "(?<!\\$)(#)(?!\\{).*$\\n?"
  },
  {
    "name": "meta.function.shell",
    "captures": {
      "1": {
        "name": "entity.name.function.shell"
      },
      "2": {
        "name": "punctuation.definition.arguments.shell"
      }
    },
    "match": "\\b([^ \\t\\n]*)\\s*(\\(\\))"
  },
  {
    "name": "keyword.control.shell",
    "match": "\\b(?:if|then|else|elif|fi|for|in|do|done|select|case|continue|esac|while|until)\\b"
  },
  {
    "name": "storage.modifier.shell",
    "match": "\\b(?:export)\\b"
  }
];

exports.Shell Script (Bash)Syntax = new TextmateSyntax(repositories, patterns);
