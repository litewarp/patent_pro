class Patent < ApplicationRecord
  has_one_attached :pdf
  has_many :columns

  validates :number, presence: true
  validates_uniqueness_of :number


  def pdf_url
    pat_number = number
    pat2pdf_url = "http://pat2pdf.org/pat2pdf/foo.pl?number=#{pat_number}"
    doc = Nokogiri::HTML(URI.open(pat2pdf_url))
    path = doc.css('div#content').at('li>a').attributes['href'].value
    "http://pat2pdf.org#{path}"
  end

  def get_pdf
    @pdf = URI.open(pdf_url)
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

  def pdf_length
    Docsplit.extract_length([@pdf.path])
  end

  # outputs each page of PDF as tiff
  def pdf_to_images
    Docsplit.extract_images(
      [@pdf.path],
      density: '300',
      format: 'tiff',
      output: pdf_path('')
    )
  end

  def image_to_column(page, file_name)
    MiniMagick::Tool::Convert.new do |convert|
      convert << pdf_path(file_name)
      convert.trim
      convert.repage.+
      convert.chop("0x100")
      convert.trim
      convert.repage.+
      convert.crop("2x0+35@")
      convert << pdf_path("page_#{page}_col_%d.tiff")
    end
  end

  def extract_lines(col, file_name)
    MiniMagick::Tool::Convert.new do |convert|
      convert << pdf_path(file_name)
      convert.crop("0x67@")
      convert.repage.+
      convert.adjoin.+
      convert << pdf_path("col_#{col}_line_%d.jpg")
    end
  end

  def extract_page_tops(page)
    MiniMagick::Tool::Convert.new do |convert|
      convert << pdf_path("#{basename}_#{page}.tiff")
      convert.trim
      convert.repage.+
      convert.crop '100%x10%+0+0'
      convert.repage.+
      convert.adjoin.+
      convert << pdf_path("top_of_#{page}.tiff")
    end
  end

  def docsplit_text(path)
    Docsplit.extract_text(
      [path],
      ocr: true,
      output: pdf_path('')
    )
  end

  def find_columns_start(length)
    puts 'Locating Start of Columns'
    (1..length).each { |page| extract_page_tops(page) }
    pages = (1..length).find_index do |page|
      image_path = pdf_path("top_of_#{page}")
      docsplit_text("#{image_path}.tiff")
      lines = File.read(pdf_path("#{image_path}.txt")).split("\n")
      lines.reject! {|x| x.blank? }
      only_numbers = lines.find_index { |x| x.match?(/^[^3-9a-zA-Z]+$/) }
      lines[only_numbers + 1]&.match?(/^\s*[A-Z]+/) if only_numbers
    end
    puts pages + 1 if pages
    pages + 1
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
        Docsplit.extract_text([image_path], ocr: true, output: pdf_path(''))
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

  def cleanup
    FileUtils.remove_dir(pdf_path(''))
  end
end
