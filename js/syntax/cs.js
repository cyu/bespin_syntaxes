"define metadata";
({
    "description": "C# syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "cs",
            "pointer": "#C#Syntax",
            "fileexts": [
  "cs"
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
    "name": "comment.block.c#",
    "begin": "/\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.c#"
      }
    },
    "end": "\\*/"
  },
  {
    "name": "comment.line.double-slash.c#",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.c#"
      }
    },
    "match": "(//).*$\\n?"
  },
  {
    "name": "keyword.control.c#",
    "match": "\\b(abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|false|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|true|try|typeof|unckecked|unsafe|using|virtual|volatile|void|while)\\b"
  },
  {
    "name": "storage.type.c#",
    "match": "\\b(bool|byte|char|class|decimal|double|enum|float|int|nterface|long|object|sbyte|short|string|struct|uint|ulong|ushort)\\b"
  },
  {
    "name": "constant.numeric.c#",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f)?\\b"
  },
  {
    "name": "string.quoted.double.c#",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.c#"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.c#"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.c#",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.single.c#",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.c#"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.c#"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.c#",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "meta.preprocessor.c#",
    "captures": {
      "2": {
        "name": "keyword.control.import.c#"
      }
    },
    "match": "^(#)\\s*(if|else|elif|endif|define|undef|warning|error|line|region|endregion)\\b"
  }
];

exports.C#Syntax = new TextmateSyntax(repositories, patterns);
