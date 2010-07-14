"define metadata";
({
    "description": "Installer Distribution Script syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "dist",
            "pointer": "#Installer Distribution ScriptSyntax",
            "fileexts": [
  "dist"
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
    "name": "source.js.embedded.apple-dist",
    "begin": "((<)(script)(>))",
    "captures": {
      "1": {
        "name": "meta.tag.xml"
      },
      "2": {
        "name": "punctuation.definition.tag.xml"
      },
      "3": {
        "name": "entity.name.tag.xml"
      },
      "4": {
        "name": "punctuation.definition.tag.xml"
      }
    },
    "end": "((</)(script)(>))",
    "patterns": [
      {
        "name": "support.class.apple-dist",
        "begin": "\\bsystem\\b",
        "end": "(?=(\\(|\\s))|$",
        "patterns": [
          {
            "name": "support.function.apple-dist",
            "match": "\\b(compareVersions|defaults|gestalt|localizedString(WithFormat)?|localizedStandardString(WithFormat)?|log|propertiesOf|run(Once)?|sysctl|users\\.desktopSessionsCount|version)\\b"
          },
          {
            "name": "support.function.apple-dist",
            "begin": "\\b(applications)\\b",
            "end": "(?=(\\(|\\s))|$",
            "patterns": [
              {
                "name": "support.variable.apple-dist",
                "match": "\\b(fromPID|fromIdentifier|all)\\b"
              }
            ]
          },
          {
            "name": "support.function.apple-dist",
            "begin": "\\b(files)\\b",
            "end": "(?=(\\(|\\s))|$",
            "patterns": [
              {
                "name": "support.variable.apple-dist",
                "match": "\\b(fileExistsAtPath|plistAtPath|bundleAtPath)\\b"
              }
            ]
          },
          {
            "name": "support.function.apple-dist",
            "begin": "\\b(ioregistry)\\b",
            "end": "(?=(\\(|\\s))|$",
            "patterns": [
              {
                "name": "support.variable.apple-dist",
                "match": "\\b(fromPath|matching(Class|Name)|(children|parents)Of)\\b"
              }
            ]
          }
        ]
      },
      {
        "name": "support.class.apple-dist",
        "begin": "\\b(choices)\\b",
        "end": "(?=(\\(|\\s))|$",
        "patterns": [
          {
            "name": "support.variable.apple-dist",
            "match": "\\b(.*)\\.(bundle|customLocation(AllowAlternateVolumes)?|description(-mime-type)?|(start_)?enabled|id|(start_)?selected|tooltip|(start_)?visible|title|packages|packageUpgradeAction)\\b"
          }
        ]
      },
      {
        "name": "support.class.apple-dist",
        "begin": "\\bmy\\b",
        "end": "(?=(\\(|\\s))|$",
        "patterns": [
          {
            "name": "support.function.apple-dist",
            "begin": "\\b(choice)\\b",
            "end": "(?=(\\(|\\s))|$",
            "patterns": [
              {
                "name": "support.variable.apple-dist",
                "match": "\\b(bundle|customLocation(AllowAlternateVolumes)?|description(-mime-type)?|(start_)?enabled|id|(start_)?selected|tooltip|(start_)?visible|title|packages|packageUpgradeAction)\\b"
              }
            ]
          },
          {
            "name": "support.function.apple-dist",
            "begin": "\\b(result)\\b",
            "end": "(?=(\\(|\\s))|$",
            "patterns": [
              {
                "name": "support.variable.apple-dist",
                "match": "\\b(type|title|message)\\b"
              }
            ]
          },
          {
            "name": "support.function.apple-dist",
            "begin": "\\b(target)\\b",
            "end": "(?=(\\(|\\s))|$",
            "patterns": [
              {
                "name": "support.variable.apple-dist",
                "match": "\\b(mountpoint|availableKilobytes|systemVersion|receiptForIdentifier)\\b"
              }
            ]
          }
        ]
      },
      {
        "include": "source.js"
      }
    ]
  },
  {
    "include": "text.xml"
  }
];

exports.Installer Distribution ScriptSyntax = new TextmateSyntax(repositories, patterns);
