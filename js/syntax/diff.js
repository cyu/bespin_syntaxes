"define metadata";
({
    "description": "Diff syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "diff",
            "pointer": "#DiffSyntax",
            "fileexts": [
  "diff",
  "patch"
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
    "name": "meta.separator.diff",
    "captures": {
      "1": {
        "name": "punctuation.definition.separator.diff"
      }
    },
    "match": "^((\\*{15})|(={67})|(-{3}))$\\n?"
  },
  {
    "name": "meta.diff.range.normal",
    "match": "^\\d+(,\\d+)*(a|d|c)\\d+(,\\d+)*$\\n?"
  },
  {
    "name": "meta.diff.range.unified",
    "captures": {
      "1": {
        "name": "punctuation.definition.range.diff"
      },
      "2": {
        "name": "meta.toc-list.line-number.diff"
      },
      "3": {
        "name": "punctuation.definition.range.diff"
      }
    },
    "match": "^(@@)\\s*(.+?)\\s*(@@)$\\n?"
  },
  {
    "name": "meta.diff.range.context",
    "captures": {
      "6": {
        "name": "punctuation.definition.range.diff"
      },
      "7": {
        "name": "punctuation.definition.range.diff"
      },
      "3": {
        "name": "punctuation.definition.range.diff"
      },
      "4": {
        "name": "punctuation.definition.range.diff"
      }
    },
    "match": "^(((\\-{3}) .+ (\\-{4}))|((\\*{3}) .+ (\\*{4})))$\\n?"
  },
  {
    "name": "meta.diff.header.from-file",
    "captures": {
      "6": {
        "name": "punctuation.definition.from-file.diff"
      },
      "7": {
        "name": "punctuation.definition.from-file.diff"
      },
      "4": {
        "name": "punctuation.definition.from-file.diff"
      }
    },
    "match": "(^(((-{3}) .+)|((\\*{3}) .+))$\\n?|^(={4}) .+(?= - ))"
  },
  {
    "name": "meta.diff.header.to-file",
    "captures": {
      "2": {
        "name": "punctuation.definition.to-file.diff"
      },
      "3": {
        "name": "punctuation.definition.to-file.diff"
      },
      "4": {
        "name": "punctuation.definition.to-file.diff"
      }
    },
    "match": "(^(\\+{3}) .+$\\n?| (-) .* (={4})$\\n?)"
  },
  {
    "name": "markup.inserted.diff",
    "captures": {
      "6": {
        "name": "punctuation.definition.inserted.diff"
      },
      "3": {
        "name": "punctuation.definition.inserted.diff"
      }
    },
    "match": "^(((>)( .*)?)|((\\+).*))$\\n?"
  },
  {
    "name": "markup.changed.diff",
    "captures": {
      "1": {
        "name": "punctuation.definition.inserted.diff"
      }
    },
    "match": "^(!).*$\\n?"
  },
  {
    "name": "markup.deleted.diff",
    "captures": {
      "6": {
        "name": "punctuation.definition.inserted.diff"
      },
      "3": {
        "name": "punctuation.definition.inserted.diff"
      }
    },
    "match": "^(((<)( .*)?)|((-).*))$\\n?"
  },
  {
    "name": "meta.diff.index",
    "captures": {
      "1": {
        "name": "punctuation.separator.key-value.diff"
      },
      "2": {
        "name": "meta.toc-list.file-name.diff"
      }
    },
    "match": "^Index(:) (.+)$\\n?"
  }
];

exports.DiffSyntax = new TextmateSyntax(repositories, patterns);
