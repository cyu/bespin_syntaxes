"define metadata";
({
    "description": "Remind syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "defs.rem",
            "pointer": "#RemindSyntax",
            "fileexts": [
  "defs.rem",
  "REM*.txt",
  ".reminders"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "trigger": {
    "patterns": [
      {
        "name": "meta.attime.trigger.remind",
        "captures": {
          "1": {
            "name": "keyword.other.attime.trigger.remind"
          },
          "2": {
            "name": "constant.other.time.trigger.remind"
          },
          "3": {
            "name": "variable.other.component.trigger.remind"
          },
          "4": {
            "name": "variable.other.comp.trigger.remind"
          }
        },
        "match": "\\b(?i:(AT))\\s+(\\d{1,2}[:.]\\d{2})(?:\\s+(\\+{1,2}\\d+))?(?:\\s+(\\*\\d+))?(?=\\s)"
      },
      {
        "name": "meta.duration.trigger.remind",
        "captures": {
          "1": {
            "name": "keyword.other.duration.trigger.remind"
          },
          "2": {
            "name": "constant.other.time.trigger.remind"
          }
        },
        "match": "\\b(?i:(DURATION))\\s+(\\d{1,2}[:.]\\d{2})(?=\\s)"
      },
      {
        "name": "keyword.control.command.trigger.remind",
        "match": "\\b(?i:OMIT)\\b"
      },
      {
        "name": "keyword.control.move-reminder.trigger.remind",
        "match": "\\b(?i:ONCE|SKIP|BEFORE|AFTER)\\b"
      },
      {
        "name": "variable.other.component.delta.trigger.remind",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.remind"
          }
        },
        "match": "(\\+{1,2})\\d+"
      },
      {
        "name": "variable.other.component.back.trigger.remind",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.remind"
          }
        },
        "match": "(\\-{1,2})\\d+"
      },
      {
        "name": "variable.other.component.repeat.trigger.remind",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.remind"
          }
        },
        "match": "(\\*)\\d+"
      },
      {
        "include": "#date-item"
      }
    ]
  },
  "expression": {
    "patterns": [
      {
        "begin": "\\(",
        "captures": {
          "0": {
            "name": "punctuation.section.scope.remind"
          }
        },
        "end": "\\)",
        "patterns": [
          {
            "include": "#expression"
          }
        ]
      },
      {
        "name": "keyword.operator.remind",
        "match": "-|\\*|/|%|\\+|-|[!<>=]=?|&&|\\|\\|"
      },
      {
        "name": "string.quoted.double.remind",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.remind"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.remind"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "name": "constant.character.escape.remind",
            "match": "\\\\."
          }
        ]
      },
      {
        "name": "constant.other.date.remind",
        "match": "'\\d{4}([\\-/])\\d{1,2}\\1\\d{1,2}'"
      },
      {
        "name": "constant.other.time.remind",
        "match": "\\d{1,2}[:.]\\d{2}"
      },
      {
        "name": "constant.numeric.integer.remind",
        "match": "\\d+"
      },
      {
        "name": "variable.language.system.remind",
        "match": "\\$(?:CalcUTC|CalMode|Daemon|DefaultPrio|DontFork|DontTrigAts|DontQueue|EndSent|EndSentIg|FirstIndent|FoldYear|FormWidth|HushMode|IgnoreOnce|InfDelta|LatDeg|LatMin|LatSec|Location|LongDeg|LongMin|LongSec|MaxSatIter|MinsFromUTC|NextMode|NumQueued|NumTrig|PrefixLineNo|PSCal|RunOff|SimpleCal|SortByDate|SortByPrio|SortByTime|SubsIndent)\\b"
      },
      {
        "name": "meta.function.builtin.remind",
        "begin": "\\b(?:abs|access|args|asc|baseyr|char|choose|coerce|date|dawn|day|daysinmon|defined|dosubst|dusk|easterdate|filedate|filedir|filename|getenv|hour|iif|index|isdst|isleap|isomitted|hebdate|hebday|hebmon|hebyear|language|lower|max|min|minsfromutc|minute|min|monnum|moondate|moontime|moonphase|now|ord|ostype|plural|psmoon|psshade|realnow|realtoday|sgn|shell|strlen|substr|sunrise|sunset|time|today|trigdate|trigger|trigtime|trigvalid|typeof|upper|value|version|wkday|wkdaynum|year)\\(",
        "captures": {
          "0": {
            "name": "support.function.builtin.remind"
          }
        },
        "end": "\\)",
        "patterns": [
          {
            "include": "#expression"
          }
        ]
      },
      {
        "name": "meta.function.user.remind",
        "begin": "\\b(\\w+)(\\()",
        "endCaptures": {
          "1": {
            "name": "punctuation.definition.arguments.remind"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "entity.name.function.remind"
          },
          "2": {
            "name": "punctuation.definition.arguments.remind"
          }
        },
        "end": "(\\))",
        "patterns": [
          {
            "include": "#expression"
          }
        ]
      },
      {
        "name": "variable.parameter.user.remind",
        "match": "\\b\\w+\\b"
      }
    ]
  },
  "bracketed-expression": {
    "begin": "\\[",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.remind"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "#expression"
      }
    ]
  },
  "message-body": {
    "patterns": [
      {
        "name": "constant.other.placeholder.remind",
        "captures": {
          "1": {
            "name": "punctuation.definition.constant.remind"
          }
        },
        "match": "(%)[a-zA-Z0-9_!@#]"
      },
      {
        "name": "string.quoted.double.remind",
        "begin": "%\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.remind"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.remind"
          }
        },
        "end": "%\""
      },
      {
        "include": "#bracketed-expression"
      }
    ]
  },
  "date-item": {
    "patterns": [
      {
        "name": "support.constant.month.dateitem.remind",
        "match": "\\b(?i:January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)\\b"
      },
      {
        "name": "support.constant.weekday.dateitem.remind",
        "match": "\\b(?i:Monday|Mon|Tuesday|Tue|Wednesday|Wed|Thursday|Thu|Friday|Fri|Saturday|Sat|Sunday|Sun)\\b"
      },
      {
        "name": "support.constant.day.dateitem.remind",
        "match": "\\b(?:\\d{1,2})\\b"
      },
      {
        "name": "support.constant.year.dateitem.remind",
        "match": "\\b(?:\\d{4})\\b"
      }
    ]
  },
  "message": {
    "begin": "\\b(?i:MSG|MSF|RUN|CAL|SPECIAL|PS|PSFILE)\\b\\s*",
    "endCaptures": {
      "0": {
        "name": "keyword.control.endline.commandline.remind"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "keyword.control.message.commandline.remind"
      }
    },
    "end": "(%?[ \\t]*)(?=\\n|\\z)",
    "patterns": [
      {
        "include": "#message-body"
      }
    ]
  }
};

