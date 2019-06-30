# pdf parsing methods
module PdfParser
  require 'open-uri'
  require 'docsplit'
  extend ActiveSupport::Concern

  def basename
    File.basename(@pdf.path)
  end

  def pdf_path(name)
    Rails.root.join('tmp', 'storage', name)
  end

  def normalize_pdf
    # resize to fit stripping schema
    # correct_rotation if possible
  end

  def create_columns(pages)
    pages.flatten.each_with_index do |column, index|
      @patent.columns.create(number: index + 1, text: column)
    end
  end

  # drop non-columned pages
  # find index of page where
  # first line only has chars
  # ['1', '2', ., '\s', '\n']
  def find_columns_start(file)
    pdf = PDF::Reader.new(file)
    pdf.pages.find_index do |page|
      lines = page.text.split("\n")
      lines[0..3].find_index { |x| x.match?(/^[1-2\s\.\n]+$/) }
    end
  end

  def extract_images
    pdf = grab_file
    start = find_columns_start(pdf)
    length = Docsplit.extract_length([pdf.path])
    page_range = start..length
    Docsplit.extract_images(
      [pdf.path],
      pages: page_range,
      format: [:png],
      density: '200x200',
      output: pdf_path('')
    )
    page_to_image(page_range)
    image_to_columns(page_range)
    columns_to_text(page_range)
    columns_to_lines(page_range)
    FileUtils.remove_dir(pdf_path(''))
  end

  def page_to_image(range)
    range.collect do |page|
      MiniMagick::Tool::Convert.new do |convert|
        convert << pdf_path("#{basename}_#{page}.png")
        convert.trim # remove bordering whitespace
        convert << pdf_path("#{basename}_page_#{page}.png")
      end
      File.delete(pdf_path("#{basename}_#{page}.png"))
    end
  end

  def image_to_columns(range)
    range.collect do |page|
      MiniMagick::Tool::Convert.new do |convert|
        convert << pdf_path("#{basename}_page_#{page}.png")
        convert.crop '2x0@' # tile into two columns, no rows, with @ operator
        convert << '+repage' # clean offset
        convert << '+adjoin' # output multiple
        convert << pdf_path("#{basename}_page_#{page}_column_%d.png")
      end
    end
  end

  def columns_to_text(range)
    pages = range.collect do |page|
      (0..1).collect do |column|
        Docsplit.extract_text(
          [pdf_path("#{basename}_page_#{page}_column_#{column}.png")],
          ocr: true,
          output: pdf_path('')
        )
        name = "#{basename}_page_#{page}_column_#{column}.txt"
        File.read(pdf_path(name))
      end
    end
    create_columns(pages)
  end

  def columns_to_lines(range)
    counter = 1
    range.each do |page|
      (0..1).each do |column|
        MiniMagick::Tool::Convert.new do |convert|
          convert << pdf_path("#{basename}_page_#{page}_column_#{column}.png")
          convert.crop '0x70@'
          convert << '+repage'
          convert << '+adjoin'
          convert << pdf_path("#{basename}_column_#{counter}_line_%d.png")
        end
        counter += 1
      end
    end
    save_lines(range)
  end

  def save_lines(range)
    counter = 1
    range.each do |_page|
      (0..1).each do |_column|
        col = @patent.columns.select { |x| x.number == counter }.first
        (0..69).each do |line|
          li = col.lines.create
          name = "column_#{counter}_line_#{line}.png"
          name_plus = "#{basename}_#{name}"
          li.image.attach(io: File.open(pdf_path(name_plus)), filename: name)
        end
      end
    end
  end
end
