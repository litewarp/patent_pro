module Api
  module V1
    class ColumnsController < ApplicationController
      def index
        columns = ColumnResource.all(params)
        render jsonapi: columns
      end

      def show
        column = ColumnResource.find(params)
        render jsonapi: column
      end

      def create
        column = ColumnResource.build(params)

        if column.save
          render jsonapi: column, status: 201
        else
          render jsonapi_errors: column
        end
      end

      def update
        column = ColumnResource.find(params)

        if column.update_attributes
          render jsonapi: column
        else
          render jsonapi_errors: column
        end
      end

      def destroy
        column = ColumnResource.find(params)

        if column.destroy
          render jsonapi: { meta: {} }, status: 200
        else
          render jsonapi_errors: column
        end
      end
    end
  end
end
