MiniMagick.configure do |config|
  config.cli = :graphicsmagick
  config.validate_on_create = false
  config.validate_on_write = false
end
