require 'lib/tm2bespin_syntax_converter'

task :convert do
  converter = Tm2bespinSyntaxConverter.new(ENV['OUTPUT_DIR'] || '.')
  Dir.glob('syntax/*.syntax') { |f| converter.convert(f) }
end