var patterns = [
  {
    "name": "comment.line.number-sign.remind",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.remind"
      }
    },
    "match": "[ ]*(#).*\\n?"
  },
  {
    "name": "comment.line.semicolon.remind",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.remind"
      }
    },
    "match": "[ ]*(;).*\\n?"
  },
  {
    "name": "meta.single.command.remind",
    "captures": {
      "0": {
        "name": "keyword.control.single.command.remind"
      }
    },
    "match": "\\b(?i:(?:RUN\\s+(ON|OFF))|(PUSH|CLEAR|POP)-OMIT-CONTEXT)\\b"
  },
  {
    "name": "meta.setline.remind",
    "begin": "\\b(?i:(SET))\\s+(\\$?\\w+)\\s+",
    "beginCaptures": {
      "1": {
        "name": "keyword.control.set.setline.remind"
      },
      "2": {
        "name": "variable.other.setline.remind"
      }
    },
    "end": "(?=#|\\n|\\z)",
    "patterns": [
      {
        "include": "#expression"
      }
    ]
  },
  {
    "name": "meta.fsetline.remind",
    "begin": "\\b(?i:(FSET))\\s+(\\w+(\\())(\\w+)?(?:,(\\w+))*(\\))",
    "beginCaptures": {
      "6": {
        "name": "punctuation.definition.arguments.remind"
      },
      "1": {
        "name": "keyword.control.fset.fsetline.remind"
      },
      "2": {
        "name": "entity.name.function.fsetline.remind"
      },
      "3": {
        "name": "punctuation.definition.arguments.remind"
      },
      "4": {
        "name": "variable.parameter.fsetline.remind"
      },
      "5": {
        "name": "variable.parameter.fsetline.remind"
      }
    },
    "end": "(?=#|\\n|\\z)",
    "patterns": [
      {
        "include": "#expression"
      }
    ]
  },
  {
    "name": "meta.unsetline.remind",
    "begin": "\\b(?i:(UNSET))\\b",
    "beginCaptures": {
      "1": {
        "name": "keyword.control.set.unsetline.remind"
      }
    },
    "end": "(?=#|\\n|\\z)",
    "patterns": [
      {
        "name": "variable.other.unsetline.remind",
        "match": "\\b\\w+\\b"
      }
    ]
  },
  {
    "name": "meta.if.remind",
    "begin": "\\b(?i:(IF))\\b",
    "captures": {
      "1": {
        "name": "keyword.control.if.remind"
      }
    },
    "end": "(?=#|\\n|\\z)",
    "patterns": [
      {
        "include": "#expression"
      }
    ]
  },
  {
    "name": "meta.iftrig.remind",
    "begin": "\\b(?i:(IFTRIG))\\b",
    "captures": {
      "1": {
        "name": "keyword.control.iftrig.remind"
      }
    },
    "end": "(?=#|\\n|\\z)",
    "patterns": [
      {
        "include": "#trigger"
      }
    ]
  },
  {
    "name": "keyword.control.else-or-endif.remind",
    "match": "\\b(?i:(ELSE|ENDIF))\\s*(?=#|\\n|\\z)"
  },
  {
    "name": "meta.includeline.remind",
    "begin": "\\b(?i:INCLUDE)\\b",
    "beginCaptures": {
      "0": {
        "name": "keyword.control.include.commandline.remind"
      }
    },
    "end": "(?=#|\\n|\\z)"
  },
  {
    "name": "meta.commandline.remind",
    "begin": "\\b(?i:REM|OMIT|BANNER)\\b",
    "endCaptures": {
      "0": {
        "name": "keyword.control.endline.commandline.remind"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "keyword.control.command.commandline.remind"
      }
    },
    "end": "(%?[ \\t]*)(?=(#|\\n|\\z))",
    "patterns": [
      {
        "name": "keyword.control.expiry.commandline.remind",
        "match": "\\b(?i:SCHED|WARN|SCANFROM|SCAN|UNTIL)\\b"
      },
      {
        "name": "meta.satisfy.remind",
        "begin": "\\b(?i:SATISFY)\\b",
        "beginCaptures": {
          "0": {
            "name": "keyword.control.satisfy.commandline.remind"
          }
        },
        "end": "(?=(#|\\n|\\z))",
        "patterns": [
          {
            "include": "#expression"
          }
        ]
      },
      {
        "include": "#trigger"
      },
      {
        "include": "#message-body"
      },
      {
        "include": "#bracketed-expression"
      },
      {
        "include": "#message"
      }
    ]
  },
  {
    "include": "#bracketed-expression"
  },
  {
    "include": "#message"
  }
];

exports.RemindSyntax = new TextmateSyntax(repositories, patterns);
