"define metadata";
({
    "description": "Apache syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "conf",
            "pointer": "#ApacheSyntax",
            "fileexts": [
  "conf",
  "htaccess"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "vars": {
    "patterns": [
      {
        "name": "support.variable.apache-config",
        "captures": {
          "1": {
            "name": "punctuation.definition.variable.apache-config"
          },
          "3": {
            "name": "punctuation.definition.variable.apache-config"
          }
        },
        "match": "(%\\{)(?:HTTP_(?:USER_AGENT|REFERER|COOKIE|FORWARDED|HOST|PROXY_CONNECTION|ACCEPT)|REMOTE_(?:ADDR|HOST|USER|IDENT)|REQUEST_(?:METHOD|URI|FILENAME)|SCRIPT_FILENAME|PATH_INFO|QUERY_STRING|AUTH_TYPE|DOCUMENT_ROOT|SERVER_(?:ADMIN|NAME|ADDR|PORT|PROTOCOL|SOFTWARE)|TIME_(?:YEAR|MON|DAY|HOUR|MIN|SEC|WDAY)|TIME|API_VERSION|THE_REQUEST|IS_SUBREQ|(?:ENV|LA-U|LA-F|HTTP|SSL):[^\\}]+)(\\})"
      },
      {
        "name": "invalid.illegal.bad-var.apache-config",
        "match": "%\\{[^\\}]+\\}"
      }
    ]
  }
};

var patterns = [
  {
    "name": "comment.line.number-sign.apache-config",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.apache-config"
      }
    },
    "match": "(#).*$\\n?"
  },
  {
    "name": "meta.tag.any.html",
    "captures": {
      "6": {
        "name": "punctuation.definition.tag.apache-config"
      },
      "1": {
        "name": "punctuation.definition.tag.apache-config"
      },
      "2": {
        "name": "entity.name.tag.apache-config"
      },
      "3": {
        "name": "punctuation.definition.tag.apache-config"
      },
      "4": {
        "name": "meta.scope.between-tag-pair.apache-config"
      },
      "5": {
        "name": "entity.name.tag.apache-config"
      }
    },
    "match": "^[ ]*(<)([a-zA-Z0-9:]+)[^>]*(>(<)/)(\\2)(>)"
  },
  {
    "name": "meta.vhost.apache-config",
    "begin": "^[ ]*((<)(VirtualHost)(?:[ ]+([^>]+))?(>))",
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
        "name": "meta.toc-list.virtual-host.apache-config"
      },
      "5": {
        "name": "punctuation.definition.tag.apache-config"
      }
    },
    "end": "^[ ]*((</)(VirtualHost)[^>]*(>))",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.directory.apache-config",
    "begin": "^[ ]*((<)(Directory(?:Match)?)(?:[ ]+([^>]+))?(>))",
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
        "name": "meta.toc-list.directory.apache-config"
      },
      "5": {
        "name": "punctuation.definition.tag.apache-config"
      }
    },
    "end": "^[ ]*((</)(Directory(?:Match)?)[^>]*(>))",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "name": "meta.location.apache-config",
    "begin": "^[ ]*((<)(Location(?:Match)?)(?:[ ]+([^>]+))?(>))",
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
        "name": "meta.toc-list.location.apache-config"
      },
      "5": {
        "name": "punctuation.definition.tag.apache-config"
      }
    },
    "end": "^[ ]*((</)(Location(?:Match)?)[^>]*(>))",
    "patterns": [
      {
        "include": "$base"
      }
    ]
  },
  {
    "begin": "^[ ]*\\b(RewriteCond)\\b",
    "captures": {
      "1": {
        "name": "support.constant.rewritecond.apache-config"
      }
    },
    "end": "$",
    "patterns": [
      {
        "begin": "[ ]+",
        "end": "$",
        "patterns": [
          {
            "include": "#vars"
          },
          {
            "name": "string.regexp.rewrite-test.apache-config",
            "match": "[^ %\\n]+"
          },
          {
            "begin": "[ ]+",
            "end": "$",
            "patterns": [
              {
                "name": "string.other.rewrite-condition.apache-config",
                "match": "[^ %\\n]+"
              },
              {
                "captures": {
                  "1": {
                    "name": "string.regexp.rewrite-operator.apache-config"
                  }
                },
                "match": "[ ]+(\\[[^\\]]+\\])"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "begin": "^[ ]*\\b(RewriteRule)\\b",
    "captures": {
      "1": {
        "name": "support.constant.rewriterule.apache-config"
      }
    },
    "end": "$",
    "patterns": [
      {
        "begin": "[ ]+",
        "end": "$",
        "patterns": [
          {
            "include": "#vars"
          },
          {
            "name": "string.regexp.rewrite-pattern.apache-config",
            "match": "[^ %]+"
          },
          {
            "begin": "[ ]+",
            "end": "$",
            "patterns": [
              {
                "include": "#vars"
              },
              {
                "name": "string.other.rewrite-substitution.apache-config",
                "match": "[^ %\\n]+"
              },
              {
                "captures": {
                  "1": {
                    "name": "string.regexp.rewrite-operator.apache-config"
                  }
                },
                "match": "[ ]+(\\[[^\\]]+\\])"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "support.constant.apache-config",
    "match": "\\b(R(e(sourceConfig|direct(Match|Temp|Permanent)?|qu(ire|estHeader)|ferer(Ignore|Log)|write(Rule|Map|Base|Cond|Options|Engine|Lo(ck|g(Level)?))|admeName|move(Handler|Charset|Type|InputFilter|OutputFilter|Encoding|Language))|Limit(MEM|NPROC|CPU))|Group|XBitHack|M(MapFile|i(nSpare(Servers|Threads)|meMagicFile)|odMimeUsePathInfo|Cache(RemovalAlgorithm|M(inObjectSize|ax(StreamingBuffer|Object(Size|Count)))|Size)|ultiviewsMatch|eta(Suffix|Dir|Files)|ax(RequestsPer(Child|Thread)|MemFree|Spare(Servers|Threads)|Clients|Threads(PerChild)?|KeepAliveRequests))|B(indAddress|S2000Account|rowserMatch(NoCase)?)|S(hmemUIDisUser|c(oreBoardFile|ript(Sock|InterpreterSource|Log(Buffer|Length)?|Alias(Match)?)?)|tart(Servers|Threads)|S(I(StartTag|TimeFormat|UndefinedEcho|E(ndTag|rrorMsg))|L(R(equire(SSL)?|andomSeed)|Mutex|SessionCache(Timeout)?|C(ipherSuite|ertificate(ChainFile|KeyFile|File)|A(Revocation(Path|File)|Certificate(Path|File)))|Options|P(assPhraseDialog|ro(tocol|xy(MachineCertificate(Path|File)|C(ipherSuite|A(Revocation(Path|File)|Certificate(Path|File)))|Protocol|Engine|Verify(Depth)?)))|Engine|Verify(Client|Depth)))|uexecUserGroup|e(ndBufferSize|cureListen|t(Handler|InputFilter|OutputFilter|Env(If(NoCase)?)?)|rver(Root|Signature|Name|T(ype|okens)|Path|Limit|A(dmin|lias)))|atisfy)|H(ostnameLookups|eader(Name)?)|N(o(Cache|Proxy)|umServers|ameVirtualHost|WSSL(TrustedCerts|Upgradeable))|C(h(ildPerUserID|eckSpelling|arset(SourceEnc|Options|Default))|GI(MapExtension|CommandArgs)|o(ntentDigest|okie(Style|Name|Tracking|Domain|Prefix|Expires|Format|Log)|reDumpDirectory)|ustomLog|learModuleList|ache(Root|Gc(MemUsage|Clean|Interval|Daily|Unused)|M(inFileSize|ax(Expire|FileSize))|Size|NegotiatedDocs|TimeMargin|Ignore(NoLastMod|CacheControl)|D(i(sable|rLe(ngth|vels))|efaultExpire)|E(nable|xpiryCheck)|F(ile|orceCompletion)|LastModifiedFactor))|T(hread(sPerChild|StackSize|Limit)|ypesConfig|ime(out|Out)|ransferLog)|I(n(clude|dex(Ignore|O(ptions|rderDefault)))|SAPI(ReadAheadBuffer|CacheFile|FakeAsync|LogNotSupported|AppendLogTo(Errors|Query))|dentityCheck|f(Module|Define)|map(Menu|Base|Default))|O(ptions|rder)|D(irectory(Match|Slash|Index)?|ocumentRoot|e(ny|f(late(MemLevel|BufferSize|CompressionLevel|FilterNote|WindowSize)|ault(Type|Icon|Language)))|av(MinTimeout|DepthInfinity|LockDB)?)|U(se(CanonicalName|r(Dir)?)|nsetEnv)|P(idFile|ort|assEnv|ro(tocol(ReqCheck|Echo)|xy(Re(ceiveBufferSize|quests|mote(Match)?)|Ma(tch|xForwards)|B(lock|adHeader)|Timeout|IOBufferSize|Domain|P(ass(Reverse)?|reserveHost)|ErrorOverride|Via)?))|E(nable(MMAP|Sendfile|ExceptionHook)|BCDIC(Convert(ByType)?|Kludge)|rror(Header|Document|Log)|x(t(endedStatus|Filter(Options|Define))|pires(ByType|Default|Active)|ample))|Virtual(ScriptAlias(IP)?|Host|DocumentRoot(IP)?)|KeepAlive(Timeout)?|F(ile(s(Match)?|ETag)|or(ce(Type|LanguagePriority)|ensicLog)|ancyIndexing)|Win32DisableAcceptEx|L(i(sten(Back(log|Log))?|mit(Request(Body|Field(s(ize)?|Size)|Line)|XMLRequestBody|InternalRecursion|Except)?)|o(c(kFile|ation(Match)?)|ad(Module|File)|g(Format|Level))|DAP(SharedCache(Size|File)|Cache(TTL|Entries)|TrustedCA(Type)?|OpCache(TTL|Entries))|anguagePriority)|A(ssignUserID|nonymous(_(MustGiveEmail|NoUserID|VerifyEmail|LogEmail|Authoritative))?|c(ce(ss(Config|FileName)|pt(Mutex|PathInfo|Filter))|tion)|dd(Module(Info)?|Handler|Charset|Type|I(nputFilter|con(By(Type|Encoding))?)|OutputFilter(ByType)?|De(scription|faultCharset)|Encoding|Language|Alt(By(Type|Encoding))?)|uth(GroupFile|Name|Type|D(B(GroupFile|M(GroupFile|Type|UserFile|Authoritative)|UserFile|Authoritative)|igest(GroupFile|ShmemSize|N(cCheck|once(Format|Lifetime))|Domain|Qop|File|Algorithm))|UserFile|LDAP(RemoteUserIsDN|GroupAttribute(IsDN)?|Bind(DN|Password)|C(harsetConfig|ompareDNOnServer)|DereferenceAliases|Url|Enabled|FrontPageHack|Authoritative)|Authoritative)|l(ias(Match)?|low(CONNECT|Override|EncodedSlashes)?)|gentLog))\\b"
  },
  {
    "name": "support.class.apache-config",
    "match": "\\b(access_module|action_module|alias_module|anon_auth_module|asis_module|auth_module|autoindex_module|cern_meta_module|cgi_module|config_log_module|dav_module|dbm_auth_module|digest_module|dir_module|env_module|expires_module|foo_module|headers_module|hfs_apple_module|imap_module|includes_module|info_module|jk_module|mime_magic_module|mime_module|negotiation_module|perl_module|php4_module|php5_module|proxy_module|rendezvous_apple_module|rendezvous_module|rewrite_module|setenvif_module|speling_module|ssl_module|status_module|unique_id_module|userdir_module|usertrack_module|vhost_alias_module)\\b"
  },
  {
    "name": "string.quoted.double.apache-config",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.apache-config"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.apache-config"
      }
    },
    "end": "\"(?!\")",
    "patterns": [
      {
        "name": "constant.character.escape.apostrophe.apache",
        "match": "\"\""
      }
    ]
  },
  {
    "name": "meta.tag.apache-config",
    "begin": "(</?)([a-zA-Z]+)",
    "captures": {
      "1": {
        "name": "punctuation.definition.tag.apache-config"
      },
      "2": {
        "name": "entity.name.tag.apache-config"
      }
    },
    "end": "(/?>)"
  }
];

exports.ApacheSyntax = new TextmateSyntax(repositories, patterns);
