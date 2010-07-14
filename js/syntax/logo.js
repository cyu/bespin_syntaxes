"define metadata";
({
    "description": "Logo syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#LogoSyntax",
            "fileexts": [

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
    "name": "entity.name.function.logo",
    "match": "^to [\\w.]+"
  },
  {
    "name": "keyword.control.logo",
    "match": "continue|do\\.until|do\\.while|end|for(each)?|if(else|falsetrue|)|repeat|stop|until"
  },
  {
    "name": "keyword.other.logo",
    "match": "\\b(\\.defmacro|\\.eq|\\.macro|\\.maybeoutput|\\.setbf|\\.setfirst|\\.setitem|\\.setsegmentsize|allopen|allowgetset|and|apply|arc|arctan|arity|array|arrayp|arraytolist|ascii|ashift|back|background|backslashedp|beforep|bitand|bitnot|bitor|bitxor|buried|buriedp|bury|buryall|buryname|butfirst|butfirsts|butlast|bye|cascade|case|caseignoredp|catch|char|clean|clearscreen|cleartext|close|closeall|combine|cond|contents|copydef|cos|count|crossmap|cursor|define|definedp|dequeue|difference|dribble|edall|edit|editfile|edn|edns|edpl|edpls|edps|emptyp|eofp|epspict|equalp|erall|erase|erasefile|ern|erns|erpl|erpls|erps|erract|error|exp|fence|filep|fill|filter|find|first|firsts|forever|form|forward|fput|fullprintp|fullscreen|fulltext|gc|gensym|global|goto|gprop|greaterp|heading|help|hideturtle|home|ignore|int|invoke|iseq|item|keyp|label|last|left|lessp|list|listp|listtoarray|ln|load|loadnoisily|loadpict|local|localmake|log10|lowercase|lput|lshift|macroexpand|macrop|make|map|map.se|mdarray|mditem|mdsetitem|member|memberp|minus|modulo|name|namelist|namep|names|nodes|nodribble|norefresh|not|numberp|openappend|openread|openupdate|openwrite|or|output|palette|parse|pause|pen|pencolor|pendown|pendownp|penerase|penmode|penpaint|penreverse|pensize|penup|pick|plist|plistp|plists|pllist|po|poall|pon|pons|pop|popl|popls|pops|pos|pot|pots|power|pprop|prefix|primitivep|print|printdepthlimit|printwidthlimit|procedurep|procedures|product|push|queue|quoted|quotient|radarctan|radcos|radsin|random|rawascii|readchar|readchars|reader|readlist|readpos|readrawline|readword|redefp|reduce|refresh|remainder|remdup|remove|remprop|repcount|rerandom|reverse|right|round|rseq|run|runparse|runresult|save|savel|savepict|screenmode|scrunch|sentence|setbackground|setcursor|seteditor|setheading|sethelploc|setitem|setlibloc|setmargins|setpalette|setpen|setpencolor|setpensize|setpos|setprefix|setread|setreadpos|setscrunch|settemploc|settextcolor|setwrite|setwritepos|setx|setxy|sety|shell|show|shownp|showturtle|sin|splitscreen|sqrt|standout|startup|step|stepped|steppedp|substringp|sum|tag|test|text|textscreen|thing|throw|towards|trace|traced|tracedp|transfer|turtlemode|type|unbury|unburyall|unburyname|unburyonedit|unstep|untrace|uppercase|usealternatenam|wait|while|window|word|wordp|wrap|writepos|writer|xcor|ycor)\\b"
  },
  {
    "name": "variable.parameter.logo",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.logo"
      }
    },
    "match": "(\\:)(?:\\|[^|]*\\||[-\\w.]*)+"
  },
  {
    "name": "string.other.word.logo",
    "match": "\"(?:\\|[^|]*\\||[-\\w.]*)+"
  },
  {
    "name": "comment.line.semicolon.logo",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.logo"
      }
    },
    "match": "(;).*$\\n?"
  }
];

exports.LogoSyntax = new TextmateSyntax(repositories, patterns);
