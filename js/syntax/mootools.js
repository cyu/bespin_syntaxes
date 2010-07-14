"define metadata";
({
    "description": "MooTools syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "MooTools",
            "pointer": "#MooToolsSyntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "leading-space": {
    "comment": "\nThe leading-space code is the ribbon highlighing thomas Aylott contributed to source.js.prototype.\nMore info in this thread:\nhttp://comox.textdrive.com/pipermail/textmate/2006-August/012373.html\n",
    "patterns": [
      {
        "name": "meta.leading-tabs",
        "begin": "^(?=(\\t|  ))",
        "end": "(?=[^\\t\\s])",
        "patterns": [
          {
            "captures": {
              "11": {
                "name": "meta.odd-tab.group11.spaces"
              },
              "6": {
                "name": "meta.even-tab.group6.spaces"
              },
              "7": {
                "name": "meta.odd-tab.group7.spaces"
              },
              "8": {
                "name": "meta.even-tab.group8.spaces"
              },
              "9": {
                "name": "meta.odd-tab.group9.spaces"
              },
              "1": {
                "name": "meta.odd-tab.group1.spaces"
              },
              "2": {
                "name": "meta.even-tab.group2.spaces"
              },
              "3": {
                "name": "meta.odd-tab.group3.spaces"
              },
              "10": {
                "name": "meta.even-tab.group10.spaces"
              },
              "4": {
                "name": "meta.even-tab.group4.spaces"
              },
              "5": {
                "name": "meta.odd-tab.group5.spaces"
              }
            },
            "match": "(  )(  )?(  )?(  )?(  )?(  )?(  )?(  )?(  )?(  )?(  )?"
          },
          {
            "captures": {
              "11": {
                "name": "meta.odd-tab.group11.tab"
              },
              "6": {
                "name": "meta.even-tab.group6.tab"
              },
              "7": {
                "name": "meta.odd-tab.group7.tab"
              },
              "8": {
                "name": "meta.even-tab.group8.tab"
              },
              "9": {
                "name": "meta.odd-tab.group9.tab"
              },
              "1": {
                "name": "meta.odd-tab.group1.tab"
              },
              "2": {
                "name": "meta.even-tab.group2.tab"
              },
              "3": {
                "name": "meta.odd-tab.group3.tab"
              },
              "10": {
                "name": "meta.even-tab.group10.tab"
              },
              "4": {
                "name": "meta.even-tab.group4.tab"
              },
              "5": {
                "name": "meta.odd-tab.group5.tab"
              }
            },
            "match": "(\\t)(\\t)?(\\t)?(\\t)?(\\t)?(\\t)?(\\t)?(\\t)?(\\t)?(\\t)?(\\t)?"
          }
        ]
      }
    ]
  },
  "element-functions": {
    "begin": "(\\$?\\$\\()",
    "name": "meta.function.element.js.mootools",
    "endCaptures": {
      "1": {
        "name": "support.function.element.js.mootools"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.element.js.mootools"
      }
    },
    "end": "(\\))",
    "contentName": "variable.parameter.function.element.js.mootools",
    "patterns": [
      {
        "include": "source.js"
      }
    ]
  },
  "hash-functions": {
    "begin": "(\\$H\\()",
    "name": "meta.function.hash.js.mootools",
    "endCaptures": {
      "1": {
        "name": "support.function.hash.js.mootools"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.hash.js.mootools"
      }
    },
    "end": "(\\))",
    "contentName": "variable.parameter.function.hash.js.mootools",
    "patterns": [
      {
        "include": "source.js"
      }
    ]
  },
  "dom-functions": {
    "begin": "(\\$ES?\\()",
    "name": "meta.function.dom.js.mootools",
    "endCaptures": {
      "1": {
        "name": "support.function.dom.js.mootools"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.dom.js.mootools"
      }
    },
    "end": "(\\))",
    "contentName": "variable.parameter.function.dom.js.mootools",
    "patterns": [
      {
        "include": "source.js"
      }
    ]
  },
  "fx-options": {
    "patterns": [
      {
        "name": "support.class.keys.fx.options.js.mootools",
        "match": "\\b(onStart|onComplete|transition|duration|unit|wait|fps)\\b"
      },
      {
        "name": "support.class.keys.fx.slide.options.js.mootools",
        "match": "\\b(mode)\\b"
      }
    ]
  },
  "array-functions": {
    "begin": "(\\$(?:each|A)\\()",
    "name": "meta.function.array.js.mootools",
    "endCaptures": {
      "1": {
        "name": "support.function.array.js.mootools"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.array.js.mootools"
      }
    },
    "end": "(\\))",
    "contentName": "variable.parameter.function.array.js.mootools",
    "patterns": [
      {
        "include": "source.js"
      }
    ]
  }
};

