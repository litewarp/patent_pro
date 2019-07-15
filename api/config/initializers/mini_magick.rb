require 'open-uri'
require 'sidekiq/web'
MiniMagick.configure do |config|
  config.cli = :graphicsmagick
  config.validate_on_create = false
  config.validate_on_write = false
end

# Don't allow downloaded files to be created as StringIO. Force a tempfile to be created.
OpenURI::Buffer.send :remove_const, 'StringMax' if OpenURI::Buffer.const_defined?('StringMax')
OpenURI::Buffer.const_set 'StringMax', 0
