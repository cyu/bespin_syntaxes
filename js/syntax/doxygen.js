"define metadata";
({
    "description": "Doxygen syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "doxygen",
            "pointer": "#DoxygenSyntax",
            "fileexts": [
  "doxygen"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "source_doxygen": {
    "patterns": [
      {
        "include": "#keywords"
      },
      {
        "include": "text.html.basic"
      }
    ]
  },
  "keywords": {
    "patterns": [
      {
        "name": "keyword.control.doxygen",
        "captures": {
          "1": {
            "name": "punctuation.definition.keyword.doxygen"
          }
        },
        "match": "([\\\\@])((a|addindex|addtogroup|anchor|arg|attention|author|b|brief|bug|c|callgraph|callergraph|category|class|code|cond|copydoc|date|def|defgroup|deprecated|dir|dontinclude|dot|dotfile|e|else|elseif|em|endcode|endcond|enddot|endhtmlonly|endif|endlatexonly|endlink|endmanonly|endverbatim|endxmlonly|enum|example|exception|file|fn|hideinitializer|htmlinclude|htmlonly|if|ifnot|image|include|includelineno|ingroup|internal|invariant|interface|latexonly|li|line|link|mainpage|manonly|n|name|namespace|nosubgrouping|note|overload|p|package|page|par|paragraph|param|post|pre|private|privatesection|property|protected|protectedsection|protocol|public|publicsection|ref|relates|relatesalso|remarks|return|retval|sa|section|see|showinitializer|since|skip|skipline|struct|subpage|subsection|subsubsection|test|throw|todo|typedef|union|until|var|verbatim|verbinclude|version|warning|weakgroup|xmlonly|xrefitem)\\b|(\\$|\\@|\\\\|\\&|\\~|\\<|\\>|\\#|\\%|f\\$|f\\[|f\\]))"
      }
    ]
  }
};

var patterns = [
  {
    "name": "comment.block.doxygen",
    "begin": "\\/\\*\\*\\<?",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.doxygen"
      }
    },
    "end": "\\*\\/",
    "patterns": [
      {
        "include": "#source_doxygen"
      }
    ]
  },
  {
    "name": "comment.block.doxygen",
    "begin": "\\/\\*!\\<?",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.doxygen"
      }
    },
    "end": "\\*\\/",
    "patterns": [
      {
        "include": "#source_doxygen"
      }
    ]
  },
  {
    "name": "comment.line.doxygen",
    "begin": "\\/\\/[\\/!]\\<?",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.doxygen"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "include": "#source_doxygen"
      }
    ]
  }
];

exports.DoxygenSyntax = new TextmateSyntax(repositories, patterns);
