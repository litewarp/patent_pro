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
    Docsplit.extract_images(
      [@pdf.path],
      format: [:png],
      depth: '400x400',
      output: pdf_path('')
    )
    length = Docsplit.extract_length([@pdf.path])
    start = find_columns_start(length)
    page_to_columns(start..length)
    save_columns(start..length)
    columns_to_lines(start..length)
  end

  def find_columns_start(length)
    puts 'Locating Start of Columns'
    (1..length).each do |page|
      MiniMagick::Tool::Convert.new do |convert|
        convert << pdf_path("#{basename}_#{page}.png")
        convert.trim
        convert << '+repage'
        convert.crop '100%x10%+0+0'
        convert << '+repage'
        convert << pdf_path("chopped_#{basename}_#{page}.png")
      end
    end
    pages = (1..length).collect do |page|
      filename = "chopped_#{basename}_#{page}"
      image_path = pdf_path(filename)
      Docsplit.extract_text(
        ["#{image_path}.png"],
        ocr: true,
        output: pdf_path('')
      )
      File.read(pdf_path("#{image_path}.txt"))
    end
    results = pages.find_index do |page|
      lines = page.split("\n")
      only_numbers = lines.find_index { |x| x.match?(/^[^3-4a-zA-Z]+$/) }
      lines[only_numbers + 1]&.match?(/^\s*[A-Z]+/) if only_numbers
    end
    puts results + 1 if results
    results + 1
  end

  def page_to_columns(range)
    puts 'Trimming Borders and Splitting Pages in Half'
    range.collect do |page|
      MiniMagick::Tool::Convert.new do |convert|
        convert << pdf_path("#{basename}_#{page}.png")
        convert.trim # remove bordering whitespace
        convert.chop '0x2%'
        convert.crop '2x0@' # tile into two columns, no rows, with @ operator
        convert << '+repage' # clean offset
        convert << '+adjoin' # output multiple
        convert << pdf_path("#{basename}_page_#{page}_column_%d.png")
      end
    end
  end

  def save_columns(range)
    puts 'Extracting Text From Columns'
    counter = 1
    range.each do |page|
      (0..1).each do |column|
        filename = "#{basename}_page_#{page}_column_#{column}.png"
        image_path = pdf_path(filename)
        col = columns.create(number: counter)
        col.image.attach(io: File.open(image_path), filename: filename)
      end
      counter += 1
    end
  end

  def columns_to_text(range)
    range.each do |page|
      (0..1).each do |column|
        filename = "#{basename}_page_#{page}_column_#{column}.png"
        image_path = pdf_path(filename)
        Docsplit.extract_text([image_path], ocr: true, output: pdf_path(''))
      end
    end
    text_file = "#{basename}_page_#{page}_column_#{column}.txt"
  end

  def columns_to_lines(range)
    puts 'Chopping Column into Lines'
    counter = 1
    range.each do |page|
      (0..1).each do |column|
        MiniMagick::Tool::Convert.new do |convert|
          convert << pdf_path("#{basename}_page_#{page}_column_#{column}.png")
          convert.chop '0x26'
          convert.crop '0x70@'
          convert << '+repage'
          convert << '+adjoin'
          convert << pdf_path("#{basename}_column_#{counter}_line_%d.png")
        end
        counter += 1
      end
    end
    save_lines
  end

  def save_lines
    columns.each do |column|
      (0..69).each do |line|
        li = column.lines.create(number: line + 1)
        name = "column_#{column.number}_line_#{line}.png"
        name_plus = "#{basename}_#{name}"
        li.image.attach(io: File.open(pdf_path(name_plus)), filename: name)
        li.save
      end
    end
    cleanup
  end

  def cleanup
    FileUtils.remove_dir(pdf_path(''))
  end
end
