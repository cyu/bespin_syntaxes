"define metadata";
({
    "description": "SWIG syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "i",
            "pointer": "#SWIGSyntax",
            "fileexts": [
  "i",
  "swg"
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
    "comment": "SWIG files contain C or C++ code, so it's logical to derive from the C++ rules",
    "include": "source.c++"
  },
  {
    "name": "keyword.other.directive.inlinecode.swig",
    "captures": {
      "1": {
        "name": "punctuation.definition.keyword.swig"
      }
    },
    "match": "(%)(header|init|inline|native|runtime|wrapper)\\b"
  },
  {
    "name": "keyword.other.function-parameter.swig",
    "captures": {
      "1": {
        "name": "punctuation.definition.keyword.swig"
      }
    },
    "match": "(\\$)([\\*&]*[1-9]+(_name|_type|_ltype|_basetype|_mangle|_descriptor){0,1}|action|input|result|symname)\\b"
  },
  {
    "name": "support.function.type.swig",
    "match": "\\b(in|out|typecheck|arginit|default|check|argout|freearg|newfree|memberin|varin|varout|throws|numinputs)\\b"
  },
  {
    "name": "keyword.other.directive.swig",
    "captures": {
      "1": {
        "name": "punctuation.definition.keyword.swig"
      }
    },
    "match": "(%)(apply|callback|clear|constant|contract|define|enddef|extend|feature|ignore|insert|makedefault|module|nocallback|nodefault|rename|typemap|varargs|template)\\b"
  },
  {
    "name": "meta.preprocessor.swig",
    "captures": {
      "1": {
        "name": "keyword.control.import.swig"
      }
    },
    "match": "\\(\\s*(allegrocl|chicken|csharp|guile|java|modula3|mzscheme|ocaml|perl|php|pike|python|ruby|sexp|tcl|xml)\\b"
  },
  {
    "name": "meta.preprocessor.swig",
    "begin": "^\\s*(%)\\s*(include|import)\\b\\s+(\"?[A-Za-z0-9\\._]+\"?)",
    "captures": {
      "1": {
        "name": "punctuation.definition.preprocessor.swig"
      },
      "2": {
        "name": "keyword.control.import.swig"
      },
      "3": {
        "name": "string.quoted.double.swig"
      }
    },
    "end": "$"
  },
  {
    "name": "meta.preprocessor.macro.swig",
    "captures": {
      "1": {
        "name": "punctuation.definition.preprocessor.swig"
      }
    },
    "match": "(%)([A-Za-z]+[A-Za-z0-9_]*)\\b"
  },
  {
    "name": "storage.type.swig",
    "match": "\\bSWIG_TYPECHECK_(POINTER|VOIDPTR|BOOL|UINT8|INT8|UINT16|INT16|UINT32|INT32|UINT64|INT64|UINT128|INT128|INTEGER|FLOAT|DOUBLE|COMPLEX|UNICHAR|UNISTRING|CHAR|STRING|BOOL_ARRAY|INT8_ARRAY|INT16_ARRAY|INT32_ARRAY|INT64_ARRAY|INT128_ARRAY|FLOAT_ARRAY|DOUBLE_ARRAY|CHAR_ARRAY|STRING_ARRAY)\\b"
  },
  {
    "name": "source.swig.codeblock",
    "captures": {
      "1": {
        "name": "punctuation.section.embedded.swig"
      }
    },
    "match": "(%\\{|%\\})"
  }
];

exports.SWIGSyntax = new TextmateSyntax(repositories, patterns);
