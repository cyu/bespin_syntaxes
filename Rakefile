require File.join(File.dirname(__FILE__), 'lib', 'converter')

task :convert, :output_dir do |cmd, args|
  converter = Converter.new(args[:output_dir] || '.')
  Dir.glob('syntax/*.syntax') { |f| converter.convert(f) }
  cp 'js/textmate_syntax.js', args[:output_dir]
end
