class Patent < ApplicationRecord
  # modules
  include ExtractText
  include PdfSplit
  include MagickPdf

  # relationships
  has_one_attached :pdf
  has_many :columns

  # validations
  validates :number, presence: true
  validates_uniqueness_of :number

  def get_pdf
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
    get_pdf
    puts 'Extracting Images'
    pdf_to_images
    start = find_columns_start(pdf_length)
    page_to_columns(start..pdf_length)
    columns_to_lines(start..pdf_length)
  end

  def find_columns_start(length)
    puts 'Locating Start of Columns'
    (1..length).each { |page| extract_page_tops(page) }
    pages = (1..length).find_index do |page|
      image_path = pdf_path("top_of_#{page}")
      docsplit_text("#{image_path}.tiff")
      lines = File.read(pdf_path("#{image_path}.txt")).split("\n")
      lines.reject! {|x| x.blank? }
      lines[1].match?(/^[^3-9a-zA-Z]+$/) if lines[1]
    end
    puts pages + 1 if pages
    pages ? pages + 1 : 1 #extract all if no start found
  end

  def page_to_columns(range)
    puts 'Trimming Borders and Splitting Pages in Half'
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
      end
    end
  end

  def columns_to_text(range)
    range.each do |page|
      (0..1).each do |column|
        filename = "page_#{page}_col_#{column}.tiff"
        image_path = pdf_path(filename)
        docsplit_text(image_path)
      end
    end
    text_file = "page_#{page}_col_#{column}.txt"
  end

  def columns_to_lines(range)
    puts 'Chopping Column into Lines'
    new_column = 0
    range.each do |page|
      (0..1).each do |column|
        new_column += 1
        extract_lines(new_column, "page_#{page}_col_#{column}.tiff")
      end
    end
    save_lines
  end

  def save_lines
    columns.each do |column|
      line_range = column.number.to_i.even? ? (1..67) : (0..66)
      save_number =->(line) {column.number.to_i.even? ? line : line+1}
      puts [column.number, line_range]
      line_range.each do |line|
        li = column.lines.create(number: save_number.call(line))
        name = "col_#{column.number}_line_#{line}.jpg"
        li.image.attach(io: File.open(pdf_path(name)), filename: name)
      end
    end
    cleanup
  end

end
