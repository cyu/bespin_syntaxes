"define metadata";
({
    "description": "Txt2tags syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "t2t",
            "pointer": "#Txt2tagsSyntax",
            "fileexts": [
  "t2t"
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
    "name": "comment.block.txt2tags",
    "begin": "^%%%\\s*$",
    "end": "^%%%\\s*$\\n?"
  },
  {
    "name": "string.unquoted.txt2tags",
    "match": "^\\s*[_=-]{20,}\\s*$\\n?"
  },
  {
    "name": "markup.underline.txt2tags",
    "match": "__([^\\s](|.*?[^\\s])_*)__"
  },
  {
    "name": "markup.bold.txt2tags",
    "match": "\\*\\*([^\\s](|.*?[^\\s])\\**)\\*\\*"
  },
  {
    "name": "markup.heading.1.txt2tags",
    "match": "^\\s*={1}[^=](|.*[^=])={1}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.2.txt2tags",
    "match": "^\\s*={2}[^=](|.*[^=])={2}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.3.txt2tags",
    "match": "^\\s*={3}[^=](|.*[^=])={3}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.4.txt2tags",
    "match": "^\\s*={4}[^=](|.*[^=])={4}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.5.txt2tags",
    "match": "^\\s*={5}[^=](|.*[^=])={5}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.1.txt2tags",
    "match": "^\\s*\\+{1}[^+](|.*[^+])\\+{1}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.2.txt2tags",
    "match": "^\\s*\\+{2}[^+](|.*[^+])\\+{2}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.3.txt2tags",
    "match": "^\\s*\\+{3}[^+](|.*[^+])\\+{3}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.4.txt2tags",
    "match": "^\\s*\\+{4}[^+](|.*[^+])\\+{4}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.heading.5.txt2tags",
    "match": "^\\s*\\+{5}[^+](|.*[^+])\\+{5}(\\[[\\w-]*\\])?\\s*$\\n?"
  },
  {
    "name": "markup.italic.txt2tags",
    "match": "//([^\\s](|.*?[^\\s])/*)//"
  },
  {
    "name": "string.quoted.other.raw.inline.txt2tags",
    "match": "\"\"([^\\s](|.*?[^\\s])\"*)\"\""
  },
  {
    "name": "string.quoted.other.raw.line.txt2tags",
    "match": "^\"\"\" (?=.).*$\\n?"
  },
  {
    "name": "string.quoted.other.raw.block.txt2tags",
    "begin": "^\"\"\"\\s*$",
    "end": "^\"\"\"\\s*$\\n?"
  },
  {
    "name": "markup.list.numbered.txt2tags",
    "match": "^ *\\+ (?=[^ ])"
  },
  {
    "name": "markup.list.unnumbered.txt2tags",
    "match": "^ *- (?=[^ ])"
  },
  {
    "name": "markup.list.unnumbered.txt2tags",
    "match": "^ *: (?=.)"
  },
  {
    "name": "markup.list.txt2tags",
    "match": "^( *)([-+:])\\s*$"
  },
  {
    "name": "markup.raw.verb.block.txt2tags",
    "begin": "^```\\s*$",
    "end": "^```\\s*$\\n?"
  },
  {
    "name": "markup.raw.verb.line.txt2tags",
    "match": "^``` (?=.).*$\\n?"
  },
  {
    "name": "markup.raw.verb.inline.txt2tags",
    "match": "``([^\\s](|.*?[^\\s])`*)``"
  },
  {
    "name": "invalid.deprecated.trailing-whitespace.txt2tags",
    "match": "\\s+$"
  },
  {
    "name": "string.interpolated.txt2tags",
    "match": "(?i)%%(date|mtime|infile|outfile)(\\(.*?\\))?|%%toc"
  },
  {
    "name": "constant.character.txt2tags",
    "match": "(?i)^%!\\s*(target|encoding|style|options|include|includeconf|preproc|postproc|guicolors)\\s*(\\(\\w*\\))?\\s*:.*"
  },
  {
    "name": "meta.tag.image.txt2tags",
    "match": "\\[[\\w_,.+%$#@!?+~/-]+\\.(png|jpe?g|gif|eps|bmp)\\]"
  },
  {
    "name": "meta.tag.email.txt2tags",
    "match": "(?i)\\b[A-Za-z0-9_.-]+@([A-Za-z0-9_-]+\\.)+[A-Za-z]{2,4}\\b(\\?[A-Za-z0-9/%&=+;.,$@*_-]+)?"
  },
  {
    "name": "meta.tag.url.txt2tags",
    "match": "(?i)\\b((https?|ftp|news|telnet|gopher|wais)://([A-Za-z0-9_.-]+(:[^ @]*)?@)?|(www[23]?|ftp)\\.)[A-Za-z0-9%._/~:,=$@&+-]+\\b/*(\\?[A-Za-z0-9/%&=+;.,$@*_-]+)?(#[A-Za-z0-9%._-]*)?"
  },
  {
    "name": "meta.tag.link.txt2tags",
    "match": "(?i)\\[(\\[[\\w_,.+%$#@!?+~/-]+\\.(png|jpe?g|gif|eps|bmp)\\]|[^]]+) (((https?|ftp|news|telnet|gopher|wais)://([A-Za-z0-9_.-]+(:[^ @]*)?@)?|(www[23]?|ftp)\\.)[A-Za-z0-9%._/~:,=$@&+-]+\\b/*(\\?[A-Za-z0-9/%&=+;.,$@*_-]+)?(#[A-Za-z0-9%._-]*)?|[A-Za-z0-9_.-]+@([A-Za-z0-9_-]+\\.)+[A-Za-z]{2,4}\\b(\\?[A-Za-z0-9/%&=+;.,$@*_-]+)?|[A-Za-z0-9%._/~:,=$@&+-]+|[A-Za-z0-9%._/~:,=$@&+-]*(#[A-Za-z0-9%._-]*))\\]"
  },
  {
    "name": "markup.quote.txt2tags",
    "match": "^\\t.*$\\n?"
  },
  {
    "name": "comment.line.txt2tags",
    "match": "^%.*$\\n?"
  }
];

exports.Txt2tagsSyntax = new TextmateSyntax(repositories, patterns);
