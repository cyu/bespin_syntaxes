"define metadata";
({
    "description": "R syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "R",
            "pointer": "#RSyntax",
            "fileexts": [
  "R",
  "r",
  "s",
  "S",
  "Rprofile"
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
    "name": "comment.line.number-sign.r",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.r"
      }
    },
    "match": "(#).*$\\n?"
  },
  {
    "name": "storage.type.r",
    "match": "\\b(logical|numeric|character|complex|matrix|array|data\\.frame|list|factor)(?=\\s*\\()"
  },
  {
    "name": "keyword.control.r",
    "match": "\\b(function|if|break|next|repeat|else|for|return|switch|while|in|invisible)\\b"
  },
  {
    "name": "constant.numeric.r",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
  },
  {
    "name": "constant.language.r",
    "match": "\\b(TRUE|FALSE|NULL|NA|Inf|NaN)\\b"
  },
  {
    "name": "support.constant.misc.r",
    "match": "\\b(pi|letters|LETTERS|month\\.abb|month\\.name)\\b"
  },
  {
    "name": "keyword.operator.arithmetic.r",
    "match": "(\\-|\\+|\\*|\\/|%\\/%|%%|%\\*%|%in%|%o%|%x%|\\^)"
  },
  {
    "name": "keyword.operator.assignment.r",
    "match": "(=|<-|<<-|->|->>)"
  },
  {
    "name": "keyword.operator.comparison.r",
    "match": "(==|!=|<>|<|>|<=|>=)"
  },
  {
    "name": "keyword.operator.logical.r",
    "match": "(!|&{1,2}|[|]{1,2})"
  },
  {
    "name": "keyword.other.r",
    "match": "(\\.\\.\\.|\\$|:|\\~)"
  },
  {
    "name": "string.quoted.double.r",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.r"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.r"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.r",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.single.r",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.r"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.r"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.r",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "meta.function.r",
    "captures": {
      "1": {
        "name": "entity.name.function.r"
      },
      "2": {
        "name": "keyword.operator.assignment.r"
      },
      "3": {
        "name": "keyword.control.r"
      }
    },
    "match": "([a-zA-Z._][a-zA-Z0-9._]*)\\s*(<-)\\s*(function)"
  },
  {
    "match": "([a-zA-Z._][a-zA-Z0-9._]*)\\s*\\("
  },
  {
    "captures": {
      "1": {
        "name": "variable.parameter.r"
      },
      "2": {
        "name": "keyword.operator.assignment.r"
      }
    },
    "match": "([a-zA-Z._][a-zA-Z0-9._]*)\\s*(=)(?=[^=])"
  },
  {
    "name": "variable.other.r",
    "match": "\\b([a-zA-Z._][a-zA-Z0-9._]*)\\b"
  }
];

exports.RSyntax = new TextmateSyntax(repositories, patterns);
