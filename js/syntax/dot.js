"define metadata";
({
    "description": "Graphviz (DOT) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "dot",
            "pointer": "#Graphviz (DOT)Syntax",
            "fileexts": [
  "dot",
  "DOT"
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
    "name": "storage.type.dot",
    "match": "\\b(node|edge|graph|digraph|subgraph|strict)\\b"
  },
  {
    "name": "support.constant.attribute.node.dot",
    "match": "\\b(bottomlabel|color|comment|distortion|fillcolor|fixedsize|fontcolor|fontname|fontsize|group|height|label|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|style|toplabel|URL|width|z)\\b"
  },
  {
    "name": "support.constant.attribute.edge.dot",
    "match": "\\b(arrowhead|arrowsize|arrowtail|color|comment|constraint|decorate|dir|fontcolor|fontname|fontsize|headlabel|headport|headURL|label|labelangle|labeldistance|labelfloat|labelcolor|labelfontname|labelfontsize|layer|lhead|ltail|minlen|samehead|sametail|style|taillabel|tailport|tailURL|weight)\\b"
  },
  {
    "name": "support.constant.attribute.graph.dot",
    "match": "\\b(bgcolor|center|clusterrank|color|comment|compound|concentrate|fillcolor|fontname|fontpath|fontsize|label|labeljust|labelloc|layers|margin|mclimit|nodesep|nslimit|nslimit1|ordering|orientation|page|pagedir|quantum|rank|rankdir|ranksep|ratio|remincross|rotate|samplepoints|searchsize|size|style|URL)\\b"
  },
  {
    "name": "string.quoted.double.dot",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.dot"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.dot"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.dot",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "comment.line.double-slash.dot",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.dot"
      }
    },
    "match": "(//).*$\\n?"
  },
  {
    "name": "comment.line.number-sign.dot",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.dot"
      }
    },
    "match": "(#).*$\\n?"
  },
  {
    "name": "comment.block.dot",
    "begin": "/\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.dot"
      }
    },
    "end": "\\*/"
  }
];

exports.Graphviz (DOT)Syntax = new TextmateSyntax(repositories, patterns);
