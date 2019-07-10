module Api
  module V1
    # controller for patents
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
        if !Patent.new(number: params[:number]).pdf_url
          render jsonapi_errors: 'Patent Number Not Found'
        elsif Patent.find_by_number(params[:number])
          render jsonapi_errors: 'Patent Exists in Database'
        else
          resource = PatentResource.build(params)
          if resource.save
            render jsonapi: resource, status: 201
            PatentWorker.perform_async(resource.data.id)
          else
            render jsonapi_errors: patent
          end
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
