"define metadata";
({
    "description": "XHTML 1.0 Strict syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "XHTML 1.0 Strict",
            "pointer": "#XHTML 1.0 StrictSyntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "tag-td": {
    "begin": "(<(td)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.block.td.html"
      },
      "4": {
        "name": "entity.name.tag.block.td.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.block.td.html"
      },
      "2": {
        "name": "entity.name.tag.block.td.html"
      }
    },
    "end": "((/>)|((td)>))",
    "patterns": [
      {
        "begin": "(?<=[^/]>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.td.html"
          }
        },
        "end": "(</(?=td))",
        "patterns": [
          {
            "include": "#tag-group-flow"
          }
        ]
      },
      {
        "name": "meta.tag.block.td.html",
        "begin": "",
        "end": "((?=/>)|>)",
        "patterns": [
          {
            "include": "#attribute-abbr"
          },
          {
            "include": "#attribute-align"
          },
          {
            "include": "#attribute-axis"
          },
          {
            "include": "#attribute-char"
          },
          {
            "include": "#attribute-charoff"
          },
          {
            "include": "#attribute-colspan"
          },
          {
            "include": "#attribute-headers"
          },
          {
            "include": "#attribute-rowspan"
          },
          {
            "include": "#attribute-scope"
          },
          {
            "include": "#attribute-valign"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-button": {
    "begin": "(<(button)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.form.button.html"
      },
      "4": {
        "name": "entity.name.tag.form.button.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.form.button.html"
      },
      "2": {
        "name": "entity.name.tag.form.button.html"
      }
    },
    "end": "((/>)|((button)>))",
    "patterns": [
      {
        "begin": "(?<=[^/]>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.form.button.html"
          }
        },
        "end": "(</(?=button))",
        "patterns": [
          {
            "include": "#tag-group-button.content"
          }
        ]
      },
      {
        "name": "meta.tag.form.button.html",
        "begin": "",
        "end": "((?=/>)|>)",
        "patterns": [
          {
            "include": "#attribute-disabled"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-type-button"
          },
          {
            "include": "#attribute-value"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-group-focus"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-tabindex": {
    "begin": "(tabindex)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-iframe": {
    "begin": "(<(iframe)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.iframe.html"
      },
      "2": {
        "name": "entity.name.tag.block.iframe.html"
      }
    },
    "end": "((iframe)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.iframe.html"
          }
        },
        "end": "(</(?=iframe))",
        "patterns": [
          {
            "include": "#tag-group-flow"
          },
          {
            "include": "#sgml-declarations"
          },
          {
            "include": "#entities"
          }
        ]
      },
      {
        "name": "meta.tag.block.iframe.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-frameborder"
          },
          {
            "include": "#attribute-height"
          },
          {
            "include": "#attribute-longdesc"
          },
          {
            "include": "#attribute-marginheight"
          },
          {
            "include": "#attribute-marginwidth"
          },
          {
            "include": "#attribute-scrolling"
          },
          {
            "include": "#attribute-src"
          },
          {
            "include": "#attribute-width"
          },
          {
            "include": "#attributes-group-core"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-group-special.pre": {
    "patterns": [
      {
        "include": "#tag-br"
      },
      {
        "include": "#tag-span"
      },
      {
        "include": "#tag-bdo"
      },
      {
        "include": "#tag-map"
      }
    ]
  },
  "xml-preprocessor": {
    "comment": "Bug: Too general, needs to highlight errors better.",
    "begin": "<\\?([\\w-]*)",
    "name": "meta.tag.preprocessor.xml.html",
    "captures": {
      "1": {
        "name": "entity.name.tag.xml.html"
      }
    },
    "end": "\\?>",
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "captures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          },
          "3": {
            "name": "string.quoted.double.html"
          },
          "4": {
            "name": "string.quoted.single.html"
          },
          "5": {
            "name": "string.unquoted.html"
          }
        },
        "match": "([\\w-]*)=((\".*?\")|('.*?')|((\\?(?!>)|[^\"'>\\s\\?])+))"
      }
    ]
  },
  "attribute-codebase": {
    "begin": "(codebase)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-html": {
    "begin": "(<(html)\\b)",
    "name": "meta.section.html.html.xhtml.1-strict",
    "captures": {
      "1": {
        "name": "meta.tag.segment.html.html"
      },
      "2": {
        "name": "entity.name.tag.segment.html.html"
      }
    },
    "end": "((html)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.segment.html.html"
          }
        },
        "end": "(</(?=html))",
        "patterns": [
          {
            "include": "#tag-head"
          },
          {
            "include": "#tag-body"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.segment.html.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-xmlns"
          },
          {
            "include": "#attributes-group-i18n"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-group-block-master": {
    "patterns": [
      {
        "include": "#tag-group-block"
      },
      {
        "include": "#tag-group-misc"
      },
      {
        "include": "#tag-form"
      }
    ]
  },
  "attribute-usemap": {
    "begin": "(usemap)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-group-a.content": {
    "patterns": [
      {
        "include": "#tag-group-special"
      },
      {
        "include": "#tag-group-fontstyle"
      },
      {
        "include": "#tag-group-phrase"
      },
      {
        "include": "#tag-group-inline.forms"
      },
      {
        "include": "#tag-group-misc.inline"
      },
      {
        "include": "#pcdata"
      }
    ]
  },
  "tag-group-inline-master": {
    "patterns": [
      {
        "include": "#tag-group-inline"
      },
      {
        "include": "#tag-group-misc.inline"
      },
      {
        "include": "#pcdata"
      }
    ]
  },
  "tag-group-lists": {
    "patterns": [
      {
        "include": "#tag-ul"
      },
      {
        "include": "#tag-ol"
      },
      {
        "include": "#tag-dl"
      }
    ]
  },
  "tag-col": {
    "begin": "(<(col)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.block.col.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.block.col.html"
      },
      "2": {
        "name": "entity.name.tag.block.col.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.block.col.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attribute-align"
          },
          {
            "include": "#attribute-char"
          },
          {
            "include": "#attribute-charoff"
          },
          {
            "include": "#attribute-span"
          },
          {
            "include": "#attribute-valign"
          },
          {
            "include": "#attribute-width-multi"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-abbr": {
    "begin": "(abbr)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-br": {
    "begin": "(<(br)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.block.br.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.block.br.html"
      },
      "2": {
        "name": "entity.name.tag.block.br.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.block.br.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attributes-group-core"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-disabled": {
    "begin": "(disabled)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')disabled(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')disabled(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-marginheight": {
    "begin": "(marginheight)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-scrolling": {
    "begin": "(scrolling)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(yes|no|auto)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(yes|no|auto)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-del": {
    "begin": "(<(del)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.del.html"
      },
      "2": {
        "name": "entity.name.tag.inline.del.html"
      }
    },
    "end": "((del)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.del.html"
          }
        },
        "end": "(</(?=del))",
        "patterns": [
          {
            "include": "#tag-group-flow"
          }
        ]
      },
      {
        "name": "meta.tag.inline.del.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-cite"
          },
          {
            "include": "#attribute-datetime"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-charset": {
    "begin": "(charset)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-rules": {
    "begin": "(rules)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(none|groups|rows|cols|all)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(none|groups|rows|cols|all)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-codetype": {
    "begin": "(codetype)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-href": {
    "begin": "(href)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-code": {
    "begin": "(<(code)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.code.html"
      },
      "2": {
        "name": "entity.name.tag.inline.code.html"
      }
    },
    "end": "((code)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.code.html"
          }
        },
        "end": "(</(?=code))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.code.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-th": {
    "begin": "(<(th)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.block.th.html"
      },
      "4": {
        "name": "entity.name.tag.block.th.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.block.th.html"
      },
      "2": {
        "name": "entity.name.tag.block.th.html"
      }
    },
    "end": "((/>)|((th)>))",
    "patterns": [
      {
        "begin": "(?<=[^/]>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.th.html"
          }
        },
        "end": "(</(?=th))",
        "patterns": [
          {
            "include": "#tag-group-flow"
          }
        ]
      },
      {
        "name": "meta.tag.block.th.html",
        "begin": "",
        "end": "((?=/>)|>)",
        "patterns": [
          {
            "include": "#attribute-abbr"
          },
          {
            "include": "#attribute-align"
          },
          {
            "include": "#attribute-axis"
          },
          {
            "include": "#attribute-char"
          },
          {
            "include": "#attribute-charoff"
          },
          {
            "include": "#attribute-colspan"
          },
          {
            "include": "#attribute-headers"
          },
          {
            "include": "#attribute-rowspan"
          },
          {
            "include": "#attribute-scope"
          },
          {
            "include": "#attribute-valign"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-noscript": {
    "begin": "(<(noscript)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.noscript.html"
      },
      "2": {
        "name": "entity.name.tag.block.noscript.html"
      }
    },
    "end": "((noscript)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.noscript.html"
          }
        },
        "end": "(</(?=noscript))",
        "patterns": [
          {
            "include": "#tag-group-block-master"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.noscript.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-title": {
    "begin": "(title)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-ins": {
    "begin": "(<(ins)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.ins.html"
      },
      "2": {
        "name": "entity.name.tag.inline.ins.html"
      }
    },
    "end": "((ins)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.ins.html"
          }
        },
        "end": "(</(?=ins))",
        "patterns": [
          {
            "include": "#tag-group-flow"
          }
        ]
      },
      {
        "name": "meta.tag.inline.ins.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-cite"
          },
          {
            "include": "#attribute-datetime"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-onsubmit": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onsubmit)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "attribute-valuetype": {
    "begin": "(valuetype)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(data|ref|object)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(data|ref|object)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-align": {
    "begin": "(align)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(left|center|right|justify|char)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(left|center|right|justify|char)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-cellpadding": {
    "begin": "(cellpadding)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-group-misc.inline": {
    "patterns": [
      {
        "include": "#tag-ins"
      },
      {
        "include": "#tag-del"
      },
      {
        "include": "#tag-script"
      }
    ]
  },
  "tag-hr": {
    "begin": "(<(hr)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.block.hr.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.block.hr.html"
      },
      "2": {
        "name": "entity.name.tag.block.hr.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.block.hr.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "sgml-comment": {
    "comment": "Does not allow the closing bracket to be on a diff line that the --, which as far as I can tell is legal.",
    "begin": "<!--",
    "name": "comment.block.html",
    "end": "--\\s*>",
    "patterns": [
      {
        "name": "invalid.deprecated.bad-comment-ending-token.html",
        "match": "--(?!\\s*>)"
      }
    ]
  },
  "attributes-group-focus": {
    "patterns": [
      {
        "include": "#attribute-accesskey"
      },
      {
        "include": "#attribute-tabindex"
      },
      {
        "include": "#attribute-onfocus"
      },
      {
        "include": "#attribute-onblur"
      }
    ]
  },
  "attribute-declare": {
    "begin": "(declare)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')declare(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')declare(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-meta": {
    "begin": "(<(meta)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.meta.meta.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.meta.meta.html"
      },
      "2": {
        "name": "entity.name.tag.meta.meta.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.meta.meta.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attribute-id"
          },
          {
            "include": "#attribute-content"
          },
          {
            "include": "#attribute-http-equiv"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-scheme"
          },
          {
            "include": "#attributes-group-i18n"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-small": {
    "begin": "(<(small)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.small.html"
      },
      "2": {
        "name": "entity.name.tag.inline.small.html"
      }
    },
    "end": "((small)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.small.html"
          }
        },
        "end": "(</(?=small))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.small.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-src": {
    "begin": "(src)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-caption": {
    "begin": "(<(caption)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.caption.html"
      },
      "2": {
        "name": "entity.name.tag.block.caption.html"
      }
    },
    "end": "((caption)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.caption.html"
          },
          "2": {
            "name": "entity.name.tag.block.caption.html"
          }
        },
        "end": "(</(?=caption))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.caption.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-defer": {
    "begin": "(defer)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')defer(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')defer(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-abbr": {
    "begin": "(<(abbr)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.abbr.html"
      },
      "2": {
        "name": "entity.name.tag.inline.abbr.html"
      }
    },
    "end": "((abbr)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.abbr.html"
          }
        },
        "end": "(</(?=abbr))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.abbr.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-onload": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onload)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "tag-option": {
    "begin": "(<(option)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.block.option.html"
      },
      "4": {
        "name": "entity.name.tag.block.option.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.block.option.html"
      },
      "2": {
        "name": "entity.name.tag.block.option.html"
      }
    },
    "end": "((/>)|((option)>))",
    "patterns": [
      {
        "begin": "(?<=[^/]>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.option.html"
          }
        },
        "end": "(</(?=option))",
        "patterns": [
          {
            "include": "#pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.option.html",
        "begin": "",
        "end": "((?=/>)|>)",
        "patterns": [
          {
            "include": "#attribute-disabled"
          },
          {
            "include": "#attribute-label"
          },
          {
            "include": "#attribute-selected"
          },
          {
            "include": "#attribute-value"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-group-misc": {
    "patterns": [
      {
        "include": "#tag-group-misc.inline"
      },
      {
        "include": "#tag-noscript"
      }
    ]
  },
  "tag-a": {
    "begin": "(<(a)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.a.html"
      },
      "2": {
        "name": "entity.name.tag.inline.a.html"
      }
    },
    "end": "((a)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.a.html"
          }
        },
        "end": "(</(?=a))",
        "patterns": [
          {
            "include": "#tag-group-a.content"
          }
        ]
      },
      {
        "name": "meta.tag.inline.a.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-charset"
          },
          {
            "include": "#attribute-href"
          },
          {
            "include": "#attribute-hreflang"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-rel"
          },
          {
            "include": "#attribute-rev"
          },
          {
            "include": "#attribute-target"
          },
          {
            "include": "#attribute-type"
          },
          {
            "include": "#attribute-shape"
          },
          {
            "include": "#attribute-coords"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-group-focus"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "entities": {
    "patterns": [
      {
        "name": "constant.character.entity.html",
        "match": "&([a-zA-Z]+|#[0-9]+|#x[0-9a-fA-F]+);"
      },
      {
        "name": "invalid.illegal.bad-ampersand.html",
        "match": "&(?!([a-zA-Z]+|#[0-9]+|#x[0-9a-fA-F]+);)"
      }
    ]
  },
  "attribute-media": {
    "begin": "(media)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(screen|tty|tv|projection|handheld|print|braille|aural|all)(,\\s*(screen|tty|tv|projection|handheld|print|braille|aural|all))*(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(screen|tty|tv|projection|handheld|print|braille|aural|all)(,\\s*(screen|tty|tv|projection|handheld|print|braille|aural|all))*(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-value": {
    "begin": "(value)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-type": {
    "begin": "(type)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-b": {
    "begin": "(<(b)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.b.html"
      },
      "2": {
        "name": "entity.name.tag.inline.b.html"
      }
    },
    "end": "((b)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.b.html"
          }
        },
        "end": "(</(?=b))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.b.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-marginwidth": {
    "begin": "(marginwidth)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-readonly": {
    "begin": "(readonly)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')readonly(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')readonly(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-headers": {
    "begin": "(headers)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[a-zA-Z][a-zA-Z0-9\\-_:.]*(\\s+[a-zA-Z][a-zA-Z0-9\\-_:.]*)*(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[a-zA-Z][a-zA-Z0-9\\-_:.]*(\\s+[a-zA-Z][a-zA-Z0-9\\-_:.]*)*(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-input": {
    "begin": "(<(input)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.form.input.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.form.input.html"
      },
      "2": {
        "name": "entity.name.tag.form.input.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.form.input.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attribute-accept"
          },
          {
            "include": "#attribute-alt"
          },
          {
            "include": "#attribute-checked"
          },
          {
            "include": "#attribute-disabled"
          },
          {
            "include": "#attribute-maxlength"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-onchange"
          },
          {
            "include": "#attribute-onselect"
          },
          {
            "include": "#attribute-readonly"
          },
          {
            "include": "#attribute-size"
          },
          {
            "include": "#attribute-src"
          },
          {
            "include": "#attribute-type-input"
          },
          {
            "include": "#attribute-usemap"
          },
          {
            "include": "#attribute-value"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-group-focus"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-address": {
    "begin": "(<(address)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.address.html"
      },
      "2": {
        "name": "entity.name.tag.block.address.html"
      }
    },
    "end": "((address)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.address.html"
          }
        },
        "end": "(</(?=address))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.address.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-datapagesize": {
    "begin": "(datapagesize)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-big": {
    "begin": "(<(big)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.big.html"
      },
      "2": {
        "name": "entity.name.tag.inline.big.html"
      }
    },
    "end": "((big)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.big.html"
          }
        },
        "end": "(</(?=big))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.big.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-lang": {
    "comment": "Bug: This may not take into account all possible characters in NMTOKEN.",
    "begin": "(lang)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "[\\w\\-:]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "[\\w\\-:]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-table": {
    "begin": "(<(table)\\b)",
    "name": "meta.section.html.table.xhtml.1-strict",
    "captures": {
      "1": {
        "name": "meta.tag.block.table.html"
      },
      "2": {
        "name": "entity.name.tag.block.table.html"
      }
    },
    "end": "((table)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.table.html"
          }
        },
        "end": "(</(?=table))",
        "patterns": [
          {
            "include": "#tag-caption"
          },
          {
            "begin": "(?<=</caption>)",
            "end": "(?=<(?!/?caption))",
            "patterns": [
              {
                "include": "#stray-char"
              },
              {
                "include": "#sgml-declarations"
              }
            ]
          },
          {
            "begin": "(?=<(?!/?table))",
            "end": "(?=</table)",
            "patterns": [
              {
                "begin": "(?=<(colgroup|col))",
                "comment": "Bug: This should use the generic invalid tag.",
                "applyEndPatternLast": "1",
                "end": "(?=<)",
                "patterns": [
                  {
                    "begin": "(?=<colgroup)",
                    "end": "(?=<(?!colgroup|col))",
                    "patterns": [
                      {
                        "include": "#tag-colgroup"
                      },
                      {
                        "include": "#stray-char"
                      },
                      {
                        "include": "#sgml-declarations"
                      }
                    ]
                  },
                  {
                    "begin": "(?=<col)",
                    "end": "(?=<(?!colgroup|col))",
                    "patterns": [
                      {
                        "include": "#tag-col"
                      },
                      {
                        "include": "#stray-char"
                      },
                      {
                        "include": "#sgml-declarations"
                      }
                    ]
                  }
                ]
              },
              {
                "begin": "(?=<(?!/?table))",
                "end": "(?=</table)",
                "patterns": [
                  {
                    "include": "#tag-thead"
                  },
                  {
                    "begin": "(?<=</thead>)",
                    "end": "(?=</table)",
                    "patterns": [
                      {
                        "include": "#tag-tfoot"
                      },
                      {
                        "begin": "(?<=</tfoot>)",
                        "end": "(?=</table)",
                        "patterns": [
                          {
                            "include": "#tag-tbody"
                          },
                          {
                            "include": "#stray-char"
                          },
                          {
                            "include": "#sgml-declarations"
                          }
                        ]
                      },
                      {
                        "begin": "(?=<(?!/?table))",
                        "end": "(?=</table)",
                        "patterns": [
                          {
                            "include": "#tag-tbody"
                          },
                          {
                            "include": "#stray-char"
                          },
                          {
                            "include": "#sgml-declarations"
                          }
                        ]
                      },
                      {
                        "include": "#stray-char"
                      },
                      {
                        "include": "#sgml-declarations"
                      }
                    ]
                  },
                  {
                    "begin": "(?=<(?!/?table))",
                    "end": "(?=</table)",
                    "patterns": [
                      {
                        "include": "#tag-tfoot"
                      },
                      {
                        "begin": "(?<=</tfoot>)",
                        "end": "(?=</table)",
                        "patterns": [
                          {
                            "include": "#tag-tbody"
                          },
                          {
                            "include": "#stray-char"
                          },
                          {
                            "include": "#sgml-declarations"
                          }
                        ]
                      },
                      {
                        "begin": "(?=<(?!/?table))",
                        "end": "(?=</table)",
                        "patterns": [
                          {
                            "begin": "(?=<tbody)",
                            "end": "(?=</table)",
                            "patterns": [
                              {
                                "include": "#tag-tbody"
                              },
                              {
                                "include": "#stray-char"
                              },
                              {
                                "include": "#sgml-declarations"
                              }
                            ]
                          },
                          {
                            "begin": "(?=<tr)",
                            "end": "(?=</table)",
                            "patterns": [
                              {
                                "include": "#tag-tr"
                              },
                              {
                                "include": "#stray-char"
                              },
                              {
                                "include": "#sgml-declarations"
                              }
                            ]
                          },
                          {
                            "include": "#stray-char"
                          },
                          {
                            "include": "#sgml-declarations"
                          }
                        ]
                      },
                      {
                        "include": "#stray-char"
                      },
                      {
                        "include": "#sgml-declarations"
                      }
                    ]
                  },
                  {
                    "include": "#stray-char"
                  },
                  {
                    "include": "#sgml-declarations"
                  }
                ]
              },
              {
                "include": "#stray-char"
              },
              {
                "include": "#sgml-declarations"
              }
            ]
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.table.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-border"
          },
          {
            "include": "#attribute-cellpadding"
          },
          {
            "include": "#attribute-cellspacing"
          },
          {
            "include": "#attribute-frame"
          },
          {
            "include": "#attribute-rules"
          },
          {
            "include": "#attribute-summary"
          },
          {
            "include": "#attribute-width"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-shape": {
    "begin": "(shape)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(rect|circle|poly|default)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(rect|circle|poly|default)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-rowspan": {
    "begin": "(rowspan)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-legend": {
    "begin": "(<(legend)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.legend.html"
      },
      "2": {
        "name": "entity.name.tag.block.legend.html"
      }
    },
    "end": "((legend)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.legend.html"
          }
        },
        "end": "(</(?=legend))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.legend.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-accesskey"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-frame": {
    "begin": "(frame)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(void|above|below|hsides|lhs|rhs|vsides|box|border)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(void|above|below|hsides|lhs|rhs|vsides|box|border)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-li": {
    "begin": "(<(li)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.li.html"
      },
      "2": {
        "name": "entity.name.tag.block.li.html"
      }
    },
    "end": "((li)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.li.html"
          }
        },
        "end": "(</(?=li))",
        "patterns": [
          {
            "include": "#tag-group-flow"
          }
        ]
      },
      {
        "name": "meta.tag.block.li.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-selected": {
    "begin": "(selected)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')selected(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')selected(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-group-inline": {
    "patterns": [
      {
        "include": "#tag-a"
      },
      {
        "include": "#tag-group-special"
      },
      {
        "include": "#tag-group-fontstyle"
      },
      {
        "include": "#tag-group-phrase"
      },
      {
        "include": "#tag-group-inline.forms"
      }
    ]
  },
  "attribute-onunload": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onunload)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "values-generic-invalid": {
    "patterns": [
      {
        "name": "invalid.illegal.incorrect-value.html",
        "match": "(?<=\"|').*?(?=\"|')"
      }
    ]
  },
  "attribute-rows": {
    "begin": "(rows)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-accept": {
    "begin": "(accept)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-h1": {
    "begin": "(<(h1)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.h1.html"
      },
      "2": {
        "name": "entity.name.tag.block.h1.html"
      }
    },
    "end": "((h1)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.h1.html"
          }
        },
        "end": "(</(?=h1))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.h1.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-rel": {
    "begin": "(rel)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-accept-charset": {
    "begin": "(accept-charset)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-tr": {
    "begin": "(<(tr)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.tr.html"
      },
      "2": {
        "name": "entity.name.tag.block.tr.html"
      }
    },
    "end": "((tr)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.tr.html"
          }
        },
        "end": "(</(?=tr))",
        "patterns": [
          {
            "include": "#tag-td"
          },
          {
            "include": "#tag-th"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.tr.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-align"
          },
          {
            "include": "#attribute-char"
          },
          {
            "include": "#attribute-charoff"
          },
          {
            "include": "#attribute-valign"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-blockquote": {
    "begin": "(<(blockquote)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.blockquote.html"
      },
      "2": {
        "name": "entity.name.tag.block.blockquote.html"
      }
    },
    "end": "((blockquote)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.blockquote.html"
          }
        },
        "end": "(</(?=blockquote))",
        "patterns": [
          {
            "include": "#tag-group-block-master"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.blockquote.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-cite"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-h2": {
    "begin": "(<(h2)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.h2.html"
      },
      "2": {
        "name": "entity.name.tag.block.h2.html"
      }
    },
    "end": "((h2)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.h2.html"
          }
        },
        "end": "(</(?=h2))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.h2.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-object": {
    "begin": "(<(object)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.object.object.html"
      },
      "4": {
        "name": "entity.name.tag.object.object.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.object.object.html"
      },
      "2": {
        "name": "entity.name.tag.object.object.html"
      }
    },
    "end": "((/>)|((object)>))",
    "patterns": [
      {
        "begin": "(?<=[^/]>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.object.object.html"
          }
        },
        "end": "(</(?=object))",
        "patterns": [
          {
            "include": "#tag-group-block"
          },
          {
            "include": "#tag-group-inline"
          },
          {
            "include": "#tag-group-misc"
          },
          {
            "include": "#tag-param"
          },
          {
            "include": "#tag-form"
          },
          {
            "include": "#pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.object.object.html",
        "begin": "",
        "end": "((?=/>)|>)",
        "patterns": [
          {
            "include": "#attribute-classid"
          },
          {
            "include": "#attribute-codebase"
          },
          {
            "include": "#attribute-codetype"
          },
          {
            "include": "#attribute-data"
          },
          {
            "include": "#attribute-declare"
          },
          {
            "include": "#attribute-height"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-standby"
          },
          {
            "include": "#attribute-tabindex"
          },
          {
            "include": "#attribute-type"
          },
          {
            "include": "#attribute-usemap"
          },
          {
            "include": "#attribute-width"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-dd": {
    "begin": "(<(dd)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.dd.html"
      },
      "2": {
        "name": "entity.name.tag.block.dd.html"
      }
    },
    "end": "((dd)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.dd.html"
          }
        },
        "end": "(</(?=dd))",
        "patterns": [
          {
            "include": "#tag-group-flow"
          }
        ]
      },
      {
        "name": "meta.tag.block.dd.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-title": {
    "begin": "(<(title)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.title.html"
      },
      "2": {
        "name": "entity.name.tag.block.title.html"
      }
    },
    "end": "((title)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.title.html"
          }
        },
        "end": "(</(?=title))",
        "patterns": [
          {
            "include": "#pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.title.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-id"
          },
          {
            "include": "#attributes-group-i18n"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-group-fontstyle": {
    "patterns": [
      {
        "include": "#tag-tt"
      },
      {
        "include": "#tag-i"
      },
      {
        "include": "#tag-b"
      },
      {
        "include": "#tag-big"
      },
      {
        "include": "#tag-small"
      }
    ]
  },
  "tag-group-flow": {
    "patterns": [
      {
        "include": "#tag-group-block"
      },
      {
        "include": "#tag-group-inline"
      },
      {
        "include": "#tag-group-misc"
      },
      {
        "include": "#tag-form"
      },
      {
        "include": "#pcdata"
      }
    ]
  },
  "tag-textarea": {
    "begin": "(<(textarea)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.form.textarea.html"
      },
      "4": {
        "name": "entity.name.tag.form.textarea.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.form.textarea.html"
      },
      "2": {
        "name": "entity.name.tag.form.textarea.html"
      }
    },
    "end": "((/>)|((textarea)>))",
    "patterns": [
      {
        "begin": "(?<=[^/]>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.form.textarea.html"
          }
        },
        "end": "(</(?=option))",
        "patterns": [
          {
            "include": "#pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.form.textarea.html",
        "begin": "",
        "end": "((?=/>)|>)",
        "patterns": [
          {
            "include": "#attribute-cols"
          },
          {
            "include": "#attribute-disabled"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-onchange"
          },
          {
            "include": "#attribute-onselect"
          },
          {
            "include": "#attribute-readonly"
          },
          {
            "include": "#attribute-rows"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-group-focus"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-h3": {
    "begin": "(<(h3)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.h3.html"
      },
      "2": {
        "name": "entity.name.tag.block.h3.html"
      }
    },
    "end": "((h3)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.h3.html"
          }
        },
        "end": "(</(?=h3))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.h3.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attributes-group-common": {
    "patterns": [
      {
        "include": "#attributes-group-core"
      },
      {
        "include": "#attributes-group-events"
      },
      {
        "include": "#attributes-group-i18n"
      }
    ]
  },
  "attribute-cols": {
    "begin": "(cols)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "no-pcdata": {
    "patterns": [
      {
        "include": "#sgml-declarations"
      },
      {
        "include": "#entities"
      },
      {
        "include": "#stray-char"
      },
      {
        "include": "#bad-tags"
      }
    ]
  },
  "tag-tt": {
    "begin": "(<(tt)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.tt.html"
      },
      "2": {
        "name": "entity.name.tag.inline.tt.html"
      }
    },
    "end": "((tt)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.tt.html"
          }
        },
        "end": "(</(?=tt))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.tt.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-h4": {
    "begin": "(<(h4)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.h4.html"
      },
      "2": {
        "name": "entity.name.tag.block.h4.html"
      }
    },
    "end": "((h4)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.h4.html"
          }
        },
        "end": "(</(?=h4))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.h4.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-colgroup": {
    "begin": "(<(colgroup)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.block.colgroup.html"
      },
      "4": {
        "name": "entity.name.tag.block.colgroup.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.block.colgroup.html"
      },
      "2": {
        "name": "entity.name.tag.block.colgroup.html"
      }
    },
    "end": "((/>)|((colgroup)>))",
    "patterns": [
      {
        "begin": "(?<=[^/]>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.colgroup.html"
          }
        },
        "end": "(</(?=colgroup))",
        "patterns": [
          {
            "include": "#tag-col"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.colgroup.html",
        "begin": "",
        "end": "((?=/>)|>)",
        "patterns": [
          {
            "include": "#attribute-align"
          },
          {
            "include": "#attribute-char"
          },
          {
            "include": "#attribute-charoff"
          },
          {
            "include": "#attribute-span"
          },
          {
            "include": "#attribute-valign"
          },
          {
            "include": "#attribute-width-multi"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attributes-group-core": {
    "patterns": [
      {
        "include": "#attribute-class"
      },
      {
        "include": "#attribute-id"
      },
      {
        "include": "#attribute-title"
      },
      {
        "include": "#attribute-style"
      }
    ]
  },
  "attribute-size": {
    "begin": "(size)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-axis": {
    "begin": "(axis)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-i": {
    "begin": "(<(i)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.i.html"
      },
      "2": {
        "name": "entity.name.tag.inline.i.html"
      }
    },
    "end": "((i)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.i.html"
          }
        },
        "end": "(</(?=i))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.i.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-onreset": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onreset)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "tag-cite": {
    "begin": "(<(cite)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.cite.html"
      },
      "2": {
        "name": "entity.name.tag.inline.cite.html"
      }
    },
    "end": "((cite)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.cite.html"
          }
        },
        "end": "(</(?=cite))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.cite.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "pcdata": {
    "patterns": [
      {
        "include": "#sgml-declarations"
      },
      {
        "include": "#entities"
      },
      {
        "include": "#bad-tags"
      }
    ]
  },
  "tag-area": {
    "begin": "(<(area)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.meta.area.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.meta.area.html"
      },
      "2": {
        "name": "entity.name.tag.meta.area.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.meta.area.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attribute-alt"
          },
          {
            "include": "#attribute-coords"
          },
          {
            "include": "#attribute-href"
          },
          {
            "include": "#attribute-nohref"
          },
          {
            "include": "#attribute-shape"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-group-focus"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-xml:lang": {
    "comment": "Bug: This may not take into account all possible characters in NMTOKEN.",
    "begin": "(xml:lang)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "[\\w\\-:]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "[\\w\\-:]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-width": {
    "begin": "(width)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-ol": {
    "begin": "(<(ol)\\b)",
    "name": "meta.section.html.ol.xhtml.1-strict",
    "captures": {
      "1": {
        "name": "meta.tag.block.ol.html"
      },
      "2": {
        "name": "entity.name.tag.block.ol.html"
      }
    },
    "end": "((ol)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.ol.html"
          }
        },
        "end": "(</(?=ol))",
        "patterns": [
          {
            "include": "#tag-li"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.ol.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-border": {
    "begin": "(border)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-hreflang": {
    "comment": "Bug: This may not take into account all possible characters in NMTOKEN.",
    "begin": "(hreflang)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "[\\w\\-:]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "[\\w\\-:]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-h5": {
    "begin": "(<(h5)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.h5.html"
      },
      "2": {
        "name": "entity.name.tag.block.h5.html"
      }
    },
    "end": "((h5)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.h5.html"
          }
        },
        "end": "(</(?=h5))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.h5.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-style": {
    "begin": "(style)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "contentName": "source.css.embedded.html",
        "patterns": [
          {
            "include": "source.css"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "contentName": "source.css.embedded.html",
        "patterns": [
          {
            "include": "source.css"
          }
        ]
      }
    ]
  },
  "tag-group-special": {
    "patterns": [
      {
        "include": "#tag-group-special.pre"
      },
      {
        "include": "#tag-object"
      },
      {
        "include": "#tag-img"
      },
      {
        "include": "#tag-h4"
      },
      {
        "include": "#tag-h5"
      },
      {
        "include": "#tag-h6"
      }
    ]
  },
  "attribute-profile": {
    "begin": "(profile)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-img": {
    "begin": "(<(img)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.object.img.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.object.img.html"
      },
      "2": {
        "name": "entity.name.tag.object.img.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.object.img.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attribute-alt"
          },
          {
            "include": "#attribute-height"
          },
          {
            "include": "#attribute-usemap"
          },
          {
            "include": "#attribute-ismap"
          },
          {
            "include": "#attribute-longdesc"
          },
          {
            "include": "#attribute-src"
          },
          {
            "include": "#attribute-width"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attributes-illegal_char": {
    "name": "invalid.illegal.unrecognized-character.html",
    "match": "/(?!>)|[^\\s/>]"
  },
  "attribute-method": {
    "begin": "(method)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(get|post)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(get|post)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-accesskey": {
    "comment": "Bug: Does not correctly represent the single Character attribute.",
    "begin": "(accesskey)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[[:alnum:]](?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[[:alnum:]](?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-target": {
    "begin": "(target)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-group-phrase": {
    "patterns": [
      {
        "include": "#tag-em"
      },
      {
        "include": "#tag-strong"
      },
      {
        "include": "#tag-dfn"
      },
      {
        "include": "#tag-code"
      },
      {
        "include": "#tag-q"
      },
      {
        "include": "#tag-samp"
      },
      {
        "include": "#tag-kbd"
      },
      {
        "include": "#tag-var"
      },
      {
        "include": "#tag-cite"
      },
      {
        "include": "#tag-abbr"
      },
      {
        "include": "#tag-acronym"
      },
      {
        "include": "#tag-sub"
      },
      {
        "include": "#tag-sup"
      }
    ]
  },
  "attribute-type-button": {
    "begin": "(type)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(button|submit|reset)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(button|submit|reset)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-classid": {
    "begin": "(classid)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-h6": {
    "begin": "(<(h6)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.h6.html"
      },
      "2": {
        "name": "entity.name.tag.block.h6.html"
      }
    },
    "end": "((h6)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.h6.html"
          }
        },
        "end": "(</(?=h6))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.h6.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-dfn": {
    "begin": "(<(dfn)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.dfn.html"
      },
      "2": {
        "name": "entity.name.tag.inline.dfn.html"
      }
    },
    "end": "((dfn)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.dfn.html"
          }
        },
        "end": "(</(?=dfn))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.dfn.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-action": {
    "begin": "(action)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-for": {
    "begin": "(for)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-summary": {
    "begin": "(summary)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-label": {
    "begin": "(label)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-label": {
    "begin": "(<(label)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.label.html"
      },
      "2": {
        "name": "entity.name.tag.inline.label.html"
      }
    },
    "end": "((label)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.label.html"
          }
        },
        "end": "(</(?=label))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.label.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-accesskey"
          },
          {
            "include": "#attribute-for"
          },
          {
            "include": "#attribute-onblur"
          },
          {
            "include": "#attribute-onfocus"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-xmlns": {
    "begin": "(xmlns)\\s*=\\s*(?=([\"']).*?[\"'][^\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')http://www.w3.org/1999/xhtml(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')http://www.w3.org/1999/xhtml(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-longdesc": {
    "begin": "(longdesc)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-sub": {
    "begin": "(<(sub)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.sub.html"
      },
      "2": {
        "name": "entity.name.tag.inline.sub.html"
      }
    },
    "end": "((sub)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.sub.html"
          }
        },
        "end": "(</(?=sub))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.sub.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-acronym": {
    "begin": "(<(acronym)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.acronym.html"
      },
      "2": {
        "name": "entity.name.tag.inline.acronym.html"
      }
    },
    "end": "((acronym)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.acronym.html"
          }
        },
        "end": "(</(?=acronym))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.acronym.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-cite": {
    "begin": "(cite)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-ul": {
    "begin": "(<(ul)\\b)",
    "name": "meta.section.html.ul.xhtml.1-strict",
    "captures": {
      "1": {
        "name": "meta.tag.block.ul.html"
      },
      "2": {
        "name": "entity.name.tag.block.ul.html"
      }
    },
    "end": "((ul)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.ul.html"
          }
        },
        "end": "(</(?=ul))",
        "patterns": [
          {
            "include": "#tag-li"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.ul.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-http-equiv": {
    "comment": "Bug: This may not take into account all possible characters in NMTOKEN.",
    "begin": "(http-equiv)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "[\\w\\-:]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "[\\w\\-:]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-id": {
    "begin": "(id)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[a-zA-Z][a-zA-Z0-9\\-_:.]*(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[a-zA-Z][a-zA-Z0-9\\-_:.]*(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-checked": {
    "begin": "(checked)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')checked(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')checked(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-dl": {
    "begin": "(<(dl)\\b)",
    "name": "meta.section.html.dl.xhtml.1-strict",
    "captures": {
      "1": {
        "name": "meta.tag.block.dl.html"
      },
      "2": {
        "name": "entity.name.tag.block.dl.html"
      }
    },
    "end": "((dl)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.dl.html"
          }
        },
        "end": "(</(?=dl))",
        "patterns": [
          {
            "include": "#tag-dt"
          },
          {
            "include": "#tag-dd"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.dl.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "bad-tags": {
    "patterns": [
      {
        "name": "invalid.illegal.invalid_placement",
        "begin": "</?(a|abbr|acronym|address|area|b|base|bdo|big|blockquote|body|br|button|caption|cite|code|col|colgroup|dd|del|dfn|div|dl|dt|em|fieldset|form|h[1-6]|head|hr|html|i|img|input|ins|kbd|label|legend|li|link|map|meta|noscript|object|ol|optgroup|option|p|param|pre|q|samp|script|select|small|span|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|ul|var)\\b",
        "captures": {
          "1": {
            "name": "invalid.deprecated.invalid_placement"
          }
        },
        "end": ">"
      },
      {
        "name": "invalid.illegal.unrecognized_tag",
        "begin": "</?(basefont|center|dir|font|isindex|menu|s|strike|u)\\b",
        "captures": {
          "1": {
            "name": "invalid.deprecated.no_longer_valid"
          }
        },
        "end": ">"
      },
      {
        "name": "invalid.illegal.unrecognized_tag",
        "begin": "<",
        "end": ">"
      }
    ]
  },
  "attribute-archive": {
    "begin": "(archive)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-nohref": {
    "begin": "(nohref)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')nohref(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')nohref(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-datetime": {
    "begin": "(datetime)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{4}-(0[1-9]|1[012])-((?!00|3[2-9])[0-3][0-9])T((?!2[4-9])[0-2][0-9]):[0-5][0-9]:[0-5][0-9](Z|[-+]((?!2[4-9])[0-2][0-9]):[0-5][0-9]))(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{4}-(0[1-9]|1[012])-((?!00|3[2-9])[0-3][0-9])T((?!2[4-9])[0-2][0-9]):[0-5][0-9]:[0-5][0-9](Z|[-+]((?!2[4-9])[0-2][0-9]):[0-5][0-9]))(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-kbd": {
    "begin": "(<(kbd)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.kbd.html"
      },
      "2": {
        "name": "entity.name.tag.inline.kbd.html"
      }
    },
    "end": "((kbd)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.kbd.html"
          }
        },
        "end": "(</(?=kbd))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.kbd.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-span": {
    "begin": "(<(span)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.span.html"
      },
      "2": {
        "name": "entity.name.tag.inline.span.html"
      }
    },
    "end": "((span)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.span.html"
          }
        },
        "end": "(</(?=span))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.span.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-var": {
    "begin": "(<(var)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.var.html"
      },
      "2": {
        "name": "entity.name.tag.inline.var.html"
      }
    },
    "end": "((var)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.var.html"
          }
        },
        "end": "(</(?=var))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.var.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-script": {
    "comment": "Bug: Invalid chars are sometimes picked up by the js syntax first.",
    "begin": "(<(script)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.block.script.html"
      },
      "4": {
        "name": "entity.name.tag.block.script.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.block.script.html"
      },
      "2": {
        "name": "entity.name.tag.block.script.html"
      }
    },
    "end": "((/>)|((script)>))",
    "patterns": [
      {
        "begin": "(?<=[^/]>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.script.html"
          }
        },
        "end": "(</(?=script))",
        "contentName": "source.js.embedded.html",
        "patterns": [
          {
            "include": "#sgml-comment"
          },
          {
            "name": "meta.scope.xml-cdata.html",
            "begin": "<!\\[CDATA\\[",
            "end": "]]>",
            "patterns": [
              {
                "include": "source.js"
              }
            ]
          },
          {
            "name": "invalid.illegal.char_not_allowed",
            "match": "<|>|]]>|--"
          },
          {
            "include": "#entities"
          },
          {
            "include": "source.js"
          }
        ]
      },
      {
        "name": "meta.tag.block.script.html",
        "begin": "",
        "end": "((?=/>)|>)",
        "patterns": [
          {
            "include": "#attribute-xml:space"
          },
          {
            "include": "#attribute-id"
          },
          {
            "include": "#attribute-defer"
          },
          {
            "include": "#attribute-src"
          },
          {
            "include": "#attribute-type"
          },
          {
            "include": "#attribute-charset"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-style": {
    "comment": "Bug: Invalid chars are sometimes picked up by the js syntax first.",
    "begin": "(<(style)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.meta.style.html"
      },
      "2": {
        "name": "entity.name.tag.meta.style.html"
      }
    },
    "end": "((style)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.meta.style.html"
          }
        },
        "end": "(</(?=style))",
        "contentName": "source.css.embedded.html",
        "patterns": [
          {
            "include": "#sgml-comment"
          },
          {
            "name": "meta.scope.xml-cdata.html",
            "begin": "<!\\[CDATA\\[",
            "end": "]]>",
            "patterns": [
              {
                "include": "source.css"
              }
            ]
          },
          {
            "name": "invalid.illegal.char_not_allowed",
            "match": "<|>|]]>|--"
          },
          {
            "include": "#entities"
          },
          {
            "include": "source.css"
          }
        ]
      },
      {
        "name": "meta.tag.meta.style.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-xml:space"
          },
          {
            "include": "#attribute-id"
          },
          {
            "include": "#attribute-title"
          },
          {
            "include": "#attribute-media"
          },
          {
            "include": "#attribute-type"
          },
          {
            "include": "#attributes-group-i18n"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-form": {
    "begin": "(<(form)\\b)",
    "name": "meta.section.html.form.xhtml.1-strict",
    "captures": {
      "1": {
        "name": "meta.tag.block.form.html"
      },
      "2": {
        "name": "entity.name.tag.block.form.html"
      }
    },
    "end": "((form)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.form.html"
          }
        },
        "end": "(</(?=form))",
        "patterns": [
          {
            "include": "#tag-group-form.content"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.form.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-accept"
          },
          {
            "include": "#attribute-accept-charset"
          },
          {
            "include": "#attribute-action"
          },
          {
            "include": "#attribute-method"
          },
          {
            "include": "#attribute-onreset"
          },
          {
            "include": "#attribute-onsubmit"
          },
          {
            "include": "#attribute-enctype"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-rev": {
    "begin": "(rev)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-group-pre.content": {
    "patterns": [
      {
        "include": "#tag-a"
      },
      {
        "include": "#tag-group-fontstyle"
      },
      {
        "include": "#tag-group-phrase"
      },
      {
        "include": "#tag-group-special.pre"
      },
      {
        "include": "#tag-group-misc.inline"
      },
      {
        "include": "#tag-group-inline.forms"
      },
      {
        "include": "#pcdata"
      }
    ]
  },
  "tag-optgroup": {
    "begin": "(<(optgroup)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.optgroup.html"
      },
      "2": {
        "name": "entity.name.tag.block.optgroup.html"
      }
    },
    "end": "((optgroup)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.optgroup.html"
          }
        },
        "end": "(</(?=optgroup))",
        "patterns": [
          {
            "include": "#tag-option"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.optgroup.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-disabled"
          },
          {
            "include": "#attribute-label"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-p": {
    "begin": "(<(p)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.p.html"
      },
      "2": {
        "name": "entity.name.tag.block.p.html"
      }
    },
    "end": "((p)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.p.html"
          }
        },
        "end": "(</(?=p))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.p.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-name": {
    "comment": "Bug: This may not take into account all possible characters in NMTOKEN.",
    "begin": "(name)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "[\\w\\-:.]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "[\\w\\-:.]+"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-ismap": {
    "begin": "(ismap)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')ismap(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')ismap(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-thead": {
    "begin": "(<(thead)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.thead.html"
      },
      "2": {
        "name": "entity.name.tag.block.thead.html"
      }
    },
    "end": "((thead)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.thead.html"
          }
        },
        "end": "(</(?=thead))",
        "patterns": [
          {
            "include": "#tag-tr"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.thead.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-align"
          },
          {
            "include": "#attribute-char"
          },
          {
            "include": "#attribute-charoff"
          },
          {
            "include": "#attribute-valign"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-q": {
    "begin": "(<(q)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.q.html"
      },
      "2": {
        "name": "entity.name.tag.inline.q.html"
      }
    },
    "end": "((q)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.q.html"
          }
        },
        "end": "(</(?=q))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.q.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-cite"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-frameborder": {
    "begin": "(frameborder)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[01](?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[01](?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-group-blocktext": {
    "patterns": [
      {
        "include": "#tag-pre"
      },
      {
        "include": "#tag-hr"
      },
      {
        "include": "#tag-blockquote"
      },
      {
        "include": "#tag-address"
      }
    ]
  },
  "tag-head": {
    "begin": "(<(head)\\b)",
    "name": "meta.section.html.head.xhtml.1-strict",
    "captures": {
      "1": {
        "name": "meta.tag.segment.head.html"
      },
      "2": {
        "name": "entity.name.tag.segment.head.html"
      }
    },
    "end": "((head)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.segment.head.html"
          }
        },
        "end": "(</(?=head))",
        "patterns": [
          {
            "include": "#tag-title"
          },
          {
            "include": "#tag-base"
          },
          {
            "include": "#tag-meta"
          },
          {
            "include": "#tag-link"
          },
          {
            "include": "#tag-object"
          },
          {
            "include": "#tag-script"
          },
          {
            "include": "#tag-style"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.segment.head.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-id"
          },
          {
            "include": "#attribute-profile"
          },
          {
            "include": "#attributes-group-i18n"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-map": {
    "begin": "(<(map)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.map.html"
      },
      "2": {
        "name": "entity.name.tag.block.map.html"
      }
    },
    "end": "((map)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.map.html"
          }
        },
        "end": "(</(?=map))",
        "patterns": [
          {
            "include": "#stray-char"
          },
          {
            "include": "#sgml-declarations"
          },
          {
            "begin": "(?=<area)",
            "end": "(?=</map)",
            "patterns": [
              {
                "include": "#tag-area"
              },
              {
                "include": "#no-pcdata"
              }
            ]
          },
          {
            "begin": "(?=<(?!/?(map|area)))",
            "end": "(?=</map)",
            "patterns": [
              {
                "include": "#tag-group-misc"
              },
              {
                "include": "#tag-group-block"
              },
              {
                "include": "#tag-form"
              },
              {
                "include": "#no-pcdata"
              }
            ]
          }
        ]
      },
      {
        "name": "meta.tag.block.map.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-class"
          },
          {
            "include": "#attribute-id"
          },
          {
            "include": "#attribute-style"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-title"
          },
          {
            "include": "#attributes-group-events"
          },
          {
            "include": "#attributes-group-i18n"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-select": {
    "begin": "(<(select)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.form.select.html"
      },
      "2": {
        "name": "entity.name.tag.form.select.html"
      }
    },
    "end": "((select)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.form.select.html"
          }
        },
        "end": "(</(?=select))",
        "patterns": [
          {
            "include": "#tag-optgroup"
          },
          {
            "include": "#tag-option"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.form.select.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-disabled"
          },
          {
            "include": "#attribute-multiple"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-onblur"
          },
          {
            "include": "#attribute-onfocus"
          },
          {
            "include": "#attribute-onchange"
          },
          {
            "include": "#attribute-size"
          },
          {
            "include": "#attribute-tabindex"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-group-button.content": {
    "patterns": [
      {
        "include": "#tag-p"
      },
      {
        "include": "#tag-group-heading"
      },
      {
        "include": "#tag-div"
      },
      {
        "include": "#tag-group-lists"
      },
      {
        "include": "#tag-group-blocktext"
      },
      {
        "include": "#tag-table"
      },
      {
        "include": "#tag-group-special"
      },
      {
        "include": "#tag-group-fontstyle"
      },
      {
        "include": "#tag-group-phrase"
      },
      {
        "include": "#tag-group-misc"
      },
      {
        "include": "#pcdata"
      }
    ]
  },
  "attribute-multiple": {
    "begin": "(multiple)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')multiple(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')multiple(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-xml:space": {
    "begin": "(xml:space)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')preserve(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')preserve(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-tfoot": {
    "begin": "(<(tfoot)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.tfoot.html"
      },
      "2": {
        "name": "entity.name.tag.block.tfoot.html"
      }
    },
    "end": "((tfoot)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.tfoot.html"
          }
        },
        "end": "(</(?=tfoot))",
        "patterns": [
          {
            "include": "#tag-tr"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.tfoot.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-align"
          },
          {
            "include": "#attribute-char"
          },
          {
            "include": "#attribute-charoff"
          },
          {
            "include": "#attribute-valign"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "values-generic-valid": {
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "include": "#entities"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "include": "#entities"
          }
        ]
      }
    ]
  },
  "attribute-valign": {
    "begin": "(valign)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(top|middle|bottom|baseline)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(top|middle|bottom|baseline)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-char": {
    "comment": "Bug: Does not correctly represent the single Character attribute.",
    "begin": "(char)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[[:alnum:]](?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[[:alnum:]](?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "stray-char": {
    "name": "invalid.illegal.character_data_not_allowed_here",
    "tooltip": "Characters not allowed here, try adding a block level tag first.",
    "match": "[^<>\\s][^<>]*"
  },
  "attribute-height": {
    "begin": "(height)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-span": {
    "begin": "(span)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attributes-group-i18n": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(dir)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "(?<!\"|')\"",
            "end": "\"",
            "patterns": [
              {
                "match": "(?<=\"|')(ltr|rtl)(?=\"|')"
              },
              {
                "include": "#values-generic-invalid"
              }
            ]
          },
          {
            "name": "string.quoted.single.html",
            "begin": "(?<!\"|')'",
            "end": "'",
            "patterns": [
              {
                "match": "(?<=\"|')(ltr|rtl)(?=\"|')"
              },
              {
                "include": "#values-generic-invalid"
              }
            ]
          }
        ]
      },
      {
        "include": "#attribute-xml:lang"
      },
      {
        "include": "#attribute-lang"
      }
    ]
  },
  "attribute-standby": {
    "begin": "(standby)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-data": {
    "begin": "(data)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-bdo": {
    "begin": "(<(bdo)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.bdo.html"
      },
      "2": {
        "name": "entity.name.tag.block.bdo.html"
      }
    },
    "end": "((bdo)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.bdo.html"
          }
        },
        "end": "(</(?=bdo))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.bdo.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-dir"
          },
          {
            "include": "#attributes-group-core"
          },
          {
            "include": "#attributes-group-events"
          },
          {
            "include": "#attributes-group-i18n"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-tbody": {
    "begin": "(<(tbody)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.tbody.html"
      },
      "2": {
        "name": "entity.name.tag.block.tbody.html"
      }
    },
    "end": "((tbody)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.tbody.html"
          }
        },
        "end": "(</(?=tbody))",
        "patterns": [
          {
            "include": "#tag-tr"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.tbody.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-align"
          },
          {
            "include": "#attribute-char"
          },
          {
            "include": "#attribute-charoff"
          },
          {
            "include": "#attribute-valign"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-enctype": {
    "begin": "(enctype)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-onfocus": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onfocus)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "attribute-class": {
    "begin": "(class)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-scheme": {
    "begin": "(scheme)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "attribute-cellspacing": {
    "begin": "(cellpadding)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "sgml-declarations": {
    "begin": "(?=<!)",
    "applyEndPatternLast": "1",
    "end": "(?<=>)",
    "patterns": [
      {
        "name": "meta.tag.sgml.empty.html",
        "match": "<!\\s*>"
      },
      {
        "name": "invalid.illegal.bad-comments-or-CDATA.html",
        "begin": "<!(?!DOCTYPE|--|\\[CDATA\\[)",
        "end": ">"
      },
      {
        "name": "meta.tag.preprocessor.server-side-includes.html",
        "begin": "<!--(#\\s*(include|config|echo|exec|fsize|flastmod|printenv|set))",
        "captures": {
          "1": {
            "name": "support.function.server-side-include.html"
          }
        },
        "end": "-->",
        "patterns": [
          {
            "name": "meta.preprocessor.server-side-includes.html",
            "captures": {
              "1": {
                "name": "entity.other.attribute-name.html"
              },
              "3": {
                "name": "string.quoted.double.html"
              },
              "4": {
                "name": "string.quoted.single.html"
              },
              "5": {
                "name": "string.unquoted.html"
              }
            },
            "match": "(errmsg|sizefmt|timefmt|var|encoding|cgi|cmd|file|virtual|value)=((\".*?\")|('.*?')|([^\"'>\\s]+))"
          }
        ]
      },
      {
        "include": "#sgml-comment"
      },
      {
        "name": "meta.scope.xml-cdata.html",
        "begin": "<!\\[CDATA\\[",
        "end": "]]>"
      }
    ]
  },
  "tag-body": {
    "begin": "(<(body)\\b)",
    "name": "meta.section.html.body.xhtml.1-strict",
    "captures": {
      "1": {
        "name": "meta.tag.segment.body.html"
      },
      "2": {
        "name": "entity.name.tag.segment.body.html"
      }
    },
    "end": "((body)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.segment.body.html"
          }
        },
        "end": "(</(?=body))",
        "patterns": [
          {
            "include": "#tag-group-block-master"
          },
          {
            "include": "#no-pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.segment.body.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-onload"
          },
          {
            "include": "#attribute-onunload"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-div": {
    "begin": "(<(div)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.div.html"
      },
      "2": {
        "name": "entity.name.tag.block.div.html"
      }
    },
    "end": "((div)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.div.html"
          }
        },
        "end": "(</(?=div))",
        "patterns": [
          {
            "include": "#tag-group-flow"
          }
        ]
      },
      {
        "name": "meta.tag.block.div.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-fieldset": {
    "begin": "(<(fieldset)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.fieldset.html"
      },
      "2": {
        "name": "entity.name.tag.block.fieldset.html"
      }
    },
    "end": "((fieldset)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.fieldset.html"
          }
        },
        "end": "(</(?=fieldset))",
        "patterns": [
          {
            "include": "#tag-legend"
          },
          {
            "include": "#tag-form"
          },
          {
            "include": "#tag-group-block"
          },
          {
            "include": "#tag-group-inline"
          },
          {
            "include": "#tag-group-misc"
          },
          {
            "include": "#pcdata"
          }
        ]
      },
      {
        "name": "meta.tag.block.fieldset.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-width-multi": {
    "begin": "(width)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}\\*?|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}\\*?|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-onblur": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onblur)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "attribute-alt": {
    "begin": "(alt)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-dt": {
    "begin": "(<(dt)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.dt.html"
      },
      "2": {
        "name": "entity.name.tag.block.dt.html"
      }
    },
    "end": "((dt)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.dt.html"
          }
        },
        "end": "(</(?=dt))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.block.dt.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "sgml-declarations-preprocessor": {
    "begin": "(?=<!)",
    "applyEndPatternLast": "1",
    "end": "(?<=>)",
    "patterns": [
      {
        "name": "meta.tag.sgml.doctype.html",
        "begin": "<!(DOCTYPE\\b)",
        "captures": {
          "1": {
            "name": "entity.name.tag.doctype.html"
          }
        },
        "end": ">",
        "patterns": [
          {
            "name": "string.quoted.double.doctype.identifiers-and-DTDs.html",
            "match": "\"[^\">]*\""
          }
        ]
      },
      {
        "include": "#sgml-declarations"
      }
    ]
  },
  "tag-group-block": {
    "patterns": [
      {
        "include": "#tag-p"
      },
      {
        "include": "#tag-div"
      },
      {
        "include": "#tag-fieldset"
      },
      {
        "include": "#tag-table"
      },
      {
        "include": "#tag-group-heading"
      },
      {
        "include": "#tag-group-lists"
      },
      {
        "include": "#tag-group-blocktext"
      }
    ]
  },
  "attribute-type-input": {
    "begin": "(type)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(text|password|checkbox|button|radio|submit|reset|file|hidden|image)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(text|password|checkbox|button|radio|submit|reset|file|hidden|image)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-colspan": {
    "begin": "(colspan)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-onselect": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onselect)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "tag-group-inline.forms": {
    "patterns": [
      {
        "include": "#tag-input"
      },
      {
        "include": "#tag-select"
      },
      {
        "include": "#tag-textarea"
      },
      {
        "include": "#tag-label"
      },
      {
        "include": "#tag-button"
      }
    ]
  },
  "tag-link": {
    "begin": "(<(link)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.meta.link.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.meta.link.html"
      },
      "2": {
        "name": "entity.name.tag.meta.link.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.meta.link.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attribute-charset"
          },
          {
            "include": "#attribute-href"
          },
          {
            "include": "#attribute-hreflang"
          },
          {
            "include": "#attribute-media"
          },
          {
            "include": "#attribute-rel"
          },
          {
            "include": "#attribute-rev"
          },
          {
            "include": "#attribute-type"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-maxlength": {
    "begin": "(maxlength)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')[0-9]+(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "attribute-content": {
    "begin": "(content)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-base": {
    "begin": "(<(base)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.meta.base.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.meta.base.html"
      },
      "2": {
        "name": "entity.name.tag.meta.base.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.meta.base.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attribute-id"
          },
          {
            "include": "#attribute-href"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-group-heading": {
    "patterns": [
      {
        "include": "#tag-h1"
      },
      {
        "include": "#tag-h2"
      },
      {
        "include": "#tag-h3"
      },
      {
        "include": "#tag-h4"
      },
      {
        "include": "#tag-h5"
      },
      {
        "include": "#tag-h6"
      }
    ]
  },
  "attribute-charoff": {
    "begin": "(charoff)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')([0-9]{0,5}|[0-9]{0,4}%)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  },
  "tag-strong": {
    "begin": "(<(strong)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.strong.html"
      },
      "2": {
        "name": "entity.name.tag.inline.strong.html"
      }
    },
    "end": "((strong)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.strong.html"
          }
        },
        "end": "(</(?=strong))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.strong.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-group-form.content": {
    "patterns": [
      {
        "include": "#tag-group-block"
      },
      {
        "include": "#tag-group-misc"
      }
    ]
  },
  "tag-sup": {
    "begin": "(<(sup)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.sup.html"
      },
      "2": {
        "name": "entity.name.tag.inline.sup.html"
      }
    },
    "end": "((sup)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.sup.html"
          }
        },
        "end": "(</(?=sup))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.sup.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attributes-group-events": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onclick|ondblclick|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "(?<!\"|')\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "(?<!\"|')'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "attribute-coords": {
    "begin": "(coords)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "include": "#values-generic-valid"
      }
    ]
  },
  "tag-param": {
    "begin": "(<(param)\\b)",
    "endCaptures": {
      "1": {
        "name": "meta.tag.meta.param.html"
      },
      "2": {
        "name": "invalid.illegal.terminator.html"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.meta.param.html"
      },
      "2": {
        "name": "entity.name.tag.meta.param.html"
      }
    },
    "end": "(/>|(>))",
    "patterns": [
      {
        "name": "meta.tag.meta.param.html",
        "begin": "",
        "end": "(?=/>|>)",
        "patterns": [
          {
            "include": "#attribute-id"
          },
          {
            "include": "#attribute-name"
          },
          {
            "include": "#attribute-type"
          },
          {
            "include": "#attribute-value"
          },
          {
            "include": "#attribute-valuetype"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-pre": {
    "begin": "(<(pre)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.block.pre.html"
      },
      "2": {
        "name": "entity.name.tag.block.pre.html"
      }
    },
    "end": "((pre)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.block.pre.html"
          }
        },
        "end": "(</(?=pre))",
        "patterns": [
          {
            "include": "#tag-group-pre.content"
          }
        ]
      },
      {
        "name": "meta.tag.block.pre.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attribute-xml:space"
          },
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "tag-samp": {
    "begin": "(<(samp)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.samp.html"
      },
      "2": {
        "name": "entity.name.tag.inline.samp.html"
      }
    },
    "end": "((samp)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.samp.html"
          }
        },
        "end": "(</(?=samp))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.samp.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-onchange": {
    "patterns": [
      {
        "name": "meta.attribute-with-value.html",
        "begin": "(onchange)\\s*=\\s*(?=([\"']).*?[\"'])",
        "applyEndPatternLast": "1",
        "beginCaptures": {
          "1": {
            "name": "entity.other.attribute-name.html"
          }
        },
        "end": "",
        "patterns": [
          {
            "name": "string.quoted.double.html",
            "begin": "\"",
            "end": "\"",
            "contentName": "source.js.embedded.html"
          },
          {
            "name": "string.quoted.single.html",
            "begin": "'",
            "end": "'",
            "contentName": "source.js.embedded.html"
          }
        ]
      }
    ]
  },
  "tag-em": {
    "begin": "(<(em)\\b)",
    "captures": {
      "1": {
        "name": "meta.tag.inline.em.html"
      },
      "2": {
        "name": "entity.name.tag.inline.em.html"
      }
    },
    "end": "((em)>)",
    "patterns": [
      {
        "begin": "(?<=>)",
        "endCaptures": {
          "1": {
            "name": "meta.tag.inline.em.html"
          }
        },
        "end": "(</(?=em))",
        "patterns": [
          {
            "include": "#tag-group-inline-master"
          }
        ]
      },
      {
        "name": "meta.tag.inline.em.html",
        "begin": "",
        "end": ">",
        "patterns": [
          {
            "include": "#attributes-group-common"
          },
          {
            "include": "#attributes-illegal_char"
          }
        ]
      }
    ]
  },
  "attribute-scope": {
    "begin": "(scope)\\s*=\\s*(?=([\"']).*?[\"'])",
    "name": "meta.attribute-with-value.html",
    "applyEndPatternLast": "1",
    "beginCaptures": {
      "1": {
        "name": "entity.other.attribute-name.html"
      }
    },
    "end": "",
    "patterns": [
      {
        "name": "string.quoted.double.html",
        "begin": "(?<!\"|')\"",
        "end": "\"",
        "patterns": [
          {
            "match": "(?<=\"|')(row|col|rowgroup|colgroup)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      },
      {
        "name": "string.quoted.single.html",
        "begin": "(?<!\"|')'",
        "end": "'",
        "patterns": [
          {
            "match": "(?<=\"|')(row|col|rowgroup|colgroup)(?=\"|')"
          },
          {
            "include": "#values-generic-invalid"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "include": "#xml-preprocessor"
  },
  {
    "include": "#sgml-declarations-preprocessor"
  },
  {
    "include": "#tag-html"
  },
  {
    "include": "#stray-char"
  }
];

exports.XHTML 1.0 StrictSyntax = new TextmateSyntax(repositories, patterns);
