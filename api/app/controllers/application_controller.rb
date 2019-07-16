class ApplicationController < ActionController::API
  def fallback_index_html
    puts Rails.public_path
    file = File.open("#{Rails.public_path}/index.html")
    puts file.read
    render :file => [Rails.public_path, "index.html"].join("/")
  end
  def allow_graphiti_debug_json?
    true
  end
end
