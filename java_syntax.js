(in /Users/calvinyu/Projects/tm2bespin_syntax_converter)
"define metadata";
({
    "depends": [ "SyntaxManager" ],
    "provides": [
        {
            "ep": "syntax",
            "name": "java",
            "pointer": "#JavaSyntax"
        }
    ]
});
"end";

var SC = require('sproutcore/runtime').SC;
var Promise = require('bespin:promise').Promise;
var StandardSyntax = require('SyntaxManager:controllers/standardsyntax').
    StandardSyntax;

exports.JSSyntax = StandardSyntax.create({
    states: {
      meta_definition_class_extends_java: [
            {
                regex: /(?={|implements)/,
                tag: 'meta.definition.class.extends.java'
                then: 'meta_definition_class_java'
            },
      ],
      comment_block_documentation_java: [
            {
                regex: /\*\/(\s*\n)?/,
                tag: 'comment'
                then: 'start'
            },
            {
                regex: /@(param|return|throws|exception|author|version|see|since|serial|serialField|serialData|deprecated)\b/,
                tag: 'keyword.other.documentation.javadoc.java'
            }
            {
                regex: /\{@link\s+[^\}]*\}/,
                tag: 'keyword.other.documentation.javadoc.link.java'
            }
      ],
      meta_definition_class_implements_java: [
            {
                regex: /(?={|extends)/,
                tag: 'meta.definition.class.implements.java'
                then: 'meta_definition_class_java'
            },
      ],
      meta_definition_class_java: [
            {
                regex: /(?={)/,
                tag: 'meta.definition.class.java'
                then: 'start'
            },
            {
                regex: /\b(extends)\b\s+/,
                tag: 'meta.definition.class.extends.java'
                then: 'meta_definition_class_extends_java'
            },
            {
                regex: /\b(implements)\b\s+/,
                tag: 'meta.definition.class.implements.java'
                then: 'meta_definition_class_implements_java'
            }
      ],
      start: [
            {
                regex: /\/\*\*\//,
                tag: 'comment'
            },
            {
                regex: /(^\s*)?\/\*\*/,
                tag: 'comment'
                then: 'comment_block_documentation_java'
            },
            {
                regex: /(?x)^\s*
					((?:\b(public|private|protected|static|final|native|synchronized|abstract|threadsafe|transient)\b\s*)*) # modifier
					(class|interface)\s+
					(\w+)\s* # identifier/,
                tag: 'meta.definition.class.java'
                then: 'meta_definition_class_java'
            }
            {
                regex: /(?x)^\s*
					((?:\b(public|private|protected|static|final|native|synchronized|abstract|threadsafe|transient)\b\s*)*) # modifier
					((?!(if|while|for|catch|this|print|return|synchronized|switch))\w+)\s* # identifier
					(?!.*;)  # abort if line has a ;
					(?=\()/,
                tag: 'meta.definition.constructor.java'
                then: 'meta_definition_constructor_java'
            }
            {
                regex: /(?x)^\s*
					((?:\b(public|private|protected|static|final|native|synchronized|abstract|threadsafe|transient)\b\s*)*) # modifier
					(\b(void|boolean|byte|char|short|int|float|long|double|(\w+\.)*[A-Z]\w+)\b(<((?:\w+\.)*[A-Z]\w+)>|\[\s*\])?)\s* # type
					(\w+)\s* # identifier
					(?!.*;)  # abort if line has a ;
					(?=\()/,
                tag: 'meta.definition.method.java'
                then: 'meta_definition_method_java'
            }
            {
                regex: /\b([A-Z][A-Z0-9_]+)\b/,
                tag: 'constant.other.java'
            }
            {
                regex: /\b(private|protected|public)\b/,
                tag: 'storage.modifier.access-control.java'
            }
            {
                regex: /\b(abstract|final|native|static|transient|synchronized|volatile|strictfp|extends|implements)\b/,
                tag: 'storage.modifier.java'
            }
            {
                regex: /\b(class|interface)\b/,
                tag: 'storage.type.java'
            }
            {
                regex: /\b(try|catch|finally|throw)\b/,
                tag: 'keyword.control.catch-exception.java'
            }
            {
                regex: /\b(return|break|case|continue|default|do|while|for|switch|if|else)\b/,
                tag: 'keyword.control.java'
            }
            {
                regex: /^\s*(import)\s+([^ ;]+?);/,
                tag: 'meta.import.java'
            }
            {
                regex: /^\s*(package)\s+([^ ;]+?);/,
                tag: 'meta.package.java'
            }
            {
                regex: /\b(new|throws)\b/,
                tag: 'keyword.other.class-fns.java'
            }
            {
                regex: /\b(instanceof)\b/,
                tag: 'keyword.operator.java'
            }
            {
                regex: /\b(true|false|null)\b/,
                tag: 'constant.language.java'
            }
            {
                regex: /\b(this|super)\b/,
                tag: 'variable.language.java'
            }
            {
                regex: /\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))((e|E)(\+|-)?[0-9]+)?)([LlFfUuDd]|UL|ul)?\b/,
                tag: 'constant.numeric.java'
            }
            {
                regex: /(==|!=|<=|>=|<>|<|>)/,
                tag: 'keyword.operator.comparison.java'
            }
            {
                regex: /(\-\-|\+\+)/,
                tag: 'keyword.operator.increment-decrement.java'
            }
            {
                regex: /(\-|\+|\*|\/|%)/,
                tag: 'keyword.operator.arithmetic.java'
            }
            {
                regex: /(!|&&|\|\|)/,
                tag: 'keyword.operator.logical.java'
            }
      ],
      meta_definition_method_java: [
            {
                regex: /(?={)/,
                tag: 'meta.definition.method.java'
                then: 'start'
            },
      ],
      meta_definition_constructor_java: [
            {
                regex: /(?={)/,
                tag: 'meta.definition.constructor.java'
                then: 'start'
            },
      ]
  }
});
