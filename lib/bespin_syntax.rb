require 'erubis'
require 'hashie'


class BespinSyntax
  attr_accessor :name, :pointer
  attr_reader :states

  def initialize
    @states = {}
  end

  def render
    input = File.read(File.join(File.dirname(__FILE__), 'bespin_syntax.erb'))
    eruby = Erubis::Eruby.new(input)
    eruby.result(binding())
  end

  def state(nm, default_tag = 'plain')
    @states[nm] ||= State.new(nm, default_tag)
  end
end

class State
  attr_accessor :name, :patterns, :default_tag

  def initialize(name, default_tag)
    @name         = name
    @default_tag  = default_tag
    @patterns     = []
  end

  def <<(pattern)
    patterns << Hashie::Mash.new(pattern)
  end
end