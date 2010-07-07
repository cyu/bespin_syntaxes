require 'erubis'
require 'hashie'

class BespinSyntax < Hashie::Mash

  def short_name
    fileTypes.first
  end

  def file_types
    j(fileTypes)
  end

  def repositories
    j(repository)
  end

  def patterns
    j(self['patterns'])
  end

  def render
    input = File.read(File.join(File.dirname(__FILE__), 'bespin_syntax.erb'))
    eruby = Erubis::Eruby.new(input)
    eruby.result(binding())
  end

  protected
    def j(h)
      Yajl::Encoder.encode(h, :pretty => true)
    end
end
