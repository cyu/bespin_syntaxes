"define metadata";
({
    "description": "MacPorts Portfile syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#MacPorts PortfileSyntax",
            "fileexts": [

]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "bare-string": {
    "comment": "imported from Tcl grammar",
    "begin": "(?:^|(?<=\\s))\"",
    "endCaptures": {
      "1": {
        "name": "invalid.illegal.tcl"
      }
    },
    "end": "\"(\\S*)",
    "patterns": [
      {
        "include": "#escape"
      },
      {
        "include": "#variable"
      }
    ]
  },
  "braces": {
    "comment": "imported from Tcl grammar",
    "begin": "(?:^|(?<=\\s))\\{",
    "endCaptures": {
      "1": {
        "name": "invalid.illegal.tcl"
      }
    },
    "end": "\\}(\\S*)",
    "patterns": [
      {
        "name": "constant.character.escape.tcl",
        "match": "\\\\[{}\\n]"
      },
      {
        "include": "#inner-braces"
      }
    ]
  },
  "escape": {
    "comment": "imported from Tcl grammar",
    "name": "constant.character.escape.tcl",
    "match": "\\\\(\\d{1,3}|x[a-fA-F0-9]+|u[a-fA-F0-9]{1,4}|.|\\n)"
  },
  "inner-braces": {
    "comment": "imported from Tcl grammar",
    "begin": "\\{",
    "end": "\\}",
    "patterns": [
      {
        "name": "constant.character.escape.tcl",
        "match": "\\\\[{}\\n]"
      },
      {
        "include": "#inner-braces"
      }
    ]
  },
  "string": {
    "comment": "imported from Tcl grammar",
    "begin": "(?:^|(?<=\\s))(?=\")",
    "name": "string.quoted.double.tcl",
    "applyEndPatternLast": 1,
    "end": "",
    "patterns": [
      {
        "include": "#bare-string"
      }
    ]
  },
  "embedded": {
    "comment": "imported from Tcl grammar",
    "begin": "\\[",
    "name": "source.tcl.embedded",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.embedded.end.tcl"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.section.embedded.begin.tcl"
      }
    },
    "end": "\\]",
    "patterns": [
      {
        "include": "source.tcl.macports"
      }
    ]
  },
  "variable": {
    "comment": "imported from Tcl grammar",
    "name": "variable.other.tcl",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.tcl"
      }
    },
    "match": "(\\$)([a-zA-Z0-9_:]+(\\([^\\)]+\\))?|\\{[^\\}]*\\})"
  }
};

