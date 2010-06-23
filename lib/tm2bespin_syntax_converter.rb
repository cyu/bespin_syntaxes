require "#{File.dirname(__FILE__)}/bespin_syntax"
require 'textpow'

class Tm2bespinSyntaxConverter

  attr_reader :bespin_syntax, :tag_mappings, :output_dir

  def initialize(output_dir)
    @output_dir   = output_dir
    @tag_mappings = [
      [/punctuation\.definition\.comment\./, 'comment'   ],
      [/storage\.type\./                   , 'directive' ],
      [/(keyword|storage)\./               , 'keyword'   ],
      [/support\.type\.built-ins\./        , 'identifier'],
      [/punctuation\.definition\.string\./ , 'string'    ]
    ]
  end

  def convert(fn)
    tm_syntax  = Textpow::SyntaxNode.load(fn)
    class_name = "#{tm_syntax.name}Syntax"

    @bespin_syntax = BespinSyntax.new
    bespin_syntax.name    = tm_syntax.fileTypes.first
    bespin_syntax.pointer = class_name

    start_state = bespin_syntax.state('start')
    tm_syntax.patterns.each do |pattern|
      if pattern.respond_to?(:proxy)
        pattern.patterns.each { |p| convert_pattern(start_state, p) }
      else
        convert_pattern(start_state, pattern)
      end
    end

    File.open(File.join(output_dir, "#{class_name}.js"), 'w') { |f| f.write(bespin_syntax.render) }
  end

  protected
    def tag(n)
      tag = if full_capture?(n.captures)
        n.captures[0][1]['name']
      elsif full_capture?(n.beginCaptures)
        n.beginCaptures[0][1]['name']
      else
        n.name
      end
      found = tag_mappings.detect{|v| tag.match(v[0])}
      found ? found[1] : tag
    end

    def regex_source(re)
      source = re.respond_to?(:source) ? re.source : re.to_s
      if source =~ /^\(\?x\)(.*)$/m
        source = $1.lines.collect { |l| (l.match(/^(.*)\s+#.*$/) ? $1 : l).strip }.join
      end
      source.
          gsub(/(^|[^\\])\/\//, '\1\/\/').
          gsub(/(^|[^\\])\//  , '\1\/'  ).
          gsub(/^\\b(.*)$/    , '^\1'   ).
          gsub(/^\^?(.*)$/    , '^\1'   )
    end

    def state_name(nm)
      nm.gsub(/\./, '_') if nm
    end

    def convert_pattern(state, pattern)
      if pattern.match
        if pattern.captures.nil? || pattern.captures.length == 1
          state << { :regex => regex_source(pattern.match), :tag => tag(pattern) }
        end

      else # with begin/end
        if convert?(pattern)

          if state_name = state_name(pattern.name)
            tag_name = tag(pattern)
            then_state = bespin_syntax.state(state_name, tag_name)

            state << {
                :regex  => regex_source(pattern.begin),
                :tag    => tag_name,
                :then   => then_state.name
            }

            then_state << {
                :regex  => regex_source(pattern.end),
                :tag    => tag_name,
                :then   => state.name
            }

            pattern.patterns.each do |nested|
              convert_pattern(then_state, nested)
            end if pattern.patterns
          end
        end
      end
    end

    protected
      def convert?(p)
        full_capture?(p.captures) ||
        (full_capture?(p.beginCaptures) && # process strings
            p.beginCaptures[0][1]['name'] =~ /punctuation\.definition\.string\..*?/)
      end

      def full_capture?(cap)
        cap && cap[0][0] == '0'
      end
end
