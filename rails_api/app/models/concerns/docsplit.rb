# methods for parsing pdfs
module PdfParser
  extend ActiveSupport::Concern
    def grab_file
      URI.open('https://patentimages.storage.googleapis.com/f5/fd/7e/7db7e8e7b6b49c/US6091781.pdf')
    end

    def docsplit_to_tmp(pdf)
      # extracts text and returns # of pages
      Docsplit.extract_images(
        [pdf.path],
        pages: 'all',
        format: [:png],
        output: Rails.root.join('tmp')
      )
      Docsplit.extract_length([pdf.path])
    end

    def extract_text
      pdf = grab_file
      length = docsplit_to_tmp(pdf)
      tmp_to_text(length, pdf)
    end

    def tmp_to_text(length, pdf)
      (1..length).collect do |page|
        name = File.basename(pdf.path) + '_' + page.to_s + '.txt'
        path = Rails.root.join('tmp', name)
        text = File.read(path)
        File.delete(path)
        text
      end
    end
  end
