module Api
  module V1
    class PatentsController < ApplicationController
      respond_to :json
      def index
        patents = PatentResource.all(params)
        render jsonapi: patents
      end

      def show
        match = Patent.find_by_number(params[:number]).id
        patent = PatentResource.find(id: match)
        render jsonapi: patent
      end

      def create
        patent = PatentResource.build(params)

        if patent.save
          render jsonapi: patent, status: 201
        else
          render jsonapi_errors: patent
        end
      end

      def update
        patent = PatentResource.find(params)

        if patent.update_attributes
          render jsonapi: patent
        else
          render jsonapi_errors: patent
        end
      end

      def destroy
        patent = PatentResource.find(params)

        if patent.destroy
          render jsonapi: { meta: {} }, status: 200
        else
          render jsonapi_errors: patent
        end
      end
    end
  end
end
