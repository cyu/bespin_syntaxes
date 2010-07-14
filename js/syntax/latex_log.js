"define metadata";
({
    "description": "LaTeX Log syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "LaTeX Log",
            "pointer": "#LaTeX LogSyntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = null;

var patterns = [
  {
    "name": "invalid.deprecated",
    "match": ".*Warning:"
  },
  {
    "name": "invalid.deprecated",
    "match": "[^:]*:\\d*:.*"
  },
  {
    "name": "invalid.illegal",
    "match": ".*Error|^!.*"
  },
  {
    "name": "entity.name.function",
    "match": ".*\\.sty"
  },
  {
    "name": "entity.name.type.class",
    "match": ".*\\.cls"
  },
  {
    "name": "entity.name.tag.configuration",
    "match": ".*\\.cfg"
  },
  {
    "name": "entity.name.tag.definition",
    "match": ".*\\.def"
  },
  {
    "name": "comment.block.documentation",
    "match": ".*Info.*"
  },
  {
    "name": "meta.log.latex.fixme",
    "match": ".*FiXme:"
  },
  {
    "name": "meta.log.latex.hyphenation",
    "begin": "(Overfull|Underfull)",
    "captures": {
      "1": {
        "name": "keyword.control.hyphenation.latex"
      }
    },
    "end": "(\\[\\]\\n)",
    "patterns": [
      {
        "name": "variable.parameter.hyphenation.latex2",
        "match": "[0-9]+\\-\\-[0-9]+"
      }
    ]
  },
  {
    "name": "string.unquoted.other.filename.log.latex",
    "begin": "(<)",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.log.latex"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.log.latex"
      }
    },
    "end": "(>)",
    "patterns": [
      {
        "name": "support.function.with-arg.latex",
        "captures": {
          "1": {
            "name": "entity.name.function.filename.latex"
          }
        },
        "match": "(.*/.*\\.pdf)"
      }
    ]
  }
];

exports.LaTeX LogSyntax = new TextmateSyntax(repositories, patterns);
