module Api
  module V1
    class LinesController < ApplicationController
      def index
        lines = LineResource.all(params)
        render jsonapi: lines
      end

      def show
        line = LineResource.find(params)
        render jsonapi: line
      end

      def create
        line = LineResource.build(params)

        if line.save
          render jsonapi: line, status: 201
        else
          render jsonapi_errors: line
        end
      end

      def update
        line = LineResource.find(params)

        if line.update_attributes
          render jsonapi: line
        else
          render jsonapi_errors: line
        end
      end

      def destroy
        line = LineResource.find(params)

        if line.destroy
          render jsonapi: { meta: {} }, status: 200
        else
          render jsonapi_errors: line
        end
      end
    end
  end
end
