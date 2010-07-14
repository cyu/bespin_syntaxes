"define metadata";
({
    "description": "ASP syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "asa",
            "pointer": "#ASPSyntax",
            "fileexts": [
  "asa"
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
    "name": "meta.function.asp",
    "captures": {
      "1": {
        "name": "storage.type.function.asp"
      },
      "2": {
        "name": "entity.name.function.asp"
      },
      "3": {
        "name": "punctuation.definition.parameters.asp"
      },
      "4": {
        "name": "variable.parameter.function.asp"
      },
      "5": {
        "name": "punctuation.definition.parameters.asp"
      }
    },
    "match": "^\\s*((?i:function|sub))\\s*([a-zA-Z_]\\w*)\\s*(\\()([^)]*)(\\)).*\\n?"
  },
  {
    "name": "comment.line.apostrophe.asp",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.asp"
      }
    },
    "match": "(').*$\\n?"
  },
  {
    "name": "keyword.control.asp",
    "match": "(?i:\\b(If|Then|Else|ElseIf|End If|While|Wend|For|To|Each|Case|Select|End Select|Return|Continue|Do|Until|Loop|Next|With|Exit Do|Exit For|Exit Function|Exit Property|Exit Sub)\\b)"
  },
  {
    "name": "keyword.operator.asp",
    "match": "(?i:\\b(Mod|And|Not|Or|Xor)\\b)"
  },
  {
    "name": "storage.type.asp",
    "match": "(?i:\\b(Call|Class|Const|Dim|Redim|Function|Sub|End sub|End Function|Set|Let|Get|New|Randomize|Option Explicit|On Error Resume Next|On Error GoTo)\\b)"
  },
  {
    "name": "storage.modifier.asp",
    "match": "(?i:\\b(Private|Public|Default)\\b)"
  },
  {
    "name": "constant.language.asp",
    "match": "(?i:\\b(Empty|False|Nothing|Null|True)\\b)"
  },
  {
    "name": "string.quoted.double.asp",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.asp"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.asp"
      }
    },
    "end": "\"(?!\")",
    "patterns": [
      {
        "name": "constant.character.escape.apostrophe.asp",
        "match": "\"\""
      }
    ]
  },
  {
    "name": "variable.other.asp",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.asp"
      }
    },
    "match": "(\\$)[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b"
  },
  {
    "name": "support.class.asp",
    "match": "(?i:\\b(Application|ObjectContext|Request|Response|Server|Session)\\b)"
  },
  {
    "name": "support.class.collection.asp",
    "match": "(?i:\\b(Contents|StaticObjects|ClientCertificate|Cookies|Form|QueryString|ServerVariables)\\b)"
  },
  {
    "name": "support.constant.asp",
    "match": "(?i:\\b(TotalBytes|Buffer|CacheControl|Charset|ContentType|Expires|ExpiresAbsolute|IsClientConnected|PICS|Status|ScriptTimeout|CodePage|LCID|SessionID|Timeout)\\b)"
  },
  {
    "name": "support.function.asp",
    "match": "(?i:\\b(Lock|Unlock|SetAbort|SetComplete|BianryRead|AddHeader|AppendToLog|BinaryWrite|Clear|End|Flush|Redirect|Write|CreateObject|HTMLEncode|MapPath|URLEncode|Abandon)\\b)"
  },
  {
    "name": "support.function.event.asp",
    "match": "(?i:\\b(Application_OnEnd|Application_OnStart|OnTransactionAbort|OnTransactionCommit|Session_OnEnd|Session_OnStart)\\b)"
  },
  {
    "name": "support.function.vb.asp",
    "match": "(?i:\\b(Array|Add|Asc|Atn|CBool|CByte|CCur|CDate|CDbl|Chr|CInt|CLng|Conversions|Cos|CreateObject|CSng|CStr|Date|DateAdd|DateDiff|DatePart|DateSerial|DateValue|Day|Derived|Math|Escape|Eval|Exists|Exp|Filter|FormatCurrency|FormatDateTime|FormatNumber|FormatPercent|GetLocale|GetObject|GetRef|Hex|Hour|InputBox|InStr|InStrRev|Int|Fix|IsArray|IsDate|IsEmpty|IsNull|IsNumeric|IsObject|Item|Items|Join|Keys|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|RTrim|Trim|Maths|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Remove|RemoveAll|Replace|RGB|Right|Rnd|Round|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion|ScriptEngineMinorVersion|Second|SetLocale|Sgn|Sin|Space|Split|Sqr|StrComp|String|StrReverse|Tan|Time|Timer|TimeSerial|TimeValue|TypeName|UBound|UCase|Unescape|VarType|Weekday|WeekdayName|Year)\\b)"
  },
  {
    "name": "constant.numeric.asp",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f)?\\b"
  },
  {
    "name": "support.type.vb.asp",
    "match": "(?i:\\b(vbtrue|fvbalse|vbcr|vbcrlf|vbformfeed|vblf|vbnewline|vbnullchar|vbnullstring|vbtab|vbverticaltab|vbbinarycompare|vbtextcomparevbsunday|vbmonday|vbtuesday|vbwednesday|vbthursday|vbfriday|vbsaturday|vbusesystemdayofweek|vbfirstjan1|vbfirstfourdays|vbfirstfullweek|vbgeneraldate|vblongdate|vbshortdate|vblongtime|vbshorttime|vbobjecterror|vbEmpty|vbNull|vbInteger|vbLong|vbSingle|vbDouble|vbCurrency|vbDate|vbString|vbObject|vbError|vbBoolean|vbVariant|vbDataObject|vbDecimal|vbByte|vbArray)\\b)"
  }
];

exports.ASPSyntax = new TextmateSyntax(repositories, patterns);