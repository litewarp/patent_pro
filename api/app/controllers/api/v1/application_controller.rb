module Api
  module V1
    class ApplicationController < ActionController::API
      def fallback_index_html
        render file: 'public/index.html'
      end

      def allow_graphiti_debug_json?
        true
      end
    end
  end
end
