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
        check_for_pdf = lambda do |pat_number|
          pat2pdf_url = "http://pat2pdf.org/pat2pdf/foo.pl?number=#{pat_number}"
          doc = Nokogiri::HTML(URI.open(pat2pdf_url))
          doc.css('div#content').at('li>a').attributes['href'].value
        end
        puts check_for_pdf(params[:number])
        patent = PatentResource.build(params)

        if patent.save
          PatentWorker.perform_async(patent.data.id)
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
