"define metadata";
({
    "description": "Lilypond syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "ly",
            "pointer": "#LilypondSyntax",
            "fileexts": [
  "ly",
  "ily"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "group": {
    "begin": "{",
    "name": "meta.music-expression.lilypond",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.group.end.lilypond"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.group.begin.lilypond"
      }
    },
    "end": "}",
    "patterns": [
      {
        "include": "#music-expr"
      }
    ]
  },
  "g_markup": {
    "begin": "(?x)\n\t\t\t\t((\\\\) markup) \\s+ # backslash + \"markup\" + spaces\n\t\t\t\t(?={)\n\t\t\t",
    "name": "meta.element.markup.lilypond",
    "beginCaptures": {
      "1": {
        "name": "support.function.element.markup.lilypond"
      },
      "2": {
        "name": "punctuation.definition.function.markup"
      }
    },
    "end": "(?<=})",
    "patterns": [
      {
        "include": "#g_m_group"
      }
    ]
  },
  "comments": {
    "patterns": [
      {
        "name": "comment.block.lilypond",
        "begin": "%{",
        "captures": {
          "0": {
            "name": "punctuation.definition.comment.lilypond"
          }
        },
        "end": "%}"
      },
      {
        "name": "comment.line.lilypond",
        "begin": "%",
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.comment.lilypond"
          }
        },
        "end": "$\\n?"
      }
    ]
  },
  "n_articulations": {
    "patterns": [
      {
        "name": "storage.modifier.articulation.accent.lilypond",
        "match": "(?x)\n\t\t\t\t\t\t([_^-])\n\t\t\t\t\t\t(?:[.>^+_-])\n\t\t\t\t\t"
      },
      {
        "name": "storage.modifier.articulation.named.lilypond",
        "captures": {
          "1": {
            "name": "punctuation.definition.function.lilypond"
          }
        },
        "match": "(?x)\n\t\t\t\t\t\t(\\\\)\n\t\t\t\t\t\t(?: accent | markato | staccatissimo |\t\t       # basic accents\n\t\t\t\t\t\t\tespressivo | staccato | tenuto | portato | \n\t\t\t\t\t\t\t(?:up|down)bow | flageolet | thumb |\n\t\t\t\t\t\t\t[lr](?:heel|toe) | open | stopped |\n\t\t\t\t\t\t\t(?:reverse)?turn | trill |\n\t\t\t\t\t\t\tprall(?: prall | mordent | down | up)? |       # pralls\n\t\t\t\t\t\t\t(?: up | down | line ) prall |                 # and\n\t\t\t\t\t\t\t(?: up | down )? mordent |                     # mordents\n\t\t\t\t\t\t\tsignumcongruentiae |\n\t\t\t\t\t\t\t(?: (?:very)? long | short)?fermata(Markup)? | # fermatas\n\t\t\t\t\t\t\tsegno | (?:var)?coda \n\t\t\t\t\t\t)\n\t\t\t\t\t"
      },
      {
        "name": "storage.modifier.articulation.dynamics.lilypond",
        "match": "(?x)\n\t\t\t\t\t\t(\\\\) # backslash\n\t\t\t\t\t\tp{1,5} | m[pf] | f{1,4} | fp | # forte, piano, etc.\n\t\t\t\t\t\tsff? | spp? | [sr]fz | \n\t\t\t\t\t\t< | > | ! | espressivo         # (de)crescendo\n\t\t\t\t\t"
      },
      {
        "name": "storage.modifier.beam.lilypond",
        "match": "\\[|\\]"
      },
      {
        "name": "storage.modifier.slur.lilypond",
        "match": "\\(|\\)"
      }
    ]
  },
  "notes": {
    "comment": "\n\t\t\t\tThis section includes the rules for notes, rests, and chords\n\t\t\t",
    "patterns": [
      {
        "name": "meta.element.note.lilypond",
        "begin": "(?x)\\b\n\t\t\t\t\t    (\t\t\t\t\t\t  # (group 1)\n\t\t\t\t\t\t  ( [a-h]                 # Pitch (group 2)\n\t\t\t\t\t\t    ( (?:i[sh]){1,2} |    #   - sharp (group 3)\n\t\t\t\t\t\t      (?:e[sh]|s){1,2}    #   - flat\n\t\t\t\t\t\t    )?\n\t\t\t\t\t        ([!?])?               # Cautionary accidental (group 4)\n\t\t\t\t\t        ('+|,+)?             # Octave (group 5)\n\t\t\t\t\t\t  )\n\t\t\t\t\t\t  ( ( ((\\\\)breve)|        # Duration (groups 6-9)\n\t\t\t\t\t\t      64|32|16|8|4|2|1\n\t\t\t\t\t\t    )\n\t\t\t\t\t\t    (\\.)?                 # Augmentation dot (group 10)\n\t\t\t\t\t\t\t((\\*)(\\d+(?:/\\d+)?))? # Scaling duration (groups 11-13)\n\t\t\t\t\t\t  )?\n\t\t\t\t\t\t)(?![a-z])\t# do not follow a note with a letter\n\t\t\t\t\t",
        "comment": "\n\t\t\t\t\t\tThis rule handles notes, including the pitch, the\n\t\t\t\t\t\tduration, and any articulations drawn along with\n\t\t\t\t\t\tthe note.\n\t\t\t\t\t\t\n\t\t\t\t\t\tThis rule gets a whole lot uglier if we want to\n\t\t\t\t\t\tsupport multilingual note names.  If so, the rule\n\t\t\t\t\t\tgoes something like:\n\t\t\t\t\t\t\n\t\t\t\t\t\t(?x)\n\t\t\t\t\t\t\t\\b( # Basic Pitches\n\t\t\t\t\t\t\t  [a-h]  # Dutch/English/etc.                         \n\t\t\t\t\t\t\t  (?: (iss?|s|sharp|x)(iss?|s|sharp|x|ih) | # sharp / flat\n\t\t\t\t\t\t\t\t  (ess?|s|flat|f)(ess?|s|flat|f|eh)\n\t\t\t\t\t\t\t  )? |\n\t\t\t\t\t\t\t  (?: do|re|mi|fa|sol|la|si) # Italian/Spanish\n\t\t\t\t\t\t\t  (?: ss?|dd?bb?) # sharp/flat\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t...\n\t\t\t\t\t",
        "beginCaptures": {
          "6": {
            "name": "storage.type.duration.lilypond"
          },
          "12": {
            "name": "keyword.operator.duration-scale.lilypond"
          },
          "13": {
            "name": "constant.numeric.fraction.lilypond"
          },
          "9": {
            "name": "punctuation.definition.function.lilypond"
          },
          "2": {
            "name": "storage.type.pitch.lilypond"
          },
          "4": {
            "name": "meta.note-modifier.cautionary-accidental.lilypond"
          },
          "5": {
            "name": "meta.note-modifier.octave.lilypond"
          }
        },
        "end": "(?x)\n\t\t\t\t\t\t(?= [ }~a-z] ) # End when we encounter a space or }\n\t\t\t\t\t",
        "patterns": [
          {
            "include": "#n_articulations"
          }
        ]
      },
      {
        "name": "meta.element.pause.rest.lilypond",
        "begin": "(?x)\\b\n\t\t\t\t\t\t(r) # (group 1)\n\t\t\t\t\t\t( ( (\\\\)breve|       # Duration (groups 2-4)\n\t\t\t\t\t\t    64|32|16|8|4|2|1\n\t\t\t\t\t\t  )\n\t\t\t\t\t\t  (\\.)?                 # Augmentation dot (group 5)\n\t\t\t\t\t\t  ((\\*)(\\d+(?:/\\d+)?))? # Scaling duration (groups 6-8)\n\t\t\t\t\t\t\n\t\t\t\t\t\t)?\n\t\t\t\t\t\t(?![a-z])\t# do not follow a note with a letter\n\t\t\t\t\t",
        "beginCaptures": {
          "6": {
            "name": "keyword.operator.duration-scale.lilypond"
          },
          "8": {
            "name": "constant.numeric.fraction.lilypond"
          },
          "1": {
            "name": "storage.type.pause.rest.lilypond"
          },
          "2": {
            "name": "storage.type.duration.lilypond"
          },
          "4": {
            "name": "punctuation.definition.function.lilypond"
          }
        },
        "end": "(?=[ }~a-z])",
        "patterns": [
          {
            "include": "#n_articulations"
          }
        ]
      },
      {
        "name": "meta.element.pause.skip.lilypond",
        "begin": "(?x)\\b\n\t\t\t\t\t\t(s) # (group 1)\n\t\t\t\t\t\t( ( (\\\\)breve|       # Duration (groups 2-4)\n\t\t\t\t\t\t    64|32|16|8|4|2|1\n\t\t\t\t\t\t  )\n\t\t\t\t\t\t  (\\.)?                 # Augmentation dot (group 5)\n\t\t\t\t\t\t  ((\\*)(\\d+(?:/\\d+)?))? # Scaling duration (groups 6-8)\n\t\t\t\t\t\t\n\t\t\t\t\t\t)?\n\t\t\t\t\t\t(?![a-z])\t# do not follow a note with a letter\n\t\t\t\t\t",
        "beginCaptures": {
          "6": {
            "name": "keyword.operator.duration-scale.lilypond"
          },
          "8": {
            "name": "constant.numeric.fraction.lilypond"
          },
          "1": {
            "name": "storage.type.pause.skip.lilypond"
          },
          "2": {
            "name": "storage.type.duration.lilypond"
          },
          "4": {
            "name": "punctuation.definition.function.lilypond"
          }
        },
        "end": "(?=[ }~a-z])",
        "patterns": [
          {
            "include": "#n_articulations"
          }
        ]
      },
      {
        "name": "meta.element.pause.skip.lilypond",
        "captures": {
          "1": {
            "name": "storage.type.pause.skip.lilypond"
          },
          "2": {
            "name": "punctuation.definition.function.lilypond"
          },
          "3": {
            "name": "storage.type.duration.lilypond"
          }
        },
        "match": "((\\\\)skip)\\s+(64|32|16|8|4|2|1)"
      },
      {
        "name": "meta.element.chord.lilypond",
        "begin": "<",
        "comment": "\n\t\t\t\t\t\tLilypond chords look like:    < a b c >\n\t\t\t\t\t",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.chord.lilypond"
          },
          "2": {
            "name": "storage.type.duration.lilypond"
          },
          "4": {
            "name": "punctuation.definition.function.lilypond"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.chord.lilypond"
          }
        },
        "end": "(?x)\n\t\t\t\t\t\t(>)\n\t\t\t\t\t\t( ( ((\\\\)breve)|        # Duration (groups 2-4)\n\t\t\t\t\t\t    64|32|16|8|4|2|1\n\t\t\t\t\t\t  )\n\t\t\t\t\t\t  (\\.)?                  # Augmentation dot (group 5)\n\t\t\t\t\t\t)?\n\t\t\t\t\t",
        "patterns": [
          {
            "captures": {
              "1": {
                "name": "storage.type.pitch.lilypond"
              },
              "3": {
                "name": "meta.note-modifier.cautionary-accidental.lilypond"
              },
              "4": {
                "name": "meta.note-modifier.octave.lilypond"
              }
            },
            "match": "(?x)\\b\n\t\t\t\t\t\t\t\t  ( [a-h]                 # Pitch (group 1)\n\t\t\t\t\t\t\t\t    ( (?:i[sh]){1,2} |    #   - sharp (group 2)\n\t\t\t\t\t\t\t\t      (?:e[sh]|s){1,2}    #   - flat\n\t\t\t\t\t\t\t\t    )?\n\t\t\t\t\t\t\t        ([!?])?               # Cautionary accidental (group 3)\n\t\t\t\t\t\t\t        ('+|,+)?             # Octave (group 4)\n\t\t\t\t\t\t\t\t  )\n\t\t\t\t\t\t\t"
          }
        ]
      },
      {
        "name": "meta.element.chord.lilypond",
        "begin": "(?<=>)(?<!->)(?!\\s)",
        "comment": "\n\t\t\t\t\t\tThis rule attaches stuff to the end of a chord\n\t\t\t\t\t\t\n\t\t\t\t\t\tTherefore it begins after the > which ends a chord,\n\t\t\t\t\t\tand does not end after a > which ends a chord.\n\t\t\t\t\t\t(to avoid infinite loops)\n\t\t\t\t\t",
        "end": "(?=[ }~a-z])(?<![^-]>)",
        "patterns": [
          {
            "include": "#n_articulations"
          }
        ]
      },
      {
        "name": "storage.type.tie.lilypond",
        "match": "~"
      },
      {
        "name": "storage.type.breath-mark.lilypond",
        "captures": {
          "1": {
            "name": "punctuation.definition.function.lilypond"
          }
        },
        "match": "(\\\\)breathe"
      }
    ]
  },
  "f_keywords": {
    "name": "keyword.control.lilypond",
    "captures": {
      "1": {
        "name": "punctuation.definition.function.lilypond"
      }
    },
    "match": "(?x)\n\t\t\t\t(?: (\\\\)\n\t\t\t\t    (?: set | new | override | revert)\n\t\t\t\t)\n\t\t\t"
  },
  "g_relative": {
    "begin": "((\\\\)relative)\\s*(?:([a-h][',]*)\\s*)?(?={)",
    "beginCaptures": {
      "1": {
        "name": "support.function.section.lilypond"
      },
      "2": {
        "name": "punctuation.definition.function.lilypond"
      },
      "3": {
        "name": "storage.type.pitch.lilypond"
      }
    },
    "end": "(?<=})",
    "patterns": [
      {
        "include": "#group"
      }
    ]
  },
  "f_clef": {
    "comment": "\n\t\t\t\tThis looks something like:   \\clef mezzosoprano_8\n\t\t\t\tOr maybe:                    \\clef neomensural-c3^15\n\t\t\t",
    "name": "meta.element.clef.lilypond",
    "captures": {
      "6": {
        "name": "meta.fixme.unknown-clef-name.lilypond"
      },
      "7": {
        "name": "constant.other.modifier.clef.lilypond"
      },
      "8": {
        "name": "punctuation.definition.string.lilypond"
      },
      "1": {
        "name": "support.function.element.lilypond"
      },
      "2": {
        "name": "punctuation.definition.function.lilypond"
      },
      "3": {
        "name": "punctuation.definition.string.lilypond"
      },
      "4": {
        "name": "constant.language.clef-name.lilypond"
      },
      "5": {
        "name": "constant.other.modifier.clef.lilypond"
      }
    },
    "match": "(?x)\n\t\t\t\t((\\\\) clef) \\s+  # backslash + \"clef\" + spaces (groups 1-2)\n\t\t\t\t(?:\n\t\t\t\t  (\"?)\t# beginning quotes (group 3)\n\t\t\t\t  ( (?: # group 4\n\t\t\t\t\t  treble | violin | G | french |                    # G clefs\n\t\t\t\t      alto | C | tenor | (?:mezzo)?soprano | baritone | # C clefs\n\t\t\t\t      (?:sub)?bass | F | varbaritone |                  # F clefs\n\t\t\t\t      percussion | tab | # percussion / tablature clefs\n                      \n\t\t\t          (?:neo)?mensural-c[1-4] | mensural-[fg] | \t\t# Ancient clefs\n\t\t\t\t      petrucci-(?: [fg] | c[1-5] ) |\n\t\t\t\t      (?: vaticana | medicaea | hufnagel ) - (?: do[1-3] | fa[12] ) |\n\t\t\t\t      hufnagel-do-fa\n\t\t\t\t    )\n\t\t\t\t    ([_^](?:8|15)?)? # optionally shift 1-2 octaves ↑/↓ (group 5)\n\t\t\t\t  ) |\n\t\t\t\t  ( (?:\\w+) ([_^](?:8|15))? ) # unknown clef name (groups 6-7)\n\t\t\t\t  (\\3) # closing quotes (group 8)\n\t\t\t\t)?\n\t\t\t"
  },
  "g_times": {
    "begin": "((\\\\)times)\\s*(?:([1-9][0-9]*/[1-9][0-9])\\s*)(?={)",
    "beginCaptures": {
      "1": {
        "name": "support.function.section.lilypond"
      },
      "2": {
        "name": "punctuation.definition.function.lilypond"
      },
      "3": {
        "name": "constant.numeric.fraction.lilypond"
      }
    },
    "end": "(?<=})",
    "patterns": [
      {
        "include": "#group"
      }
    ]
  },
  "strings": {
    "begin": "\"",
    "name": "string.quoted.double.lilypond",
    "captures": {
      "0": {
        "name": "punctuation.definition.string.lilypond"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.lilypond",
        "match": "\\\\."
      }
    ]
  },
  "g_header": {
    "begin": "((\\\\)header)\\s*({)",
    "name": "meta.header.lilypond",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.group.end.lilypond"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "support.function.section.header.lilypond"
      },
      "2": {
        "name": "punctuation.definition.function.lilypond"
      },
      "3": {
        "name": "punctuation.section.group.begin.lilypond"
      }
    },
    "end": "}",
    "patterns": [
      {
        "include": "#comments"
      },
      {
        "include": "#strings"
      },
      {
        "include": "#scheme"
      },
      {
        "include": "#g_markup"
      },
      {
        "name": "punctuation.separator.key-value.lilypond",
        "match": "="
      },
      {
        "name": "support.constant.header.lilypond",
        "match": "(?x)\n\t\t\t\t\t\tdedication | title | subtitle | subsubtitle | poet |\n\t\t\t\t\t\tcomposer | meter | opus | arranger | instrument |\n\t\t\t\t\t\tpiece | breakbefore | copyright | tagline | enteredby\n\t\t\t\t\t"
      },
      {
        "name": "support.constant.header.mutopia.lilypond",
        "match": "(?x)\n\t\t\t\t\t\tmutopiatitle | mutopiacomposer | mutopiapoet |\n\t\t\t\t\t\tmutopiaopus | mutopiainstrument | date | source |\n\t\t\t\t\t\tstyle | maintainer | maintainerEmail |\n\t\t\t\t\t\tmaintainerWeb | lastupdated\n\t\t\t\t\t"
      }
    ]
  },
  "groupings": {
    "patterns": [
      {
        "include": "#g_system"
      },
      {
        "include": "#g_relative"
      },
      {
        "include": "#g_times"
      },
      {
        "include": "#group"
      }
    ]
  },
  "music-expr": {
    "patterns": [
      {
        "include": "#comments"
      },
      {
        "include": "#groupings"
      },
      {
        "include": "#strings"
      },
      {
        "include": "#functions"
      },
      {
        "include": "#scheme"
      },
      {
        "include": "#notes"
      }
    ]
  },
  "functions": {
    "patterns": [
      {
        "include": "#f_clef"
      },
      {
        "include": "#f_time-signature"
      },
      {
        "include": "#f_key-signature"
      },
      {
        "include": "#f_keywords"
      },
      {
        "include": "#f_generic"
      }
    ]
  },
  "scheme": {
    "comment": "\n\t\t\t\tLilypond source can embed scheme code to do things more\n\t\t\t\tflexibly than allowed by the basic language.\n\n\t\t\t\tWe need to make sure to match after a \\n, as included\n\t\t\t\tby some s-expressions in the scheme grammar.\n\t\t\t",
    "begin": "#",
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.scheme.lilypond"
      }
    },
    "end": "(?=[\\s%])|(?<=\\n)",
    "contentName": "source.scheme.embedded.lilypond",
    "patterns": [
      {
        "include": "source.scheme"
      }
    ]
  },
  "f_key-signature": {
    "comment": "FIXME",
    "name": "meta.element.key-signature.lilypond"
  },
  "g_system": {
    "begin": "<<",
    "name": "meta.system.lilypond",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.system.end.lilypond"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.system.begin.lilypond"
      }
    },
    "end": ">>",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  "f_time-signature": {
    "name": "meta.element.time-signature.lilypond",
    "captures": {
      "1": {
        "name": "support.function.element.lilypond"
      },
      "2": {
        "name": "punctuation.definition.function.lilypond"
      },
      "3": {
        "name": "constant.numeric.time-signature.lilypond"
      }
    },
    "match": "(?x)\n\t\t\t\t((\\\\) time) \\s+ # backslash + \"time\" + spaces (groups 1-2)\n\t\t\t\t([1-9][0-9]*/[1-9][0-9]*)?\n\t\t\t"
  },
  "g_m_group": {
    "begin": "{",
    "name": "meta.group.lilypond",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.group.end.lilypond"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.group.begin.lilypond"
      }
    },
    "end": "}",
    "patterns": [
      {
        "include": "#f_generic"
      },
      {
        "include": "#strings"
      },
      {
        "include": "#comments"
      },
      {
        "include": "#scheme"
      },
      {
        "include": "#g_m_group"
      }
    ]
  },
  "f_generic": {
    "name": "support.function.general.lilypond",
    "captures": {
      "1": {
        "name": "punctuation.definition.function.lilypond"
      }
    },
    "match": "(\\\\)[a-zA-Z-]+\\b"
  }
};

var patterns = [
  {
    "include": "#comments"
  },
  {
    "include": "#g_header"
  },
  {
    "include": "#groupings"
  },
  {
    "include": "#strings"
  },
  {
    "include": "#scheme"
  },
  {
    "include": "#functions"
  }
];

exports.LilypondSyntax = new TextmateSyntax(repositories, patterns);
