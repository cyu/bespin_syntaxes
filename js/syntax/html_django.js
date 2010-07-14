"define metadata";
({
    "description": "HTML (Django) syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "",
            "pointer": "#HTML (Django)Syntax",
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
    "comment": "Since html is valid in Django templates include the html patterns",
    "include": "text.html.basic"
  },
  {
    "name": "comment.block.django.template",
    "begin": "{% comment %}",
    "end": "{% endcomment %}"
  },
  {
    "name": "variable.other.django.template",
    "begin": "{{",
    "end": "}}"
  },
  {
    "name": "meta.scope.django.template.tag",
    "begin": "({%)",
    "captures": {
      "1": {
        "name": "entity.other.django.tagbraces"
      }
    },
    "end": "(%})",
    "patterns": [
      {
        "name": "keyword.control.django.template",
        "match": "\\b(block|endblock|blocktrans|endblocktrans|plural|debug|extends|filter|firstof|for|endfor|if|include|else|endif|ifchanged|endifchanged|ifequal|endifequal|ifnotequal|endifnotequal|load|now|regroup|ssi|spaceless|templatetag|widthratio)\\b"
      },
      {
        "name": "keyword.operator.django.template",
        "match": "\\b(and|or|not|in|by|as)\\b"
      },
      {
        "name": "support.function.filter.django",
        "match": "\\|(add|addslashes|capfirst|center|cut|date|default|default_if_none|dictsort|dictsortreversed|divisibleby|escape|filesizeformat|first|fix_ampersands|floatformat|get_digit|join|length|length_is|linebreaks|linebreaksbr|linenumbers|ljust|lower|make_list|phone2numeric|pluralize|pprint|random|removetags|rjust|slice|slugify|stringformat|striptags|time|timesince|title|truncatewords|unordered_list|upper|urlencode|urlize|urlizetrunc|wordcount|wordwrap|yesno)\\b"
      },
      {
        "name": "string.other.django.template.tag",
        "begin": "'|\"",
        "end": "'|\""
      },
      {
        "name": "string.unquoted.django.template.tag",
        "match": "[a-zA-Z_]+"
      }
    ]
  }
];

exports.HTML (Django)Syntax = new TextmateSyntax(repositories, patterns);
