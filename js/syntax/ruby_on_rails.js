"define metadata";
({
    "description": "Ruby on Rails syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "rxml",
            "pointer": "#Ruby on RailsSyntax",
            "fileexts": [
  "rxml"
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
    "name": "meta.rails.functional_test",
    "begin": "(^\\s*)(?=class\\s+(([.a-zA-Z0-9_:]+ControllerTest(\\s*<\\s*[.a-zA-Z0-9_:]+)?)))",
    "comment": "Uses lookahead to match classes with the ControllerTest suffix; includes 'source.ruby' to avoid infinite recursion",
    "end": "^\\1(?=end)\\b",
    "patterns": [
      {
        "include": "source.ruby"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.rails.controller",
    "begin": "(^\\s*)(?=class\\s+(([.a-zA-Z0-9_:]+Controller\\b(\\s*<\\s*[.a-zA-Z0-9_:]+)?)|(<<\\s*[.a-zA-Z0-9_:]+)))(?!.+\\bend\\b)",
    "comment": "Uses lookahead to match classes with the Controller suffix; includes 'source.ruby' to avoid infinite recursion",
    "end": "^\\1(?=end)\\b",
    "patterns": [
      {
        "include": "source.ruby"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.rails.helper",
    "begin": "(^\\s*)(?=module\\s+((([A-Z]\\w*::)*)[A-Z]\\w*)Helper)",
    "comment": "Uses lookahead to match modules with the Helper suffix; includes 'source.ruby' to avoid infinite recursion",
    "end": "^\\1(?=end)\\b",
    "patterns": [
      {
        "include": "source.ruby"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.rails.mailer",
    "begin": "(^\\s*)(?=class\\s+(([.a-zA-Z0-9_:]+(\\s*<\\s*ActionMailer::Base))))",
    "comment": "Uses lookahead to match classes that inherit from ActionMailer::Base; includes 'source.ruby' to avoid infinite recursion",
    "end": "^\\1(?=end)\\b",
    "patterns": [
      {
        "include": "source.ruby"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.rails.model",
    "begin": "(^\\s*)(?=class\\s+.+ActiveRecord::Base)",
    "comment": "Uses lookahead to match classes that (may) inherit from ActiveRecord::Base; includes 'source.ruby' to avoid infinite recursion",
    "end": "^\\1(?=end)\\b",
    "patterns": [
      {
        "include": "source.ruby"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.rails.unit_test",
    "begin": "(^\\s*)(?=class\\s+(?![.a-zA-Z0-9_:]+ControllerTest)(([.a-zA-Z0-9_:]+Test(\\s*<\\s*[.a-zA-Z0-9_:]+)?)|(<<\\s*[.a-zA-Z0-9_:]+)))",
    "comment": "Uses lookahead to match classes with the Test suffix; includes 'source.ruby' to avoid infinite recursion",
    "end": "^\\1(?=end)\\b",
    "patterns": [
      {
        "include": "source.ruby"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "support.function.actionpack.rails",
    "match": "\\b(before_filter|skip_before_filter|skip_after_filter|after_filter|around_filter|filter|filter_parameter_logging|layout|require_dependency|render|render_action|render_text|render_file|render_template|render_nothing|render_component|render_without_layout|url_for|redirect_to|redirect_to_path|redirect_to_url|helper|helper_method|model|service|observer|serialize|scaffold|verify|hide_action)\\b"
  },
  {
    "name": "support.function.activerecord.rails",
    "match": "\\b(acts_as_list|acts_as_tree|after_create|after_destroy|after_save|after_update|after_validation|after_validation_on_create|after_validation_on_update|before_create|before_destroy|before_save|before_update|before_validation|before_validation_on_create|before_validation_on_update|composed_of|belongs_to|has_one|has_many|has_and_belongs_to_many|helper|helper_method|validate|validate_on_create|validates_numericality_of|validate_on_update|validates_acceptance_of|validates_associated|validates_confirmation_of|validates_each|validates_format_of|validates_inclusion_of|validates_length_of|validates_presence_of|validates_size_of|validates_uniqueness_of|attr_protected|attr_accessible)\\b"
  },
  {
    "name": "support.function.activesupport.rails",
    "match": "\\b(cattr_accessor|mattr_accessor)\\b"
  },
  {
    "include": "source.ruby"
  }
];

exports.Ruby on RailsSyntax = new TextmateSyntax(repositories, patterns);
