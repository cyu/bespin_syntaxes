"define metadata";
({
    "description": "Lisp syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "lisp",
            "pointer": "#LispSyntax",
            "fileexts": [
  "lisp",
  "cl",
  "l",
  "mud",
  "el"
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
    "name": "comment.line.semicolon.lisp",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.lisp"
      }
    },
    "match": "(;).*$\\n?"
  },
  {
    "name": "meta.function.lisp",
    "captures": {
      "2": {
        "name": "storage.type.function-type.lisp"
      },
      "4": {
        "name": "entity.name.function.lisp"
      }
    },
    "match": "(\\b(?i:(defun|defmethod|defmacro))\\b)(\\s+)((\\w|\\-|\\!|\\?)*)"
  },
  {
    "name": "constant.character.lisp",
    "captures": {
      "1": {
        "name": "punctuation.definition.constant.lisp"
      }
    },
    "match": "(#)(\\w|[\\\\+-=<>'\"&#])+"
  },
  {
    "name": "variable.other.global.lisp",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.lisp"
      },
      "3": {
        "name": "punctuation.definition.variable.lisp"
      }
    },
    "match": "(\\*)(\\S*)(\\*)"
  },
  {
    "name": "keyword.control.lisp",
    "match": "\\b(?i:case|do|let|loop|if|else|when)\\b"
  },
  {
    "name": "keyword.operator.lisp",
    "match": "\\b(?i:eq|neq|and|or)\\b"
  },
  {
    "name": "constant.language.lisp",
    "match": "\\b(?i:null|nil)\\b"
  },
  {
    "name": "support.function.lisp",
    "match": "\\b(?i:cons|car|cdr|cond|lambda|format|setq|setf|quote|eval|append|list|listp|memberp|t|load|progn)\\b"
  },
  {
    "name": "constant.numeric.lisp",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
  },
  {
    "name": "string.quoted.double.lisp",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.lisp"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.lisp"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.lisp",
        "match": "\\\\."
      }
    ]
  }
];

exports.LispSyntax = new TextmateSyntax(repositories, patterns);
