"define metadata";
({
    "description": "jQuery (JavaScript) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "jQuery (JavaScript)",
            "pointer": "#jQuery (JavaScript)Syntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "nested-parens": {
    "begin": "\\(",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.js"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "#nested-parens"
      },
      {
        "include": "source.js"
      }
    ]
  },
  "css-selector": {
    "begin": "(?=\\s*[.*#a-zA-Z])",
    "name": "meta.selector.css",
    "end": "(?=[\"'])",
    "patterns": [
      {
        "name": "entity.name.tag.css",
        "match": "\\b(a|abbr|acronym|address|area|b|base|big|blockquote|body|br|button|caption|cite|code|col|colgroup|dd|del|dfn|div|dl|dt|em|fieldset|form|frame|frameset|(h[1-6])|head|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|map|meta|noframes|noscript|object|ol|optgroup|option|p|param|pre|q|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|ul|var)\\b"
      },
      {
        "name": "entity.other.attribute-name.class.css",
        "captures": {
          "1": {
            "name": "punctuation.definition.attribute-name.css"
          }
        },
        "match": "(\\.)[a-zA-Z0-9_-]+"
      },
      {
        "name": "entity.other.attribute-name.id.css",
        "captures": {
          "1": {
            "name": "punctuation.definition.attribute-name.css"
          }
        },
        "match": "(#)[a-zA-Z0-9_-]+"
      },
      {
        "name": "entity.name.tag.wildcard.css",
        "match": "\\*"
      },
      {
        "name": "entity.other.attribute-name.pseudo-class.css",
        "captures": {
          "1": {
            "name": "punctuation.definition.attribute-name.css"
          }
        },
        "match": "(:)\\b(active|after|before|first-letter|first-line|hover|link|visited)\\b"
      }
    ]
  }
};

var patterns = [
  {
    "begin": "(\\$)(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.class.js"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.class.js.jquery"
      },
      "2": {
        "name": "punctuation.section.class.js"
      }
    },
    "end": "(\\))",
    "contentName": "meta.selector.jquery",
    "patterns": [
      {
        "include": "#nested-parens"
      },
      {
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.selector.end.js"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.selector.begin.js"
          }
        },
        "end": "'",
        "patterns": [
          {
            "include": "#css-selector"
          }
        ]
      },
      {
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.selector.end.js"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.selector.begin.js"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "include": "#css-selector"
          }
        ]
      },
      {
        "include": "source.js"
      }
    ]
  },
  {
    "begin": "\\b(add|ancestors|appendTo|children|filter|find|insertAfter|insertBefore|next|not|parent|parents|prependTo|prev|remove|siblings)\\s*(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.section.function.js"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.js.jquery"
      },
      "2": {
        "name": "punctuation.section.function.js"
      }
    },
    "end": "(\\))",
    "contentName": "meta.selector.jquery",
    "patterns": [
      {
        "include": "#nested-parens"
      },
      {
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.selector.end.js"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.selector.begin.js"
          }
        },
        "end": "'",
        "patterns": [
          {
            "include": "#css-selector"
          }
        ]
      },
      {
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.selector.end.js"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.selector.begin.js"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "include": "#css-selector"
          }
        ]
      },
      {
        "include": "source.js"
      }
    ]
  },
  {
    "name": "support.function.js.jquery",
    "match": "\\.(addClass|after|append|attr|background|before|bind|blur|change|click|color|css|dblclick|domManip|each|empty|end|error|extend|fadeIn|fadeOut|fadeTo|float|focus|get|height|hide|hover|href|html|id|init|keydown|keypress|keyup|left|length|load|mousedown|mousemove|mouseout|mouseover|mouseup|name|oneblur|onechange|oneclick|onedblclick|oneerror|onefocus|onekeydown|onekeypress|onekeyup|oneload|onemousedown|onemousemove|onemouseout|onemouseover|onemouseup|onereset|oneresize|onescroll|oneselect|onesubmit|oneunload|overflow|position|prepend|pushStack|ready|rel|removeClass|reset|resize|scroll|select|show|size|slideDown|slideUp|src|submit|text|title|toggle|toggleClass|top|trigger|unbind|unblur|unchange|unclick|undblclick|unerror|unfocus|unkeydown|unkeypress|unkeyup|unload|unmousedown|unmousemove|unmouseout|unmouseover|unmouseup|unreset|unresize|unscroll|unselect|unsubmit|ununload|val|width|wrap)\\b"
  },
  {
    "include": "source.js"
  }
];

exports.jQuery (JavaScript)Syntax = new TextmateSyntax(repositories, patterns);