var patterns = [
  {
    "begin": "^\\s*(PortGroup)\\s+ruby(?!\\S)",
    "comment": "special case for ruby PortGroup",
    "beginCaptures": {
      "1": {
        "name": "keyword.other.tcl.macports"
      }
    },
    "end": "$.^",
    "patterns": [
      {
        "include": "$base"
      },
      {
        "name": "keyword.other.tcl.macports",
        "match": "^\\s*ruby\\.setup(?!\\S)"
      }
    ]
  },
  {
    "begin": "^\\s*(PortGroup)\\s+perl5(?!\\S)",
    "comment": "special case for the perl5 PortGroup",
    "beginCaptures": {
      "1": {
        "name": "keyword.other.tcl.macports"
      }
    },
    "end": "$.^",
    "patterns": [
      {
        "include": "$base"
      },
      {
        "name": "keyword.other.tcl.macports",
        "match": "^\\s*perl5\\.setup(?!\\S)"
      }
    ]
  },
  {
    "comment": "Base commands",
    "captures": {
      "1": {
        "name": "keyword.other.tcl.macports"
      }
    },
    "match": "^\\s*(PortSystem|PortGroup)(?!\\S)"
  },
  {
    "comment": "Procs defined with the `commands` keyword (ignore use_option-{delete,append} as it is useless)",
    "captures": {
      "1": {
        "name": "keyword.other.tcl.macports"
      }
    },
    "match": "^\\s*(use_(?:configure|build|automake|autoconf|xmkmf|libtool|destroot|extract|cvs|svn|patch|test)|(?:configure|build|automake|autoconf|xmkmf|libtool|destroot|extract|cvs|svn|patch|test)\\.(?:dir|(?:pre_|post_)?args|env|type|cmd)(?:-(?:delete|append))?)(?!\\S)"
  },
  {
    "comment": "Procs defined with the `target_provides` keyword",
    "captures": {
      "1": {
        "name": "keyword.other.tcl.macports"
      }
    },
    "match": "^\\s*((?:(?:pre|post)-)?(?:activate|build|checksum|clean|configure|destroot|distcheck|extract|fetch|install|livecheck|main|mirror|patch|pkg|mpkg|submit|test))(?!\\S)"
  },
  {
    "comment": "Procs defined with the `options` keyword",
    "captures": {
      "1": {
        "name": "keyword.other.tcl.macports"
      }
    },
    "match": "^\\s*((?:build\\.target|categories|checksum\\.skip|checksums|cvs\\.(?:date|module|password|root|tag)|default_variants|depends_(?:build|lib|run)|destroot\\.(?:clean|destdir|keepdirs|target|umask)|dist_subdir|distcheck\\.check|distfiles|distname|distpath|epoch|extract\\.(?:only|suffix)|fetch\\.(?:password|type|use_epsv|user)|filesdir|gnustep\\.domain|homepage|install\\.(?:group|user)|libpath|livecheck\\.(?:check|md5|name|distname|regex|url|version)|maintainers|(?:master|patch)_sites(?:\\.mirror_subdir)?|name|os\\.(?:arch|endian|platform|version)|patchfiles|platforms|portdbpath|portname|prefix|revision|sources_conf|startupitem\\.(?:create|executable|init|logevents|logfile|name|pidfile|requires|restart|start|stop|type)|svn\\.(?:tag|url)|test\\.(?:run|target)|use_bzip2|use_zip|version|workdir|worksrcdir|xcode\\.(?:build\\.settings|configuration|destroot\\.(?:path|settings|type)|project|target)|zope\\.need_subdir)(?:-(?:delete|append))?)(?!\\S)"
  },
  {
    "begin": "^\\s*((?:long_)?description)(?!\\S)",
    "comment": "special-case description and long_description for backslash-newline escapes and string scoping",
    "beginCaptures": {
      "1": {
        "name": "keyword.other.tcl.macports"
      }
    },
    "end": "[\\n;]",
    "contentName": "string.unquoted.tcl.macports",
    "patterns": [
      {
        "include": "#escape"
      },
      {
        "include": "#string"
      },
      {
        "include": "#braces"
      },
      {
        "include": "#embedded"
      },
      {
        "include": "#variable"
      }
    ]
  },
  {
    "name": "meta.variant.tcl.macports",
    "begin": "^(variant)(?!\\S)",
    "captures": {
      "1": {
        "name": "keyword.other.variant.tcl.macports"
      }
    },
    "end": "\\n",
    "patterns": [
      {
        "name": "keyword.other.variant.tcl.macports",
        "match": "(?<=\\s)(?:provides|requires|conflicts)(?!\\S)"
      },
      {
        "name": "entity.name.function.variant.tcl.macports",
        "match": "(?<=\\s)([\\w-]+)"
      },
      {
        "begin": "(\\{)",
        "endCaptures": {
          "1": {
            "name": "punctuation.terminator.variant.tcl.macports"
          }
        },
        "beginCaptures": {
          "1": {
            "name": "punctuation.section.variant.tcl.macports"
          }
        },
        "end": "(\\})",
        "patterns": [
          {
            "include": "source.tcl.macports"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.variant.platform.tcl.macports",
    "begin": "^(platform)(?:\\s+(\\S+))?(?:\\s+(\\S+))?(?:\\s+(\\S+))?\\s+(\\{)",
    "endCaptures": {
      "1": {
        "name": "punctuation.terminator.variant.platform.tcl.macports"
      }
    },
    "beginCaptures": {
      "1": {
        "name": "keyword.other.variant.platform.tcl.macports"
      },
      "2": {
        "name": "entity.name.function.variant.platform.tcl.macports"
      },
      "5": {
        "name": "punctuation.section.variant.platform.tcl.macports"
      }
    },
    "end": "(\\})",
    "patterns": [
      {
        "include": "source.tcl.macports"
      }
    ]
  },
  {
    "name": "keyword.other.tcl.macports",
    "match": "(?<=^|[\\[{;])\\s*(adduser|addgroup|dirSize|binaryInPath|archiveTypeIsSupported|variant_isset|xinstall|system|reinplace|flock|readdir|strsed|mkstemp|mktemp|existsuser|existsgroup|nextuid|nextgid|md5|find|filemap|rpm-vercomp|rmd160|sha1|compat|umask|sudo|mkfifo|unixsocketpair|mkchannelfromfd|pipe|curl|readline|rl_history|getuid|geteuid|setuid|seteuid|name_to_uid|uid_to_name|ldelete|delete|include)\\b"
  },
  {
    "include": "source.tcl"
  }
];

exports.MacPorts PortfileSyntax = new TextmateSyntax(repositories, patterns);
