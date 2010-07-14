"define metadata";
({
    "description": "Lua syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "lua",
            "pointer": "#LuaSyntax",
            "fileexts": [
  "lua"
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
    "name": "meta.function.lua",
    "captures": {
      "6": {
        "name": "punctuation.definition.parameters.end.lua"
      },
      "1": {
        "name": "keyword.control.lua"
      },
      "2": {
        "name": "entity.name.function.scope.lua"
      },
      "3": {
        "name": "entity.name.function.lua"
      },
      "4": {
        "name": "punctuation.definition.parameters.begin.lua"
      },
      "5": {
        "name": "variable.parameter.function.lua"
      }
    },
    "match": "\\b(function)\\s+([a-zA-Z_.:]+[.:])?([a-zA-Z_]\\w*)\\s*(\\()([^)]*)(\\))"
  },
  {
    "name": "constant.numeric.lua",
    "match": "(?<![\\d.])\\s0x[a-fA-F\\d]+|\\b\\d+(\\.\\d+)?([eE]-?\\d+)?|\\.\\d+([eE]-?\\d+)?"
  },
  {
    "name": "string.quoted.single.lua",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.lua"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.lua"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.lua",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.double.lua",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.lua"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.lua"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.lua",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.other.multiline.lua",
    "begin": "(?<!--)\\[(=*)\\[",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.lua"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.lua"
      }
    },
    "end": "\\]\\1\\]"
  },
  {
    "name": "comment.block.lua",
    "begin": "--\\[(=*)\\[",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.lua"
      }
    },
    "end": "\\]\\1\\]"
  },
  {
    "name": "comment.line.double-dash.lua",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.lua"
      }
    },
    "match": "(--)(?!\\[\\[).*$\\n?"
  },
  {
    "name": "keyword.control.lua",
    "match": "\\b(break|do|else|for|if|elseif|return|then|repeat|while|until|end|function|local|in)\\b"
  },
  {
    "name": "constant.language.lua",
    "match": "(?<![^.]\\.|:)\\b(false|nil|true|_G|_VERSION|math\\.(pi|huge))\\b|(?<![.])\\.{3}(?!\\.)"
  },
  {
    "name": "variable.language.self.lua",
    "match": "(?<![^.]\\.|:)\\b(self)\\b"
  },
  {
    "name": "support.function.lua",
    "match": "(?<![^.]\\.|:)\\b(assert|collectgarbage|dofile|error|getfenv|getmetatable|ipairs|loadfile|loadstring|module|next|pairs|pcall|print|rawequal|rawget|rawset|require|select|setfenv|setmetatable|tonumber|tostring|type|unpack|xpcall)\\b(?=[( {])"
  },
  {
    "name": "support.function.library.lua",
    "match": "(?<![^.]\\.|:)\\b(coroutine\\.(create|resume|running|status|wrap|yield)|string\\.(byte|char|dump|find|format|gmatch|gsub|len|lower|match|rep|reverse|sub|upper)|table\\.(concat|insert|maxn|remove|sort)|math\\.(abs|acos|asin|atan2?|ceil|cosh?|deg|exp|floor|fmod|frexp|ldexp|log|log10|max|min|modf|pow|rad|random|randomseed|sinh?|sqrt|tanh?)|io\\.(close|flush|input|lines|open|output|popen|read|tmpfile|type|write)|os\\.(clock|date|difftime|execute|exit|getenv|remove|rename|setlocale|time|tmpname)|package\\.(cpath|loaded|loadlib|path|preload|seeall)|debug\\.(debug|[gs]etfenv|[gs]ethook|getinfo|[gs]etlocal|[gs]etmetatable|getregistry|[gs]etupvalue|traceback))\\b(?=[( {])"
  },
  {
    "name": "keyword.operator.lua",
    "match": "\\b(and|or)\\b"
  },
  {
    "name": "keyword.operator.lua",
    "match": "\\+|-|%|#|\\*|\\/|\\^|==?|~=|<=?|>=?|(?<!\\.)\\.{2}(?!\\.)"
  }
];

exports.LuaSyntax = new TextmateSyntax(repositories, patterns);
