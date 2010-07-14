"define metadata";
({
    "description": "mod_perl syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "conf",
            "pointer": "#mod_perlSyntax",
            "fileexts": [
  "conf"
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
    "name": "comment.block.documentation.apache-config.mod_perl",
    "begin": "^=",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.mod_perl"
      }
    },
    "end": "^=cut"
  },
  {
    "name": "support.constant.apache-config.mod_perl",
    "match": "\\b(PerlAddVar|PerlConfigRequire|PerlLoadModule|PerlModule|PerlOptions|PerlPassEnv|PerlPostConfigRequire|PerlRequire|PerlSetEnv|PerlSetVar|PerlSwitches|SetHandler|PerlOpenLogsHandler|PerlPostConfigHandler|PerlChildInitHandler|PerlChildExitHandler|PerlPreConnectionHandler|PerlProcessConnectionHandler|PerlInputFilterHandler|PerlOutputFilterHandler|PerlSetInputFilter|PerlSetOutputFilter|PerlPostReadRequestHandler|PerlTransHandler|PerlMapToStorageHandler|PerlInitHandler|PerlHeaderParserHandler|PerlAccessHandler|PerlAuthenHandler|PerlAuthzHandler|PerlTypeHandler|PerlFixupHandler|PerlResponseHandler|PerlLogHandler|PerlCleanupHandler|PerlInterpStart|PerlInterpMax|PerlInterpMinSpare|PerlInterpMaxSpare|PerlInterpMaxRequests|PerlInterpScope|PerlTrace)\\b"
  },
  {
    "name": "support.constant.apache-config.mod_perl_1.mod_perl",
    "match": "\\b(PerlHandler|PerlScript|PerlSendHeader|PerlSetupEnv|PerlTaintCheck|PerlWarn|PerlFreshRestart)\\b"
  },
  {
    "name": "meta.perl-section.apache-config.mod_perl",
    "begin": "^\\s*((<)(Perl)(>))",
    "endCaptures": {
      "1": {
        "name": "meta.tag.apache-config"
      },
      "2": {
        "name": "punctuation.definition.tag.apache-config"
      },
      "3": {
        "name": "entity.name.tag.apache-config"
      },
      "4": {
        "name": "punctuation.definition.tag.apache-config"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "meta.tag.apache-config"
      },
      "2": {
        "name": "punctuation.definition.tag.apache-config"
      },
      "3": {
        "name": "entity.name.tag.apache-config"
      },
      "4": {
        "name": "punctuation.definition.tag.apache-config"
      }
    },
    "end": "^\\s*((</)(Perl)(>))",
    "patterns": [
      {
        "include": "source.perl"
      }
    ]
  },
  {
    "include": "source.apache-config"
  }
];

exports.mod_perlSyntax = new TextmateSyntax(repositories, patterns);
