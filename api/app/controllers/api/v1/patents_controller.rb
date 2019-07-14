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
        resource = PatentResource.build(params)
        if resource.save
          render jsonapi: resource, status: 201
          PatentWorker.perform_async(resource.data.id)
        else
          render jsonapi_errors: resource
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
        deleted_id = Patent.find_by_number(params[:number]).id
        patent = PatentResource.find(id: deleted_id)
        if patent.destroy
          render jsonapi: { meta: {}, data: {id: deleted_id, number: params[:number] }}, status: 200
        else
          render jsonapi_errors: patent
        end
      end

      private

      def has_pdf_url?(number)
        pat_url = "http://pat2pdf.org/pat2pdf/foo.pl?number=#{number}"
        doc = Nokogiri::HTML(URI.open(pat_url))
        doc.css('div#content').at('li>a').attributes['href'].value ? true : false
      end

    end
  end
end
