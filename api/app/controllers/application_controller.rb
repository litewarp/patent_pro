class ApplicationController < ActionController::API
  def fallback_index_html
    render :html => File.read([Rails.public_path, "index.html"].join("/")).html_safe
  end
  def allow_graphiti_debug_json?
    true
  end
end
