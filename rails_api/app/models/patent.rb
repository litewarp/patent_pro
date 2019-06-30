class Patent < ApplicationRecord
  has_one_attached :pdf
  has_many :columns
  include PdfParser

  def grab_file
    examples = [
      'https://patentimages.storage.googleapis.com/f5/fd/7e/7db7e8e7b6b49c/US6091781.pdf',
      'https://patentimages.storage.googleapis.com/1e/82/1a/6c072edfcc6ba0/US7629705.pdf'
    ]
    file = examples.sample
    number = file.split('/').last.gsub('.pdf', '')
    @patent = Patent.create(number: number.gsub('US', ''))
    @pdf = URI.open(file)
  end
end
