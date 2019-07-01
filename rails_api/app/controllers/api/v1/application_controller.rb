module Api
  module V1
    class ApplicationController < ActionController::API

      def allow_graphiti_debug_json?
        true
      end
    end
  end
end
