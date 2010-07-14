"define metadata";
({
    "description": "Dylan syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "dylan",
            "pointer": "#DylanSyntax",
            "fileexts": [
  "dylan"
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
    "name": "comment.block.dylan",
    "begin": "/\\*",
    "comment": "TODO -- Dylan allows nested comments.",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.dylan"
      }
    },
    "end": "\\*/"
  },
  {
    "name": "comment.line.double-slash.dylan",
    "begin": "//",
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.comment.dylan"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "name": "punctuation.separator.continuation.dylan",
        "match": "(?>\\\\\\s*\\n)"
      }
    ]
  },
  {
    "name": "meta.function.dylan",
    "begin": "\\b(define\\s+)((?:sealed|inline)\\s)?(method|function)\\s+([A-Za-z0-9\\\\-]*[!?]?)\\s",
    "captures": {
      "1": {
        "name": "keyword.control.def.dylan"
      },
      "2": {
        "name": "storage.modifier.dylan"
      },
      "3": {
        "name": "storage.type.function.dylan"
      },
      "4": {
        "name": "entity.name.function.dylan"
      }
    },
    "end": "\\)"
  },
  {
    "name": "keyword.control.dylan",
    "match": "\\b(?<!-)(begin|block|case|class|constant|define|domain|else|end|for|function|handler|if|inline|let|library|local|macro|method|module|otherwise|select|unless|until|variable|when|while)(?![:-])\\b"
  },
  {
    "name": "support.constant.language.dylan",
    "match": "(#t|#f|#next|#rest|#key|#all-keys|#include)"
  },
  {
    "name": "keyword.control.sealing-directives.dylan",
    "match": "\\b(sealed|open|abstract|concrete|primary|free)\\b"
  },
  {
    "name": "constant.numeric.dylan",
    "match": "\\b((#x[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)\\b"
  },
  {
    "name": "string.quoted.double.dylan",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.dylan"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.dylan"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.dylan",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "support.class.dylan",
    "match": "<(abort|array|boolean|byte-string|character|class|collection|complex|condition|deque|double-float|empty-list|error|explicit-key-collection|extended-float|float|function|generic-function|integer|list|method|mutable-collection|mutable-explicit-key-collection|mutable-sequence|number|object-table|object|pair|range|rational|real|restart|sealed-object-error|sequence|serious-condition|simple-error|simple-object-vector|simple-restart|simple-vector|simple-warning|single-float|singleton|stretchy-collection|stretchy-vector|string|symbol|table|type-error|type|unicode-string|vector|warning)>"
  },
  {
    "name": "support.function.dylan",
    "match": "\\b(?<!-)(abort|abs|add|add!|add-method|add-new|add-new!|all-superclasses|always|any?|applicable-method?|apply|aref|aref-setter|as|as-lowercase|as-lowercase!|as-uppercase|as-uppercase!|ash|backward-iteration-protocol|break|ceiling|ceiling/|cerror|check-type|choose|choose-by|complement|compose|concatenate|concatenate-as|condition-format-arguments|condition-format-string|conjoin|copy-sequence|curry|default-handler|dimension|dimensions|direct-subclasses|direct-superclasses|disjoin|do|do-handlers|element|element-setter|empty?|error|even?|every?|fill!|find-key|find-method|first|first-setter|floor|floor/|forward-iteration-protocol|function-arguments|function-return-values|function-specializers|gcd|generic-function-mandatory-|keywords|generic-function-methods|head|head-setter|identity|initialize|instance?|integral?|intersection|key-sequence|key-test|last|last-setter|lcm|limited|list|logand|logbit?|logior|lognot|logxor|make|map|map-as|map-into|max|member?|merge-hash-codes|min|modulo|negative|negative?|object-class|object-hash|odd?|pair|pop|pop-last|positive?|push|push-last|range|rank|rcurry|reduce|reduce1|remainder|remove|remove!|remove-duplicates|remove-duplicates!|remove-key!|remove-method|replace-elements!|replace-subsequence!|restart-query|return-allowed?|return-description|return-query|reverse|reverse!|round|round/|row-major-index|second|second-setter|shallow-copy|signal|singleton|size|size-setter|slot-initialized?|sort|sort!|sorted-applicable-methods|subsequence-position|subtype?|table-protocol|tail|tail-setter|third|third-setter|truncate|truncate/|type-error-expected-type|type-error-value|type-for-copy|type-union|union|values|vector|zero?)(?![:-])\\b"
  }
];

exports.DylanSyntax = new TextmateSyntax(repositories, patterns);
