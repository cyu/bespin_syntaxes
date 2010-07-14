"define metadata";
({
    "description": "Haml syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "haml",
            "pointer": "#HamlSyntax",
            "fileexts": [
  "haml",
  "sass"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "continuation": {
    "captures": {
      "1": {
        "name": "punctuation.separator.continuation.haml"
      }
    },
    "match": "(\\|)\\s*\\n"
  },
  "rubyline": {
    "begin": "=|-|~",
    "name": "meta.line.ruby.haml",
    "endCaptures": {
      "1": {
        "name": "source.ruby.embedded.html"
      },
      "2": {
        "name": "keyword.control.ruby.start-block"
      }
    },
    "end": "((do|\\{)( \\|[^|]+\\|)?)$|$|^(?!.*\\|\\s*$)",
    "contentName": "source.ruby.embedded.haml",
    "patterns": [
      {
        "name": "comment.line.number-sign.ruby",
        "comment": "Hack to let ruby comments work in this context properly",
        "match": "#.*$"
      },
      {
        "include": "source.ruby.rails"
      },
      {
        "include": "#continuation"
      }
    ]
  }
};

var patterns = [
  {
    "name": "meta.prolog.haml",
    "captures": {
      "1": {
        "name": "punctuation.definition.prolog.haml"
      }
    },
    "match": "^(!!!)($|\\s.*)"
  },
  {
    "name": "comment.line.slash.haml",
    "captures": {
      "1": {
        "name": "punctuation.section.comment.haml"
      }
    },
    "match": "^ *(/)\\s*\\S.*$\\n?"
  },
  {
    "name": "comment.block.haml",
    "begin": "^( *)(/)\\s*$",
    "beginCaptures": {
      "2": {
        "name": "punctuation.section.comment.haml"
      }
    },
    "end": "^(?!\\1  )",
    "patterns": [
      {
        "include": "text.haml"
      }
    ]
  },
  {
    "begin": "^\\s*(?:((%)([\\w:]+))|(?=\\.|#))",
    "captures": {
      "1": {
        "name": "meta.tag.haml"
      },
      "2": {
        "name": "punctuation.definition.tag.haml"
      },
      "3": {
        "name": "entity.name.tag.haml"
      }
    },
    "end": "$|(?!\\.|#|\\{|\\[|=|-|~|/)",
    "patterns": [
      {
        "name": "entity.name.tag.class.haml",
        "match": "\\.[\\w-]+"
      },
      {
        "name": "entity.name.tag.id.haml",
        "match": "#[\\w-]+"
      },
      {
        "name": "meta.section.attributes.haml",
        "begin": "\\{(?=.*\\}|.*\\|\\s*$)",
        "end": "\\}|$|^(?!.*\\|\\s*$)",
        "patterns": [
          {
            "include": "source.ruby.rails"
          },
          {
            "include": "#continuation"
          }
        ]
      },
      {
        "name": "meta.section.object.haml",
        "begin": "\\[(?=.*\\]|.*\\|\\s*$)",
        "end": "\\]|$|^(?!.*\\|\\s*$)",
        "patterns": [
          {
            "include": "source.ruby.rails"
          },
          {
            "include": "#continuation"
          }
        ]
      },
      {
        "include": "#rubyline"
      },
      {
        "name": "punctuation.terminator.tag.haml",
        "match": "/"
      }
    ]
  },
  {
    "captures": {
      "1": {
        "name": "meta.escape.haml"
      }
    },
    "match": "^\\s*(\\\\.)"
  },
  {
    "begin": "^\\s*(?==|-|~)",
    "end": "$",
    "patterns": [
      {
        "include": "#rubyline"
      }
    ]
  }
];

exports.HamlSyntax = new TextmateSyntax(repositories, patterns);