var patterns = [
  {
    "name": "support.class.js.mootools",
    "comment": "\nClass\nThe base class object of the http://mootools.net framework. \nhttp://docs.mootools.net/files/Core/Moo-js.html",
    "match": "\\b(Class|Array|Element|Event|Function|String)\\b"
  },
  {
    "name": "support.class.class.js.mootools",
    "match": "\\b(empty|extend|implement)\\b"
  },
  {
    "name": "support.function.class.js.mootools",
    "match": "\\b(extend|Native)\\b"
  },
  {
    "name": "support.function.utility.js.mootools",
    "comment": "\nUtility\nContains Utility functions\nhttp://docs.mootools.net/files/Core/Utility-js.html\n",
    "match": "\\$(type|chk|pick|random|clear)\\b"
  },
  {
    "captures": {
      "1": {
        "name": "support.class.window.browser.js.mootools"
      }
    },
    "match": "window\\.(ie|ie6|ie7|khtml|gecko)\\b"
  },
  {
    "comment": "\nArray\nA collection of The Array Object prototype methods.\nhttp://docs.mootools.net/files/Native/Array-js.html",
    "include": "#array-functions"
  },
  {
    "name": "support.class.array.js.mootools",
    "match": "\\b(forEach|filter|map|every|some|indexOf|each|copy|remove|test|extend|associate)\\b"
  },
  {
    "comment": "\nElement\nCustom class to allow all of its methods to be used with any DOM element via the dollar function $.\nhttp://docs.mootools.net/files/Native/Element-js.html",
    "include": "#element-functions"
  },
  {
    "name": "support.class.element.js.mootools",
    "match": "\\b(injectBefore|injectAfter|injectInside|adopt|remove|clone|replaceWith|appendText|hasClass|addClass|removeClass|toggleClass|setStyle|setStyles|setOpacity|getStyle|addEvent|removeEvent|removeEvents|fireEvent|getPrevious|getNext|getFirst|getLast|getParent|getChildren|setProperty|setProperties|setHTML|getProperty|getTag|scrollTo|getValue|getSize|getPosition|getTop|getLeft|getCoordinates)\\b"
  },
  {
    "name": "support.class.event.js.mootools",
    "comment": "\nEvent\nCross browser methods to manage events.\nhttp://docs.mootools.net/files/Native/Event-js.html",
    "match": "\\b(stop|stopPropagation|preventDefault|bindWithEvent)\\b"
  },
  {
    "name": "support.class.function.js.mootools",
    "comment": "\nFunction\nA collection of The Function Object prototype methods.\nhttp://docs.mootools.net/files/Native/Function-js.html",
    "match": "\\b(create|pass|attempt|bind|bindAsEventListener|delay|periodical)\\b"
  },
  {
    "name": "support.class.string.js.mootools",
    "comment": "\nString\nA collection of The String Object prototype methods.\nhttp://docs.mootools.net/files/Native/String-js.html",
    "match": "\\b(test|toInt|camelCase|hyphenate|capitalize|trim|clean|rgbToHex|hexToRgb)\\b"
  },
  {
    "name": "support.class.number.js.mootools",
    "match": "\\btoInt\\b"
  },
  {
    "comment": "\nDOM\nCss Query related function and Element extensions.\nhttp://docs.mootools.net/files/Addons/Dom-js.html",
    "include": "#dom-functions"
  },
  {
    "name": "support.class.dom.js.mootools",
    "comment": "document. getElementsByClassName\tmight belong somewhere else",
    "match": "\\b(getElements|getElementById|getElement|getElementsBySelector|getElementsByClassName)\\b"
  },
  {
    "comment": "\nHash\nIt wraps an object that it uses internally as a map.\nhttp://docs.mootools.net/files/Addons/Hash-js.html\n -- note: several overlaps in here with named properties from array.js.mootools",
    "include": "#hash-functions"
  },
  {
    "name": "support.class.hash.js.mootools",
    "match": "\\b(get|hasKey|set|remove|each|extend|empty|keys|values)\\b"
  },
  {
    "name": "support.class.color.js.mootools",
    "comment": "\nColor\nCreates a new Color Object, which is an array with some color specific methods.\nhttp://docs.mootools.net/files/Addons/Color-js.html",
    "match": "\\b(mix|invert|setHue|setSaturation|setBrightness)\\b"
  },
  {
    "name": "support.function.color.js.mootools",
    "captures": {
      "1": {
        "name": "variable.parameter.function.js"
      }
    },
    "match": "\\$(?:RGB|HSB)\\(([^)]*)\\)\\b"
  },
  {
    "name": "support.function.chain.js.mootools",
    "comment": "\nCommon\nContains common implementations for custom classes.\nhttp://docs.mootools.net/files/Addons/Common-js.html",
    "match": "\\b(chain|(call|clear)Chain)\\b"
  },
  {
    "name": "support.function.events.js.mootools",
    "match": "\\b(add|fire|remove)Event\\b"
  },
  {
    "name": "support.function.options.js.mootools",
    "match": "\\bsetOptions\\b"
  },
  {
    "name": "support.class.base.window.js.mootools",
    "comment": "\nWindow Base\nCross browser methods to get the window size, onDomReady method.\nhttp://docs.mootools.net/files/Window/Window-Base-js.html\n -- note: addEvent is already listed under Element",
    "match": "\\bonDomReady\\b"
  },
  {
    "name": "support.class.size.window.js.mootools",
    "comment": "\nWindow Size\nCross browser methods to get various window dimensions.\nhttp://docs.mootools.net/files/Window/Window-Size-js.html\n -- note: getSize is already listed under Element",
    "match": "\\b(get(Width|Height|Scroll(Width|Height|Left|Top)))\\b"
  },
  {
    "name": "support.class.ajax.js.mootools",
    "comment": "\nAjax\nAn Ajax class, For all your asynchronous needs.\nhttp://docs.mootools.net/files/Remote/Ajax-js.html",
    "match": "\\b(request|evalScripts)\\b"
  },
  {
    "name": "support.function.js.mootools",
    "comment": "note: both Object and Element have a toQueryString function/property",
    "match": "\\btoQueryString\\b"
  },
  {
    "name": "support.class.element.js",
    "match": "\\bsend\\b"
  },
  {
    "name": "support.function.asset.js.mootools",
    "comment": "\nAssets\nprovides dynamic loading for images, css and javascript files.\nhttp://docs.mootools.net/files/Remote/Assets-js.html",
    "match": "\\b(javascript|css|images?)\\b"
  },
  {
    "name": "support.class.cookie.js.mootools",
    "comment": "\nCookie\nClass for creating, getting, and removing cookies.\nhttp://docs.mootools.net/files/Remote/Assets-js.html",
    "match": "\\b(set|get|remove)\\b"
  },
  {
    "name": "support.class.json.js.mootools",
    "comment": "\nJson\nSimple Json parser and Stringyfier, See: http://www.json.org/\nhttp://docs.mootools.net/files/Remote/Json-js.html",
    "match": "\\b(toString|evaluate)\\b"
  },
  {
    "name": "support.class.json.js.mootools",
    "comment": "\nJson Remote\nWrapped XHR with automated sending and receiving of Javascript Objects in Json Format.\nhttp://docs.mootools.net/files/Remote/Json-Remote-js.html",
    "match": "\\bJson\\.Remote\\b"
  },
  {
    "name": "support.class.xhr.js.mootools",
    "comment": "\nXHR\nContains the basic XMLHttpRequest Class Wrapper.\nhttp://docs.mootools.net/files/Remote/XHR-js.html",
    "match": "\\bXHR\\b"
  },
  {
    "name": "support.class.base.fx.js.mootools",
    "comment": "\nFx.Base\t\t\t\nBase class for the Mootools Effects (Moo.Fx) library.\t\t\t\nhttp://docs.mootools.net/files/Effects/Fx-Base-js.html",
    "match": "\\b(set|start|stop)\\b"
  },
  {
    "name": "support.class.transitions.fx.js.mootools",
    "match": "\\b(linear|sineInOut)\\b"
  },
  {
    "name": "support.class.keys.options.transitions.fx",
    "match": "\\b(onStart|onComplete|transition|duration|unit|wait|fps)\\b"
  },
  {
    "name": "support.class.elements.fx.js.mootools",
    "comment": "\nFx.Elements\nFx.Elements allows you to apply any number of styles transitions to a selection of elements.\nhttp://docs.mootools.net/files/Effects/Fx-Elements-js.html",
    "match": "\\b(start)\\b"
  },
  {
    "begin": "(new)\\s+(Fx\\.Elements)(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.js"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.new.js"
      },
      "2": {
        "name": "entity.name.type.instance.js.mootools"
      },
      "3": {
        "name": "punctuation.definition.parameters.begin.js"
      }
    },
    "end": "(\\)(;|$))",
    "contentName": "variable.parameter.fx.elements.js.mootools",
    "patterns": [
      {
        "include": "#element-functions"
      },
      {
        "include": "#array-functions"
      },
      {
        "include": "#dom-functions"
      },
      {
        "include": "#hash-functions"
      },
      {
        "begin": "(\\{)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.js"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.begin.js"
          }
        },
        "end": "(\\})(?=\\))",
        "contentName": "variable.parameter.fx.elements.options.js.mootools",
        "patterns": [
          {
            "name": "punctuation.separator.key-value.js.mootools",
            "match": "(:)"
          },
          {
            "include": "#fx-options"
          },
          {
            "include": "source.js"
          }
        ]
      }
    ]
  },
  {
    "name": "support.class.scroll.fx.js.mootools",
    "comment": "\nFx.Scroll\nScroll any element with an overflow, including the window element.\nhttp://docs.mootools.net/files/Effects/Fx-Scroll-js.html",
    "match": "\\b(scrollTo|to(Top|Bottom|Left|Right|Element))"
  },
  {
    "begin": "(new)\\s+(Fx\\.Scroll)(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.js"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.new.js"
      },
      "2": {
        "name": "entity.name.type.instance.js.mootools"
      },
      "3": {
        "name": "punctuation.definition.parameters.begin.js"
      }
    },
    "end": "(\\)(;|$))",
    "contentName": "variable.parameter.fx.scroll.js.mootools",
    "patterns": [
      {
        "include": "#element-functions"
      },
      {
        "include": "#array-functions"
      },
      {
        "include": "#dom-functions"
      },
      {
        "include": "#hash-functions"
      },
      {
        "begin": "(\\{)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.js"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.begin.js"
          }
        },
        "end": "(\\})(?=\\))",
        "contentName": "variable.parameter.fx.scroll.options.js.mootools",
        "patterns": [
          {
            "name": "punctuation.separator.key-value.js.mootools",
            "match": "(:)"
          },
          {
            "include": "#fx-options"
          },
          {
            "include": "source.js"
          }
        ]
      }
    ]
  },
  {
    "name": "support.class.slide.fx.js.mootools",
    "comment": "\nFx.Slide\nThe slide effect; slides an element in horizontally or vertically, the contents will fold inside.\nhttp://docs.mootools.net/files/Effects/Fx-Slide-js.html",
    "match": "\\b(slide(In|Out)|hide|show|toggle)\\b"
  },
  {
    "begin": "(new)\\s+(Fx\\.Slide)(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.js"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.new.js"
      },
      "2": {
        "name": "entity.name.type.instance.js.mootools"
      },
      "3": {
        "name": "punctuation.definition.parameters.begin.js"
      }
    },
    "end": "(\\)(;|$))",
    "contentName": "variable.parameter.fx.slide.js.mootools",
    "patterns": [
      {
        "include": "#element-functions"
      },
      {
        "include": "#array-functions"
      },
      {
        "include": "#dom-functions"
      },
      {
        "include": "#hash-functions"
      },
      {
        "begin": "(\\{)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.js"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.begin.js"
          }
        },
        "end": "(\\})(?=\\))",
        "contentName": "variable.parameter.fx.slide.options.js.mootools",
        "patterns": [
          {
            "name": "punctuation.separator.key-value.js.mootools",
            "match": "(:)"
          },
          {
            "include": "#fx-options"
          },
          {
            "include": "source.js"
          }
        ]
      }
    ]
  },
  {
    "name": "support.class.slide.fx.js.mootools",
    "comment": "\nFx.Style\nThe Style effect; Extends Fx.Base, inherits all its properties.\nhttp://docs.mootools.net/files/Effects/Fx-Style-js.html",
    "match": "\\b(hide|start)\\b"
  },
  {
    "begin": "(new)\\s+(Fx\\.Style)(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.js"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.new.js"
      },
      "2": {
        "name": "entity.name.type.instance.fx.style.js.mootools"
      },
      "3": {
        "name": "punctuation.definition.parameters.begin.js"
      }
    },
    "end": "(\\)(;|$))",
    "contentName": "variable.parameter.fx.style.js.mootools",
    "patterns": [
      {
        "include": "#element-functions"
      },
      {
        "include": "#array-functions"
      },
      {
        "include": "#dom-functions"
      },
      {
        "include": "#hash-functions"
      },
      {
        "begin": ",\\s*(\\{)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.js"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.begin.js"
          }
        },
        "end": "(\\})(?=\\))",
        "contentName": "variable.parameter.fx.style.options.js.mootools",
        "patterns": [
          {
            "name": "punctuation.separator.key-value.js.mootools",
            "match": "(:)"
          },
          {
            "include": "#fx-options"
          },
          {
            "include": "source.js"
          }
        ]
      }
    ]
  },
  {
    "name": "support.class.element.js.mootools",
    "match": "\\b(effect)\\b"
  },
  {
    "name": "support.class.styles.fx.js.mootools",
    "comment": "\nFx.Styles\nAllows you to animate multiple css properties at once; Extends Fx.Base, inherits all its properties. \nhttp://docs.mootools.net/files/Effects/Fx-Styles-js.html",
    "match": "\\b(start)\\b"
  },
  {
    "begin": "(new)\\s+(Fx\\.Styles)(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.js"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.new.js"
      },
      "2": {
        "name": "entity.name.type.instance.js.mootools"
      },
      "3": {
        "name": "punctuation.definition.parameters.begin.js"
      }
    },
    "end": "(\\)(;|$))",
    "contentName": "variable.parameter.fx.styles.js.mootools",
    "patterns": [
      {
        "include": "#element-functions"
      },
      {
        "include": "#array-functions"
      },
      {
        "include": "#dom-functions"
      },
      {
        "include": "#hash-functions"
      },
      {
        "begin": "(\\{)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.js"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.begin.js"
          }
        },
        "end": "(\\})(?=\\))",
        "contentName": "variable.parameter.fx.styles.options.js.mootools",
        "patterns": [
          {
            "name": "punctuation.separator.key-value.js.mootools",
            "match": "(:)"
          },
          {
            "include": "#fx-options"
          },
          {
            "include": "source.js"
          }
        ]
      }
    ]
  },
  {
    "name": "support.class.element.js.mootools",
    "match": "\\b(effects)\\b"
  },
  {
    "name": "support.class.transitions.fx.js.mootools",
    "comment": "\nFx.Transitions\nA collection of tweaning transitions for use with the Fx.Base classes.\nhttp://docs.mootools.net/files/Effects/Fx-Transitions-js.html",
    "match": "\\b(linear|quadIn|quadOut|quadInOut|cubicIn|cubicOut|cubicInOut|quartIn|quartOut|quartInOut|quintIn|quintOut|quintInOut|sineIn|sineOut|sineInOut|expoIn|expoOut|expoInOut|circIn|circOut|circInOut|elasticIn|elasticOut|elasticInOut|backIn|backOut|backInOut|bounceIn|bounceOut|bounceInOut)\\b"
  },
  {
    "name": "support.class.fx.utils.js.mootools",
    "comment": "\nFx.Utils\nContains Fx.Height, Fx.Width, Fx.Opacity.\nhttp://docs.mootools.net/files/Effects/Fx-Styles-js.html",
    "match": "\\b(toggle|show)\\b"
  },
  {
    "begin": "(new)\\s+(Fx\\.(?:Height|Width|Opacity))(\\()",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.parameters.end.js"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.operator.new.js"
      },
      "2": {
        "name": "entity.name.type.instance.js.mootools"
      },
      "3": {
        "name": "punctuation.definition.parameters.begin.js"
      }
    },
    "end": "(\\));?$",
    "contentName": "variable.parameter.fx.utils.js.mootools",
    "patterns": [
      {
        "include": "#element-functions"
      },
      {
        "include": "#array-functions"
      },
      {
        "include": "#dom-functions"
      },
      {
        "include": "#hash-functions"
      },
      {
        "begin": "(\\{)",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.end.js"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.definition.parameters.begin.js"
          }
        },
        "end": "(\\})\\)",
        "contentName": "variable.parameter.fx.utils.options.js.mootools",
        "patterns": [
          {
            "name": "punctuation.separator.key-value.js.mootools",
            "match": "(:)"
          },
          {
            "include": "#fx-options"
          },
          {
            "include": "source.js"
          }
        ]
      }
    ]
  },
  {
    "name": "support.class.element.js.mootools",
    "comment": "\nDrag.Base\nModify two css properties of an element based on the position of the mouse.\nhttp://docs.mootools.net/files/Drag/Drag-Base-js.html",
    "match": "\\b(makeResizable)\\b"
  },
  {
    "name": "support.class.element.js.mootools",
    "comment": "\nDrag.Move\nModify two css properties of an element based on the position of the mouse.\nhttp://docs.mootools.net/files/Drag/Drag-Base-js.html",
    "match": "\\b(makeDraggable)\\b"
  },
  {
    "include": "#leading-space"
  },
  {
    "include": "source.js"
  }
];

exports.MooToolsSyntax = new TextmateSyntax(repositories, patterns);
