class ApplicationController < ApplicationController::API
  def fallback_index_html
    render :file => 'public/index.html'
  end
  def allow_graphiti_debug_json?
    true
  end
end
