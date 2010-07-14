"define metadata";
({
    "description": "LaTeX syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "tex",
            "pointer": "#LaTeXSyntax",
            "fileexts": [
  "tex"
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
    "name": "meta.space-after-command.latex",
    "match": "(?=\\s)(?<=\\\\[\\w@]|\\\\[\\w@]{2}|\\\\[\\w@]{3}|\\\\[\\w@]{4}|\\\\[\\w@]{5}|\\\\[\\w@]{6})\\s"
  },
  {
    "name": "meta.preamble.latex",
    "begin": "((\\\\)(?:usepackage|documentclass))(?:(\\[)([^\\]]*)(\\]))?(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "beginCaptures": {
      "6": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "1": {
        "name": "keyword.control.preamble.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "variable.parameter.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "\\}",
    "contentName": "support.class.latex",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.include.latex",
    "begin": "((\\\\)(?:include|input))(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.include.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      }
    },
    "end": "\\}",
    "contentName": "support.class.latex",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.function.section.latex",
    "begin": "(?x)\n\t\t\t\t(\t\t\t\t\t\t\t\t\t\t\t\t\t# Capture 1\n\t\t\t\t\t(\\\\)\t\t\t\t\t\t\t\t\t\t\t# Marker\n\t\t\t\t\t(?:\n\t\t\t\t\t\t(?:sub){0,2}section\t\t\t\t\t\t\t# Functions\n\t\t\t\t\t  | (?:sub)?paragraph\n\t\t\t\t\t  | chapter|part|addpart\n\t\t\t\t\t  | addchap|addsec|minisec\n\t\t\t\t\t)\n\t\t\t\t\t(?:\\*)?\t\t\t\t\t\t\t\t\t\t\t# Optional Unnumbered\n\t\t\t\t)\n\t\t\t\t(?:\n\t\t\t\t\t(\\[)([^\\[]*?)(\\])\t\t\t\t\t\t\t\t# Optional Title\n\t\t\t\t)??\n\t\t\t\t(\\{)\t\t\t\t\t\t\t\t\t\t\t\t# Opening Bracket\n\t\t\t\t",
    "comment": "this works OK with all kinds of crazy stuff as long as section is one line",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "beginCaptures": {
      "6": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "1": {
        "name": "support.function.section.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.optional.begin.latex"
      },
      "4": {
        "name": "entity.name.section.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.optional.end.latex"
      }
    },
    "end": "\\}",
    "contentName": "entity.name.section.latex",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.function.embedded.java.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)(lstlisting)(\\})(?:(\\[).*(\\]))?(\\s*%\\s*(?i:Java)\\n?)",
    "captures": {
      "6": {
        "name": "punctuation.definition.arguments.optional.begin.latex"
      },
      "7": {
        "name": "punctuation.definition.arguments.optional.end.latex"
      },
      "8": {
        "name": "comment.line.percentage.latex"
      },
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "((\\\\)end)(\\{)(lstlisting)(\\})",
    "contentName": "source.java.embedded",
    "patterns": [
      {
        "include": "source.java"
      }
    ]
  },
  {
    "name": "meta.function.embedded.python.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)(lstlisting)(\\})(?:(\\[).*(\\]))?(\\s*%.*\\n?)?",
    "comment": "Put the lstlisting match before the more general environment listing. Someday it would be nice to make this rule general enough to figure out which language is inside the lstlisting environment rather than my own personal use for python. --Brad",
    "captures": {
      "6": {
        "name": "punctuation.definition.arguments.optional.begin.latex"
      },
      "7": {
        "name": "punctuation.definition.arguments.optional.end.latex"
      },
      "8": {
        "name": "comment.line.percentage.latex"
      },
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "((\\\\)end)(\\{)(lstlisting)(\\})",
    "contentName": "source.python.embedded",
    "patterns": [
      {
        "include": "source.python"
      }
    ]
  },
  {
    "name": "meta.function.verbatim.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)((?:V|v)erbatim)(\\})",
    "captures": {
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "((\\\\)end)(\\{)(\\4)(\\})",
    "contentName": "markup.raw.verbatim.latex"
  },
  {
    "name": "meta.function.begin-document.latex",
    "comment": "These two patterns match the \\begin{document} and \\end{document} commands, so that the environment matching pattern following them will ignore those commands.",
    "captures": {
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "match": "(?:\\s*)((\\\\)begin)(\\{)(document)(\\})"
  },
  {
    "name": "meta.function.end-document.latex",
    "captures": {
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "match": "(?:\\s*)((\\\\)end)(\\{)(document)(\\})"
  },
  {
    "name": "meta.function.environment.math.latex",
    "begin": "(?x)\n\t\t\t\t\t(?:\\s*)\t\t\t\t\t\t\t\t\t\t# Optional whitespace\n\t\t\t\t\t((\\\\)begin)\t\t\t\t\t\t\t\t\t# Marker - Function\n\t\t\t\t\t(\\{)\t\t\t\t\t\t\t\t\t\t# Open Bracket\n\t\t\t\t\t\t(\n\t\t\t\t\t\t\t(?:\n\t\t\t\t\t\t\t\talign|equation|eqnarray\t\t\t# Argument\n\t\t\t\t\t\t\t  | multline|aligned|alignat\n\t\t\t\t\t\t\t  | split|gather|gathered\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t(?:\\*)?\t\t\t\t\t\t\t\t# Optional Unnumbered\n\t\t\t\t\t\t)\n\t\t\t\t\t(\\})\t\t\t\t\t\t\t\t\t\t# Close Bracket\n\t\t\t\t\t(\\s*\\n)?\t\t\t\t# Match to end of line absent of content\n\t\t\t\t",
    "captures": {
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "(?x)\n\t\t\t\t\t(?:\\s*)\t\t\t\t\t\t\t\t\t\t# Optional whitespace\n\t\t\t\t\t((\\\\)end)\t\t\t\t\t\t\t\t\t# Marker - Function\n\t\t\t\t\t(\\{)\t\t\t\t\t\t\t\t\t\t# Open Bracket\n\t\t\t\t\t\t(\\4)\t\t\t\t# Previous capture from begin\n\t\t\t\t\t(\\})\t\t\t\t\t\t\t\t\t\t# Close Bracket\n\t\t\t\t\t(?:\\s*\\n)?\t\t\t\t# Match to end of line absent of content\n\t\t\t\t",
    "contentName": "string.other.math.block.environment.latex",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.function.environment.tabular.latex",
    "begin": "(?x)\n\t\t\t\t\t(?:\\s*)\t\t\t\t\t\t\t\t\t\t# Optional whitespace\n\t\t\t\t\t((\\\\)begin)\t\t\t\t\t\t\t\t\t# Marker - Function\n\t\t\t\t\t(\\{)\t\t\t\t\t\t\t\t\t\t# Open Bracket\n\t\t\t\t\t\t(array|tabular[xy*]?)\n\t\t\t\t\t(\\})\t\t\t\t\t\t\t\t\t\t# Close Bracket\n\t\t\t\t\t(\\s*\\n)?\t\t\t\t# Match to end of line absent of content\n\t\t\t\t",
    "captures": {
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "end": "(?x)\n\t\t\t\t\t(?:\\s*)\t\t\t\t\t\t\t\t\t\t# Optional whitespace\n\t\t\t\t\t((\\\\)end)\t\t\t\t\t\t\t\t\t# Marker - Function\n\t\t\t\t\t(\\{)\t\t\t\t\t\t\t\t\t\t# Open Bracket\n\t\t\t\t\t\t(\\4)\t\t\t\t# Previous capture from begin\n\t\t\t\t\t(\\})\t\t\t\t\t\t\t\t\t\t# Close Bracket\n\t\t\t\t\t(?:\\s*\\n)?\t\t\t\t# Match to end of line absent of content\n\t\t\t\t",
    "contentName": "meta.data.environment.tabular.latex",
    "patterns": [
      {
        "name": "punctuation.definition.table.row.latex",
        "match": "\\\\"
      },
      {
        "name": "meta.row.environment.tabular.latex",
        "begin": "(?:^|(?<=\\\\\\\\))(?!\\\\\\\\|\\s*\\\\end\\{(?:tabular|array))",
        "end": "(?=\\\\\\\\|\\s*\\\\end\\{(?:tabular|array))",
        "patterns": [
          {
            "name": "punctuation.definition.table.cell.latex",
            "match": "&"
          },
          {
            "name": "meta.cell.environment.tabular.latex",
            "begin": "(?:^|(?<=&))((?!&|\\\\\\\\|$))",
            "end": "(?=&|\\\\\\\\|\\s*\\\\end\\{(?:tabular|array))",
            "patterns": [
              {
                "include": "$base"
              }
            ]
          },
          {
            "include": "$base"
          }
        ]
      },
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.function.environment.list.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)(itemize|enumerate|description|list)(\\})",
    "captures": {
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.latex"
      }
    },
    "end": "((\\\\)end)(\\{)(\\4)(\\})(?:\\s*\\n)?",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.function.environment.general.latex",
    "begin": "(?:\\s*)((\\\\)begin)(\\{)(\\w+[*]?)(\\})",
    "captures": {
      "1": {
        "name": "support.function.be.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.latex"
      },
      "4": {
        "name": "variable.parameter.function.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.latex"
      }
    },
    "end": "((\\\\)end)(\\{)(\\4)(\\})(?:\\s*\\n)?",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "storage.type.function.latex",
    "captures": {
      "1": {
        "name": "punctuation.definition.function.latex"
      }
    },
    "match": "(\\\\)(newcommand|renewcommand)\\b"
  },
  {
    "begin": "((\\\\)marginpar)(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.marginpar.end.latex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.marginpar.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.marginpar.begin.latex"
      }
    },
    "end": "\\}",
    "contentName": "meta.paragraph.margin.latex",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "begin": "((\\\\)footnote)(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.footnote.end.latex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.footnote.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.footnote.begin.latex"
      }
    },
    "end": "\\}",
    "contentName": "meta.footnote.latex",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.function.emph.latex",
    "begin": "((\\\\)emph)(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.emph.end.latex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.emph.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.emph.begin.latex"
      }
    },
    "end": "\\}",
    "contentName": "markup.italic.emph.latex",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.function.textit.latex",
    "begin": "((\\\\)textit)(\\{)",
    "comment": "We put the keyword in a capture and name this capture, so that disabling spell checking for “keyword” won't be inherited by the argument to \\textit{...}.\n\nPut specific matches for particular LaTeX keyword.functions before the last two more general functions",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.textit.end.latex"
      }
    },
    "captures": {
      "1": {
        "name": "support.function.textit.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.textit.begin.latex"
      }
    },
    "end": "\\}",
    "contentName": "markup.italic.textit.latex",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.function.textbf.latex",
    "begin": "((\\\\)textbf)(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.textbf.end.latex"
      }
    },
    "captures": {
      "1": {
        "name": "support.function.textbf.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.textbf.begin.latex"
      }
    },
    "end": "\\}",
    "contentName": "markup.bold.textbf.latex",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.function.texttt.latex",
    "begin": "((\\\\)texttt)(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.texttt.end.latex"
      }
    },
    "captures": {
      "1": {
        "name": "support.function.texttt.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.texttt.begin.latex"
      }
    },
    "end": "\\}",
    "contentName": "markup.raw.texttt.latex",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.scope.item.latex",
    "captures": {
      "0": {
        "name": "keyword.other.item.latex"
      },
      "1": {
        "name": "punctuation.definition.keyword.latex"
      }
    },
    "match": "(\\\\)item\\b"
  },
  {
    "name": "meta.citation.latex",
    "begin": "(?x)\n\t\t\t\t\t(\n\t\t\t\t\t\t(\\\\)\t\t\t\t\t\t\t\t\t\t# Marker\n\t\t\t\t\t\t(?:foot)?(?:full)?(?:no)?(?:short)?\t\t# Function Name\n\t\t\t\t\t\tcite\n\t\t\t\t\t\t(?:al)?(?:t|p|author|year(?:par)?|title)?[ANP]*\n\t\t\t\t\t\t\\*?\t\t\t\t\t\t\t\t\t\t\t# Optional Unabreviated\n\t\t\t\t\t)\n\t\t\t\t\t(?:(\\[)[^\\]]*(\\]))?\t\t\t\t\t\t\t\t# Optional\n\t\t\t\t\t(?:(\\[)[^\\]]*(\\]))?\t\t\t\t\t\t\t\t#   Arguments\n\t\t\t\t\t(\\{)\t\t\t\t\t\t\t\t\t\t\t# Opening Bracket\n\t\t\t\t",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.arguments.latex"
      }
    },
    "captures": {
      "6": {
        "name": "punctuation.definition.arguments.optional.end.latex"
      },
      "7": {
        "name": "punctuation.definition.arguments.latex"
      },
      "1": {
        "name": "keyword.control.cite.latex"
      },
      "2": {
        "name": "punctuation.definition.keyword.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.optional.begin.latex"
      },
      "4": {
        "name": "punctuation.definition.arguments.optional.end.latex"
      },
      "5": {
        "name": "punctuation.definition.arguments.optional.begin.latex"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "name": "constant.other.reference.citation.latex",
        "match": "[\\w:.]+"
      }
    ]
  },
  {
    "name": "meta.reference.label.latex",
    "begin": "((\\\\)(?:\\w*[r|R]ef\\*?))(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.arguments.begin.latex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.ref.latex"
      },
      "2": {
        "name": "punctuation.definition.keyword.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "name": "constant.other.reference.label.latex",
        "match": "[a-zA-Z0-9\\.,:/*!^_-]"
      }
    ]
  },
  {
    "name": "meta.definition.label.latex",
    "begin": "((\\\\)label)(\\{)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.arguments.end.latex"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.control.label.latex"
      },
      "2": {
        "name": "punctuation.definition.keyword.latex"
      },
      "3": {
        "name": "punctuation.definition.arguments.begin.latex"
      }
    },
    "end": "\\}",
    "patterns": [
      {
        "name": "variable.parameter.definition.label.latex",
        "match": "[a-zA-Z0-9\\.,:/*!^_-]"
      }
    ]
  },
  {
    "name": "meta.function.verb.latex",
    "captures": {
      "1": {
        "name": "support.function.verb.latex"
      },
      "2": {
        "name": "punctuation.definition.function.latex"
      },
      "3": {
        "name": "punctuation.definition.verb.latex"
      },
      "4": {
        "name": "markup.raw.verb.latex"
      },
      "5": {
        "name": "punctuation.definition.verb.latex"
      }
    },
    "match": "((\\\\)verb[\\*]?)\\s*((?<=\\s)\\S|[^a-zA-Z])(.*?)(\\3|$)"
  },
  {
    "name": "string.quoted.double.european.latex",
    "begin": "\"`",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.latex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.latex"
      }
    },
    "end": "\"'",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "string.quoted.double.latex",
    "begin": "``",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.latex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.latex"
      }
    },
    "end": "''|\"",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "string.quoted.double.guillemot.latex",
    "begin": "\">",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.latex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.latex"
      }
    },
    "end": "\"<",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "string.quoted.double.guillemot.latex",
    "begin": "\"<",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.latex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.latex"
      }
    },
    "end": "\">",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "string.other.math.latex",
    "begin": "\\\\\\(",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.latex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.latex"
      }
    },
    "end": "\\\\\\)",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "string.other.math.latex",
    "begin": "\\\\\\[",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.latex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.latex"
      }
    },
    "end": "\\\\\\]",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.escape-character.latex",
    "match": "\\\\$"
  },
  {
    "name": "invalid.illegal.string.quoted.single.latex",
    "match": "(?<!\\S)'.*?'"
  },
  {
    "name": "invalid.illegal.string.quoted.double.latex",
    "match": "(?<!\\S)\".*?\""
  },
  {
    "name": "constant.character.latex",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.latex"
      }
    },
    "match": "(\\\\)(text(s(terling|ixoldstyle|urd|e(ction|venoldstyle|rvicemark))|yen|n(ineoldstyle|umero|aira)|c(ircledP|o(py(left|right)|lonmonetary)|urrency|e(nt(oldstyle)?|lsius))|t(hree(superior|oldstyle|quarters(emdash)?)|i(ldelow|mes)|w(o(superior|oldstyle)|elveudash)|rademark)|interrobang(down)?|zerooldstyle|o(hm|ne(superior|half|oldstyle|quarter)|penbullet|rd(feminine|masculine))|d(i(scount|ed|v(orced)?)|o(ng|wnarrow|llar(oldstyle)?)|egree|agger(dbl)?|blhyphen(char)?)|uparrow|p(ilcrow|e(so|r(t(housand|enthousand)|iodcentered))|aragraph|m)|e(stimated|ightoldstyle|uro)|quotes(traight(dblbase|base)|ingle)|f(iveoldstyle|ouroldstyle|lorin|ractionsolidus)|won|l(not|ira|e(ftarrow|af)|quill|angle|brackdbl)|a(s(cii(caron|dieresis|acute|grave|macron|breve)|teriskcentered)|cutedbl)|r(ightarrow|e(cipe|ferencemark|gistered)|quill|angle|brackdbl)|g(uarani|ravedbl)|m(ho|inus|u(sicalnote)?|arried)|b(igcircle|orn|ullet|lank|a(ht|rdbl)|rokenbar)))\\b"
  },
  {
    "name": "meta.column-specials.latex",
    "captures": {
      "1": {
        "name": "punctuation.definition.column-specials.begin.latex"
      },
      "2": {
        "name": "punctuation.definition.column-specials.end.latex"
      }
    },
    "match": "(?:<|>)(\\{)\\$(\\})"
  },
  {
    "include": "text.tex"
  }
];

exports.LaTeXSyntax = new TextmateSyntax(repositories, patterns);
