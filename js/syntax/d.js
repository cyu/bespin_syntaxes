"define metadata";
({
    "description": "D syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "d",
            "pointer": "#DSyntax",
            "fileexts": [
  "d"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "comment_nested_block_content": {
    "begin": "/\\+",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.d"
      }
    },
    "end": "\\+/",
    "patterns": [
      {
        "include": "#comment_nested_block_content"
      }
    ]
  },
  "string_escaped_char": {
    "patterns": [
      {
        "name": "constant.character.escape.c",
        "match": "\\\\(\\\\|[abefnprtv'\"?]|[0-3]\\d{,2}|[4-7]\\d?|x[a-zA-Z0-9]+)"
      },
      {
        "name": "invalid.illegal.unknown-escape.c",
        "match": "\\\\."
      }
    ]
  },
  "string_placeholder": {
    "patterns": [
      {
        "name": "constant.other.placeholder.c",
        "match": "(?x)%\n\t\t\t\t\t\t(\\d+\\$)?                             # field (argument #)\n\t\t\t\t\t\t[#0\\- +']*                           # flags\n\t\t\t\t\t\t[,;:_]?                              # separator character (AltiVec)\n\t\t\t\t\t\t((-?\\d+)|\\*(-?\\d+\\$)?)?              # minimum field width\n\t\t\t\t\t\t(\\.((-?\\d+)|\\*(-?\\d+\\$)?)?)?         # precision\n\t\t\t\t\t\t(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)? # length modifier\n\t\t\t\t\t\t[diouxXDOUeEfFgGaACcSspn%]           # conversion type\n\t\t\t\t\t"
      },
      {
        "name": "invalid.illegal.placeholder.c",
        "match": "%"
      }
    ]
  }
};

