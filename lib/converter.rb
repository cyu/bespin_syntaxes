require "#{File.dirname(__FILE__)}/bespin_syntax"
require 'yaml'
require 'yajl'

class Converter

  attr_reader :output_dir

  def initialize(output_dir)
    @output_dir = output_dir
  end

  def convert(fn)
    @syn = BespinSyntax.new(YAML.load_file(fn))
    file = File.join(output_dir, "#{fix_filename(fn)}.js")

    puts "writing to #{file}..."
    File.open(file, 'w') { |f| f.write(@syn.render) }
  end

  protected
    def fix_filename(fn)
      File.basename(fn).match(/^(.*)\.syntax$/)[1].downcase.gsub(' ', '_')
    end
end
