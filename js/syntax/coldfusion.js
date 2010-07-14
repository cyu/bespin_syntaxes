"define metadata";
({
    "description": "ColdFusion syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "cfm",
            "pointer": "#ColdFusionSyntax",
            "fileexts": [
  "cfm",
  "cfml",
  "cfc"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "string-double-quoted": {
    "begin": "\"",
    "name": "string.quoted.double.cfml",
    "end": "\"",
    "patterns": [
      {
        "include": "#embedded-code"
      },
      {
        "include": "#entities"
      }
    ]
  },
  "entities": {
    "patterns": [
      {
        "name": "constant.character.entity.html",
        "match": "&([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+);"
      },
      {
        "name": "invalid.illegal.bad-ampersand.html",
        "match": "&"
      }
    ]
  },
  "tag-stuff": {
    "patterns": [
      {
        "include": "#tag-id-attribute"
      },
      {
        "include": "#tag-generic-attribute"
      },
      {
        "include": "#string-double-quoted"
      },
      {
        "include": "#string-single-quoted"
      },
      {
        "include": "#embedded-code"
      }
    ]
  },
  "coldfusion-comment": {
    "begin": "<!---",
    "name": "comment.block.cfml",
    "end": "--->",
    "patterns": [
      {
        "include": "#coldfusion-comment"
      }
    ]
  },
  "tag-id-attribute": {
    "begin": "\\b(id)\\b\\s*=",
    "name": "meta.attribute-with-value.id.cfml",
    "captures": {
      "1": {
        "name": "entity.other.attribute-name.id.html"
      }
    },
    "end": "(?<='|\")",
    "patterns": [
      {
        "name": "string.quoted.double.cfml",
        "begin": "\"",
        "end": "\"",
        "contentName": "meta.toc-list.id.cfml",
        "patterns": [
          {
            "include": "#embedded-code"
          },
          {
            "include": "#entities"
          }
        ]
      },
      {
        "name": "string.quoted.single.cfml",
        "begin": "'",
        "end": "'",
        "contentName": "meta.toc-list.id.cfml",
        "patterns": [
          {
            "include": "#embedded-code"
          },
          {
            "include": "#entities"
          }
        ]
      }
    ]
  },
  "string-single-quoted": {
    "begin": "'",
    "name": "string.quoted.single.cfml",
    "end": "'",
    "patterns": [
      {
        "include": "#embedded-code"
      },
      {
        "include": "#entities"
      }
    ]
  },
  "embedded-code": {
    "patterns": [

    ]
  },
  "tag-generic-attribute": {
    "name": "entity.other.attribute-name.cfml",
    "match": "\\b([a-zA-Z\\-:]+)"
  }
};

var patterns = [
  {
    "name": "meta.tag.cfoutput.cfml",
    "begin": "(?:^\\s+)?<((?i:cfoutput))\\b(?![^>]*/>)",
    "captures": {
      "1": {
        "name": "entity.name.tag.cfoutput.cfml"
      }
    },
    "end": "</((?i:cfoutput))>(?:\\s*\\n)?",
    "patterns": [
      {
        "include": "#tag-stuff"
      },
      {
        "name": "meta.scope.output.cfml",
        "begin": "(?<=>)",
        "end": "(?=</(?i:cfoutput))",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.tag.cfquery.cfml",
    "begin": "(?:^\\s+)?<((?i:cfquery))\\b(?![^>]*/>)",
    "captures": {
      "1": {
        "name": "entity.name.tag.cfquery.cfml"
      }
    },
    "end": "</((?i:cfquery))>(?:\\s*\\n)?",
    "patterns": [
      {
        "include": "#tag-stuff"
      },
      {
        "name": "source.sql.embedded",
        "begin": "(?<=>)",
        "end": "(?=</(?i:cfquery))",
        "patterns": [
          {
            "include": "source.sql"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.tag.any.cfml",
    "begin": "</?((?i:cf)([a-zA-Z0-9]+))(?=[^>]*>)",
    "beginCaptures": {
      "1": {
        "name": "entity.name.tag.cfml"
      }
    },
    "end": ">",
    "patterns": [
      {
        "include": "#tag-stuff"
      }
    ]
  },
  {
    "include": "#coldfusion-comment"
  },
  {
    "include": "text.html.basic"
  }
];

exports.ColdFusionSyntax = new TextmateSyntax(repositories, patterns);