var patterns = [
  {
    "name": "keyword.other.external.d",
    "match": "\\b(import|package|module|extern)\\b"
  },
  {
    "name": "keyword.control.conditional.d",
    "match": "\\b(if|else|switch|iftype)\\b"
  },
  {
    "name": "keyword.control.branch.d",
    "match": "\\b(goto|break|continue)\\b"
  },
  {
    "name": "keyword.control.repeat.d",
    "match": "\\b(while|for|do|foreach)\\b"
  },
  {
    "name": "keyword.control.repeat.d",
    "match": "\\b(while|for|do|foreach)\\b"
  },
  {
    "name": "constant.language.boolean.d",
    "match": "\\b(true|false)\\b"
  },
  {
    "name": "constant.language.d",
    "match": "\\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|null)\\b"
  },
  {
    "name": "storage.type.typedef.d",
    "match": "\\b(alias|typedef)\\b"
  },
  {
    "name": "storage.type.structure.d",
    "match": "\\b(template|interface|class|enum|struct|union)\\b"
  },
  {
    "name": "keyword.operator.d",
    "match": "\\b(new|delete|typeof|typeid|cast|align|is|this|super)\\b"
  },
  {
    "name": "keyword.operator.overload.d",
    "match": "\\b(opNeg|opCom|opPostInc|opPostDec|opCast|opAdd|opSub|opSub_r|opMul|opDiv|opDiv_r|opMod|opMod_r|opAnd|opOr|opXor|opShl|opShl_r|opShr|opShr_r|opUShr|opUShr_r|opCat|opCat_r|opEquals|opEquals|opCmp|opCmp|opCmp|opCmp|opAddAssign|opSubAssign|opMulAssign|opDivAssign|opModAssign|opAndAssign|opOrAssign|opXorAssign|opShlAssign|opShrAssign|opUShrAssign|opCatAssign|opIndex|opIndexAssign|opCall|opSlice|opSliceAssign|opPos|opAdd_r|opMul_r|opAnd_r|opOr_r|opXor_r)\\b"
  },
  {
    "name": "storage.type.d",
    "match": "\\b(ushort|int|uint|long|ulong|float|void|byte|ubyte|double|bit|char|wchar|ucent|cent|short|bool|dchar|real|ireal|ifloat|idouble|creal|cfloat|cdouble)\\b"
  },
  {
    "name": "keyword.other.debug.d",
    "match": "\\b(deprecated|unittest)\\b"
  },
  {
    "name": "keyword.control.exception.d",
    "match": "\\b(throw|try|catch|finally)\\b"
  },
  {
    "name": "storage.modifier.d",
    "match": "\\b(public|protected|private|export)\\b"
  },
  {
    "name": "keyword.control.statement.d",
    "match": "\\b(version|debug|return|with|invariant|body|scope|in|out|inout|asm|mixin|function|delegate)\\b"
  },
  {
    "name": "storage.modifier.d",
    "match": "\\b(auto|static|override|final|const|abstract|volatile|synchronized)\\b"
  },
  {
    "name": "keyword.control.pragma.d",
    "match": "\\b(pragma)\\b"
  },
  {
    "begin": "asm[\\n]*\\s*({)",
    "comment": "This rule is broken and never gets called anyhow since asm\n\t\t\t\t\t   is matched above this. If fixed the scopes here should be\n\t\t\t\t\t   redone as well. -msheets",
    "captures": {
      "1": {
        "name": "punctuation.section.embedded.mips"
      }
    },
    "end": "(})",
    "patterns": [
      {
        "include": "source.mips"
      }
    ]
  },
  {
    "name": "comment.block.nested.d",
    "begin": "/\\+",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.d"
      }
    },
    "end": "\\+/",
    "patterns": [
      {
        "include": "#comment_nested_block_content"
      }
    ]
  },
  {
    "name": "comment.block.d",
    "begin": "/\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.d"
      }
    },
    "end": "\\*/"
  },
  {
    "name": "comment.line.double-slash.d",
    "begin": "(//)",
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.comment.d"
      }
    },
    "end": "$\\n?",
    "patterns": [
      {
        "name": "punctuation.separator.continuation.d",
        "match": "(?>\\\\\\s*\\n)"
      }
    ]
  },
  {
    "name": "constant.numeric.c",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
  },
  {
    "name": "string.quoted.double.c",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.d"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.d"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "include": "#string_escaped_char"
      },
      {
        "include": "#string_placeholder"
      }
    ]
  },
  {
    "name": "string.quoted.single.c",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.d"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.d"
      }
    },
    "end": "'",
    "patterns": [
      {
        "include": "#string_escaped_char"
      }
    ]
  },
  {
    "name": "support.type.sys-types.c",
    "match": "\\b(u_char|u_short|u_int|u_long|ushort|uint|u_quad_t|quad_t|qaddr_t|caddr_t|daddr_t|dev_t|fixpt_t|blkcnt_t|blksize_t|gid_t|in_addr_t|in_port_t|ino_t|key_t|mode_t|nlink_t|id_t|pid_t|off_t|segsz_t|swblk_t|uid_t|id_t|clock_t|size_t|ssize_t|time_t|useconds_t|suseconds_t)\\b"
  },
  {
    "name": "support.type.pthread.c",
    "match": "\\b(pthread_attr_t|pthread_cond_t|pthread_condattr_t|pthread_mutex_t|pthread_mutexattr_t|pthread_once_t|pthread_rwlock_t|pthread_rwlockattr_t|pthread_t|pthread_key_t)\\b"
  },
  {
    "name": "support.type.stdint.c",
    "match": "\\b(int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|int_least8_t|int_least16_t|int_least32_t|int_least64_t|uint_least8_t|uint_least16_t|uint_least32_t|uint_least64_t|int_fast8_t|int_fast16_t|int_fast32_t|int_fast64_t|uint_fast8_t|uint_fast16_t|uint_fast32_t|uint_fast64_t|intptr_t|uintptr_t|intmax_t|intmax_t|uintmax_t|uintmax_t)\\b"
  }
];

exports.DSyntax = new TextmateSyntax(repositories, patterns);
