"define metadata";
({
    "description": "iCalendar syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "ics",
            "pointer": "#iCalendarSyntax",
            "fileexts": [
  "ics",
  "ifb"
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
    "name": "keyword.other.component-begin.icalendar",
    "captures": {
      "1": {
        "name": "entity.name.section.icalendar"
      }
    },
    "match": "^BEGIN:(.*)"
  },
  {
    "name": "keyword.other.component-end.icalendar",
    "captures": {
      "1": {
        "name": "entity.name.section.icalendar"
      }
    },
    "match": "^END:(.*)"
  },
  {
    "name": "constant.numeric.icalendar",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f)?\\b"
  },
  {
    "name": "string.quoted.double.icalendar",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.icalendar"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.icalendar"
      }
    },
    "end": "\""
  }
];

exports.iCalendarSyntax = new TextmateSyntax(repositories, patterns);
