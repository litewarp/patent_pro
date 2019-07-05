class Patent < ApplicationRecord
  # modules
  include ExtractText
  include PdfSplit
  include MagickPdf

  # relationships
  has_one_attached :pdf
  has_many :columns, dependent: :destroy

  # validations
  validates :number, presence: true
  validates_uniqueness_of :number

  def fetch_pdf
    @pdf = URI.open(pdf_url)
  end

  def pdf_url
    pat_number = number
    pat2pdf_url = "http://pat2pdf.org/pat2pdf/foo.pl?number=#{pat_number}"
    doc = Nokogiri::HTML(URI.open(pat2pdf_url))
    path = doc.css('div#content').at('li>a').attributes['href'].value
    "http://pat2pdf.org#{path}"
  end

  def basename
    File.basename(@pdf.path)
  end

  def pdf_path(name)
    Rails.root.join('tmp', 'storage', name)
  end

  def ingest
    fetch_pdf
    pdf_to_images
    start = find_columns_start(pdf_length)
    page_to_columns(start..pdf_length)
  end

  def find_columns_start(length)
    (1..length).each { |page| extract_page_tops(page) }
    pages = (1..length).find_index do |page|
      image_path = pdf_path("top_of_#{page}")
      docsplit_text("#{image_path}.tiff")
      lines = File.read(pdf_path("#{image_path}.txt")).split("\n")
      lines.reject!(&:blank?)
      lines[1]&.match?(/^[^3-9a-zA-Z]+$/)
    end
    pages ? pages + 1 : 1 # extract all if no start found
  end

  def page_to_columns(range)
    range.each { |page| image_to_column(page, "#{basename}_#{page}.tiff") }
    save_columns(range)
  end

  def save_columns(range)
    counter = 0
    range.each do |page|
      (0..1).each do |column|
        counter += 1
        filename = "page_#{page}_col_#{column}.tiff"
        image_path = pdf_path(filename)
        col = columns.create(number: counter)
        col.image.attach(io: File.open(image_path), filename: filename)
        ColumnWorker.perform_async(col.id)
      end
    end
  end

  def cleanup
    CleanupWorker.perform_async
  end
end
