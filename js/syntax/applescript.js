"define metadata";
({
    "description": "AppleScript syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "applescript",
            "pointer": "#AppleScriptSyntax",
            "fileexts": [
  "applescript",
  "script editor"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "blocks": {
    "patterns": [
      {
        "name": "meta.script.applescript",
        "begin": "^\\s*(script)\\s+(\\w+)",
        "captures": {
          "1": {
            "name": "keyword.control.script.applescript"
          },
          "2": {
            "name": "entity.name.type.script-object.applescript"
          }
        },
        "end": "^\\s*(end script)",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "meta.function.with-parentheses.applescript",
        "begin": "^(?x)\n\t\t\t\t\t\t\\s*(to|on)\\s+ \t\t\t\t\t# \"on\" or \"to\"\n\t\t\t\t\t\t([A-Za-z][A-Za-z0-9_]*)\t\t\t# function name\n\t\t\t\t\t\t(\\()\t\t\t\t\t\t\t# opening paren\n\t\t\t\t\t\t\t(?:(\\w+(?:\\s*,\\s*\\w+)*))?\t# parameters\n\t\t\t\t\t\t(\\))\t\t\t\t\t\t\t# closing paren\n\t\t\t\t\t",
        "comment": "\n\t\t\t\t\t\tThis is not a very well-designed rule.  For now,\n\t\t\t\t\t\twe can leave it like this though, as it sorta works.\n\t\t\t\t\t",
        "captures": {
          "1": {
            "name": "keyword.control.on.applescript"
          },
          "2": {
            "name": "entity.name.function.handler.applescript"
          },
          "3": {
            "name": "punctuation.definition.parameters.applescript"
          },
          "4": {
            "name": "variable.parameter.handler.applescript"
          },
          "5": {
            "name": "punctuation.definition.parameters.applescript"
          }
        },
        "end": "^\\s*(end)(?: (\\2))?\\s*$",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "meta.function.prepositional.applescript",
        "begin": "^\\s*(on)\\s+(\\w+)(?=\\s+(above|against|apart from|around|aside from|at|below|beneath|beside|between|by|for|from|instead of|into|on|onto|out of|over|thru|under)\\s+)",
        "captures": {
          "1": {
            "name": "keyword.control.on.applescript"
          },
          "2": {
            "name": "entity.name.function.handler.applescript"
          }
        },
        "end": "^\\s*(end)(?: (\\2))?\\s*$",
        "patterns": [
          {
            "captures": {
              "1": {
                "name": "keyword.control.preposition.applescript"
              },
              "2": {
                "name": "variable.parameter.handler.applescript"
              }
            },
            "match": "\\b(above|against|apart from|around|aside from|at|below|beneath|beside|between|by|for|from|instead of|into|on|onto|out of|over|thru|under)\\s+(\\w+)\\b"
          },
          {
            "include": "$self"
          }
        ]
      },
      {
        "include": "#tell-blocks"
      }
    ]
  },
  "comments": {
    "patterns": [
      {
        "name": "comment.line.double-dash.applescript",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.applescript"
          }
        },
        "match": "(--).*$\\n?"
      },
      {
        "name": "comment.block.applescript",
        "begin": "\\(\\*",
        "captures": {
          "0": {
            "name": "punctuation.definition.comment.applescript"
          }
        },
        "end": "\\*\\)"
      }
    ]
  },
  "inline": {
    "patterns": [
      {
        "include": "#comments"
      },
      {
        "include": "#data-structures"
      },
      {
        "include": "#built-in"
      },
      {
        "include": "#standardadditions"
      }
    ]
  },
  "tell-blocks": {
    "patterns": [
      {
        "name": "meta.tell-block.application.textmate.applescript",
        "begin": "^\\s*(tell)\\s+(?=app(lication)?\\s+\"(?i:textmate)\")(?!.*\\bto\\b)",
        "comment": "tell Textmate",
        "captures": {
          "1": {
            "name": "keyword.control.applescript"
          }
        },
        "end": "^\\s*(end tell)",
        "patterns": [
          {
            "include": "#textmate"
          },
          {
            "include": "#standard-suite"
          },
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "meta.tell-block.application.finder.applescript",
        "begin": "^\\s*(tell)\\s+(?=app(lication)?\\s+\"(?i:finder)\")(?!.*\\bto\\b)",
        "comment": "tell Finder",
        "captures": {
          "1": {
            "name": "keyword.control.applescript"
          }
        },
        "end": "^\\s*(end tell)",
        "patterns": [
          {
            "include": "#finder"
          },
          {
            "include": "#standard-suite"
          },
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "meta.tell-block.application.system-events.applescript",
        "begin": "^\\s*(tell)\\s+(?=app(lication)?\\s+\"(?i:system events)\")(?!.*\\bto\\b)",
        "comment": "tell System Events",
        "captures": {
          "1": {
            "name": "keyword.control.applescript"
          }
        },
        "end": "^\\s*(end tell)",
        "patterns": [
          {
            "include": "#system-events"
          },
          {
            "include": "#standard-suite"
          },
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "meta.tell-block.application.itunes.applescript",
        "begin": "^\\s*(tell)\\s+(?=app(lication)?\\s+\"(?i:itunes)\")(?!.*\\bto\\b)",
        "comment": "tell iTunes",
        "captures": {
          "1": {
            "name": "keyword.control.applescript"
          }
        },
        "end": "^\\s*(end tell)",
        "patterns": [
          {
            "include": "#itunes"
          },
          {
            "include": "#standard-suite"
          },
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "meta.tell-block.application.generic.applescript",
        "begin": "^\\s*(tell)\\s+(?=app(lication)?\\b)(?!.*\\bto\\b)",
        "comment": "tell generic application",
        "captures": {
          "1": {
            "name": "keyword.control.applescript"
          }
        },
        "end": "^\\s*(end tell)",
        "patterns": [
          {
            "include": "#standard-suite"
          },
          {
            "include": "$self"
          }
        ]
      },
      {
        "name": "meta.tell-block.generic.applescript",
        "begin": "^\\s*(tell)\\s+(?!.*\\bto\\b)",
        "comment": "generic tell block",
        "captures": {
          "1": {
            "name": "keyword.control.applescript"
          }
        },
        "end": "^\\s*(end tell)",
        "patterns": [
          {
            "include": "$self"
          }
        ]
      }
    ]
  },
  "data-structures": {
    "patterns": [
      {
        "name": "meta.data.array.applescript",
        "begin": "(\\{)",
        "comment": "\n\t\t\t\t\t\twe cannot necessarily distinguish \"records\" from\n\t\t\t\t\t\t\"arrays\", and so this could be either\n\t\t\t\t\t",
        "captures": {
          "1": {
            "name": "punctuation.section.array.applescript"
          }
        },
        "end": "(\\})",
        "patterns": [
          {
            "captures": {
              "1": {
                "name": "constant.other.key.applescript"
              },
              "2": {
                "name": "meta.identifier.applescript"
              },
              "3": {
                "name": "punctuation.definition.identifier.applescript"
              },
              "4": {
                "name": "punctuation.definition.identifier.applescript"
              },
              "5": {
                "name": "punctuation.separator.key-value.applescript"
              }
            },
            "match": "([A-Za-z]+|((\\|)[^|\\n]*(\\|)))\\s*(:)"
          },
          {
            "name": "punctuation.separator.key-value.applescript",
            "match": ":"
          },
          {
            "name": "punctuation.separator.array.applescript",
            "match": ","
          },
          {
            "include": "#inline"
          }
        ]
      },
      {
        "name": "string.quoted.double.application-name.applescript",
        "begin": "((?<=application )\"|(?<=app )\")",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.applescript"
          }
        },
        "end": "(\")",
        "patterns": [
          {
            "name": "constant.character.escape.applescript",
            "match": "\\\\."
          }
        ]
      },
      {
        "name": "string.quoted.double.applescript",
        "begin": "(\")",
        "captures": {
          "1": {
            "name": "punctuation.definition.string.applescript"
          }
        },
        "end": "(\")",
        "patterns": [
          {
            "name": "constant.character.escape.applescript",
            "match": "\\\\."
          }
        ]
      },
      {
        "name": "meta.identifier.applescript",
        "captures": {
          "1": {
            "name": "punctuation.definition.identifier.applescript"
          },
          "2": {
            "name": "punctuation.definition.identifier.applescript"
          }
        },
        "match": "(\\|)[^|\\n]*(\\|)"
      },
      {
        "name": "meta.data.applescript",
        "captures": {
          "6": {
            "name": "keyword.operator.applescript"
          },
          "7": {
            "name": "support.class.built-in.applescript"
          },
          "1": {
            "name": "punctuation.definition.data.applescript"
          },
          "2": {
            "name": "support.class.built-in.applescript"
          },
          "3": {
            "name": "storage.type.utxt.applescript"
          },
          "4": {
            "name": "string.unquoted.data.applescript"
          },
          "5": {
            "name": "punctuation.definition.data.applescript"
          }
        },
        "match": "(«)(data) (utxt|utf8)([0-9A-Fa-f]*)(»)(?: (as) (Unicode text))?"
      }
    ]
  },
  "system-events": {
    "patterns": [
      {
        "name": "support.class.system-events.audio-file.applescript",
        "match": "\\b(audio (data|file))\\b"
      },
      {
        "name": "support.class.system-events.disk-folder-file.applescript",
        "match": "\\b(alias(es)?|(Classic|local|network|system|user) domain objects?|disk( item)?s?|domains?|file( package)?s?|folders?|items?)\\b"
      },
      {
        "name": "support.function.system-events.disk-folder-file.applescript",
        "match": "\\b(delete|open|move)\\b"
      },
      {
        "name": "support.class.system-events.folder-actions.applescript",
        "match": "\\b(folder actions?|scripts?)\\b"
      },
      {
        "name": "support.function.system-events.folder-actions.applescript",
        "match": "\\b(attach action to|attached scripts|edit action of|remove action from)\\b"
      },
      {
        "name": "support.class.system-events.movie-file.applescript",
        "match": "\\b(movie data|movie file)\\b"
      },
      {
        "name": "support.function.system-events.power.applescript",
        "match": "\\b(log out|restart|shut down|sleep)\\b"
      },
      {
        "name": "support.class.system-events.processes.applescript",
        "match": "\\b(((application |desk accessory )?process|(check|combo )?box)(es)?|(action|attribute|browser|(busy|progress|relevance) indicator|color well|column|drawer|group|grow area|image|incrementor|list|menu( bar)?( item)?|(menu |pop up |radio )?button|outline|(radio|tab|splitter) group|row|scroll (area|bar)|sheet|slider|splitter|static text|table|text (area|field)|tool bar|UI element|window)s?)\\b"
      },
      {
        "name": "support.function.system-events.processes.applescript",
        "match": "\\b(click|key code|keystroke|perform|select)\\b"
      },
      {
        "name": "support.class.system-events.property-list.applescript",
        "match": "\\b(property list (file|item))\\b"
      },
      {
        "name": "support.class.system-events.quicktime-file.applescript",
        "match": "\\b(annotation|QuickTime (data|file)|track)s?\\b"
      },
      {
        "name": "support.function.system-events.system-events.applescript",
        "match": "\\b((abort|begin|end) transaction)\\b"
      },
      {
        "name": "support.class.system-events.xml.applescript",
        "match": "\\b(XML (attribute|data|element|file)s?)\\b"
      },
      {
        "name": "support.class.sytem-events.other.applescript",
        "match": "\\b(print settings|users?|login items?)\\b"
      }
    ]
  },
  "standardadditions": {
    "patterns": [
      {
        "name": "support.class.standardadditions.user-interaction.applescript",
        "match": "\\b((alert|dialog) reply)\\b"
      },
      {
        "name": "support.class.standardadditions.file.applescript",
        "match": "\\b(file information)\\b"
      },
      {
        "name": "support.class.standardadditions.miscellaneous.applescript",
        "match": "\\b(POSIX files?|system information|volume settings)\\b"
      },
      {
        "name": "support.class.standardadditions.internet.applescript",
        "match": "\\b(URLs?|internet address(es)?|web pages?|FTP items?)\\b"
      },
      {
        "name": "support.function.standardadditions.file.applescript",
        "match": "\\b(info for|list (disks|folder)|mount volume|path to( resource)?)\\b"
      },
      {
        "name": "support.function.standardadditions.user-interaction.applescript",
        "match": "\\b(beep|choose (application|color|file( name)?|folder|from list|remote application|URL)|delay|display (alert|dialog)|say)\\b"
      },
      {
        "name": "support.function.standardadditions.string.applescript",
        "match": "\\b(ASCII (character|number)|localized string|offset|summarize)\\b"
      },
      {
        "name": "support.function.standardadditions.clipboard.applescript",
        "match": "\\b(set the clipboard to|the clipboard|clipboard info)\\b"
      },
      {
        "name": "support.function.standardadditions.file-i-o.applescript",
        "match": "\\b(open for access|close access|read|write|get eof|set eof)\\b"
      },
      {
        "name": "support.function.standardadditions.scripting.applescript",
        "match": "\\b((load|store|run) script|scripting components)\\b"
      },
      {
        "name": "support.function.standardadditions.miscellaneous.applescript",
        "match": "\\b(current date|do shell script|get volume settings|random number|round|set volume|system attribute|system info|time to GMT)\\b"
      },
      {
        "name": "support.function.standardadditions.folder-actions.applescript",
        "match": "\\b(opening folder|(closing|moving) folder window for|adding folder items to|removing folder items from)\\b"
      },
      {
        "name": "support.function.standardadditions.internet.applescript",
        "match": "\\b(open location|handle CGI request)\\b"
      }
    ]
  },
  "built-in": {
    "patterns": [
      {
        "name": "punctuation.separator.continuation.line.applescript",
        "match": "¬"
      },
      {
        "name": "keyword.operator.applescript",
        "match": "\\b((a )?(ref( to)|reference to)|(does not|doesn't) (come (before|after)|contain|equal)|(start|begin)s? with|comes (before|after)|is(n't| not)?( (in|contained by|(less than|greater than)( or equal( to)?)?|equal( to)?))?|ends? with|contains?|equals?|than|and|div|mod|not|or|as)\\b|(≠|≥|≤|>=|<=|÷|&|=|>|<|\\*|\\+|-|/|\\^)"
      },
      {
        "comment": "make sure that \"return\", \"property\", and other keywords are not preceded by something else, to disambiguate",
        "captures": {
          "1": {
            "name": "keyword.control.applescript"
          }
        },
        "match": "(?<=^|then|to)\\s*\\b(return|prop(erty)?)\\b"
      },
      {
        "name": "punctuation.separator.key-value.property.applescript",
        "comment": "the : in property assignments",
        "match": ":"
      },
      {
        "name": "punctuation.section.group.applescript",
        "comment": "the parentheses in groups",
        "match": "[()]"
      },
      {
        "name": "keyword.control.applescript",
        "match": "\\b(on error|try|to|on|tell|if|then|else if|else|repeat( (while|until|with))?|using terms from|from|through|thru|with timeout|times|end (tell|repeat|if|timeout|using terms from|error|try)|end|my|where|whose|considering|ignoring|global|local|exit|continue|returning|set|copy|put)\\b"
      },
      {
        "name": "keyword.control.reference.applescript",
        "match": "\\b(every|some|index|named|from|to|through|thru|before|(in )?front of|after receiving|after|(in )?back of|beginning of|end of|in|of|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|\\d+(st|nd|rd|th)|last|front|back|middle)\\b"
      },
      {
        "name": "constant.other.text-styles.applescript",
        "match": "\\b(all (caps|lowercase)|bold|condensed|expanded|hidden|italic|outline|plain|shadow|small caps|strikethrough|(sub|super)script|underline)\\b"
      },
      {
        "name": "constant.language.boolean.applescript",
        "comment": "yes/no can’t always be used as booleans, e.g. in an if() expression. But they work e.g. for boolean arguments.",
        "match": "\\b(?i:true|false|yes|no)\\b"
      },
      {
        "name": "constant.language.null.applescript",
        "match": "\\b(null)\\b"
      },
      {
        "name": "constant.other.date-time.applescript",
        "match": "\\b(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?|weekdays?|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\\b"
      },
      {
        "name": "constant.other.considering-ignoring-attributes.applescript",
        "comment": "these are used in considering/ignoring statements",
        "match": "\\b(?<=considering|ignoring) (application responses|current application|case|diacriticals|expansion|hyphens|punctuation|white space)\\b"
      },
      {
        "name": "constant.other.characters.applescript",
        "match": "\\b(space|return|tab)\\b"
      },
      {
        "name": "constant.other.miscellaneous.applescript",
        "match": "\\b(current application|it|me|version|result|pi|AppleScript)\\b"
      },
      {
        "name": "variable.language.applescript",
        "match": "\\b(text item delimiters|print length|print depth)\\b"
      },
      {
        "name": "support.function.built-in.applescript",
        "match": "\\b(count (each|every)|number of|error|get|run)\\b"
      },
      {
        "name": "support.class.built-in.applescript",
        "match": "\\b(booleans?|integers?|reals?|numbers?|(linked )?lists?|vectors?|records?|items?|scripts?|events?|propert(y|ies)|constants?|prepositions?|reference forms?|handlers?|data|characters?|writing code( infos?)?|missing values?|references?|anything|missing value|upper case|app(lications?)?|text items?|((international|styled( Clipboard|Unicode)?|Unicode) )?text|(C | encoded| Pascal )?strings?|(type )?class(es)?|RGB colors?|pictures?|sounds?|versions?|file specifications?|alias(es)?|machines?|zones?|keystrokes?|seconds|dates?|months?|(cubic |square |cubic centi|square kilo|centi|kilo)met(er|re)s|(square |cubic )?(yards|feet)|(square )?miles|(cubic )?inches|lit(re|er)s|gallons|quarts|(kilo)?grams|ounces|pounds|degrees (Celsius|Fahrenheit|Kelvin))\\b"
      },
      {
        "name": "constant.numeric.applescript",
        "match": "\\b\\d+((\\.(\\d+\\b)?)?(?i:e\\+?\\d*\\b)?|\\b)"
      }
    ]
  },
  "itunes": {
    "patterns": [
      {
        "name": "support.class.itunes.applescript",
        "match": "\\b(artwork|application|encoder|EQ preset|item|source|visual|(EQ |browser )?window|((audio CD|device|shared|URL|file) )?track|playlist window|((audio CD|device|radio tuner|library|folder|user) )?playlist)s?\\b"
      },
      {
        "name": "support.function.itunes.applescript",
        "match": "\\b(add|back track|convert|fast forward|(next|previous) track|pause|play(pause)?|refresh|resume|rewind|search|stop|update|eject|subscribe|update(Podcast|AllPodcasts)|download)\\b"
      },
      {
        "name": "support.constant.itunes.applescript",
        "match": "\\b(current (playlist|stream (title|URL)|track)|player state)\\b"
      },
      {
        "name": "support.variable.itunes.applescript",
        "match": "\\b(current (encoder|EQ preset|visual)|EQ enabled|fixed indexing|full screen|mute|player position|sound volume|visuals enabled|visual size)\\b"
      }
    ]
  },
  "textmate": {
    "patterns": [
      {
        "name": "support.class.textmate.applescript",
        "match": "\\b(print settings)\\b"
      },
      {
        "name": "support.function.textmate.applescript",
        "match": "\\b(get url|insert|reload bundles)\\b"
      }
    ]
  },
  "finder": {
    "patterns": [
      {
        "name": "support.class.finder.items.applescript",
        "match": "\\b(item|container|(computer|disk|trash)-object|disk|folder|((alias|application|document|internet location) )?file|clipping|package)s?\\b"
      },
      {
        "name": "support.class.finder.window-classes.applescript",
        "match": "\\b((Finder|desktop|information|preferences|clipping) )windows?\\b"
      },
      {
        "name": "support.class.finder.type-definitions.applescript",
        "match": "\\b(preferences|(icon|column|list) view options|(label|column|alias list)s?)\\b"
      },
      {
        "name": "support.function.finder.items.applescript",
        "match": "\\b(copy|find|sort|clean up|eject|empty( trash)|erase|reveal|update)\\b"
      },
      {
        "name": "support.constant.finder.applescript",
        "match": "\\b(insertion location|product version|startup disk|desktop|trash|home|computer container|finder preferences)\\b"
      },
      {
        "name": "support.variable.finder.applescript",
        "match": "\\b(visible)\\b"
      }
    ]
  },
  "standard-suite": {
    "patterns": [
      {
        "name": "support.class.standard-suite.applescript",
        "match": "\\b(colors?|documents?|items?|windows?)\\b"
      },
      {
        "name": "support.function.standard-suite.applescript",
        "match": "\\b(close|count|delete|duplicate|exists|make|move|open|print|quit|save|activate|select|data size)\\b"
      },
      {
        "name": "support.constant.standard-suite.applescript",
        "match": "\\b(name|frontmost|version)\\b"
      },
      {
        "name": "support.variable.standard-suite.applescript",
        "match": "\\b(selection)\\b"
      },
      {
        "name": "support.class.text-suite.applescript",
        "match": "\\b(attachments?|attribute runs?|characters?|paragraphs?|texts?|words?)\\b"
      }
    ]
  }
};

var patterns = [
  {
    "include": "#blocks"
  },
  {
    "include": "#inline"
  }
];

exports.AppleScriptSyntax = new TextmateSyntax(repositories, patterns);
