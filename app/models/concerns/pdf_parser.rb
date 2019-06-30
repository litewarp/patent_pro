# pdf parsing methods
module PdfParser
  require 'open-uri'
  require 'docsplit'
  extend ActiveSupport::Concern

  def grab_file
    examples = [
      'https://patentimages.storage.googleapis.com/f5/fd/7e/7db7e8e7b6b49c/US6091781.pdf',
      'https://patentimages.storage.googleapis.com/1e/82/1a/6c072edfcc6ba0/US7629705.pdf'
    ]
    file = examples.sample
    puts file.split('/').last.gsub('.pdf', '')
    @pdf = URI.open(file)
  end

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

  # drop non-columned pages
  # find index of page where
  # first line only has chars
  # ['1', '2', ., '\s', '\n']
  def find_columns_start(file)
    pdf = PDF::Reader.new(file)
    pdf.pages.find_index do |page|
      lines = page.text.split("\n")
      lines[0..3].collect { |x| x.match?(/^[1-2\s\.\n]+$/) }.include?(true)
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
      density: '400x400', # high density required
      output: pdf_path('')
    )
    page_to_image(page_range)
    image_to_columns(page_range)
    columns_to_text(page_range)
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
          output: Rails.root.join('tmp')
        )
        name = "#{basename}_page_#{page}_column_#{column}.txt"
        path = Rails.root.join('tmp', name)
        text = File.read(path)
        File.delete(path)
        text
      end
    end
    pages.flatten
  end

  def columns_to_lines(range, pdf)
    counter = 1
    name = ->(p, c) { "#{basename}_page_#{p}_column_#{c}.png" }
    range.each do |page|
      (0..1).each do |column|
        MiniMagick::Tool::Convert.new do |convert|
          convert << Rails.root.join('tmp', 'storage', name.call(page, column))
          convert.crop '0x70'
          convert << '+repage'
          convert << '+adjoin'
          new_path = Rails.root.join('tmp', 'storage', File.basename(pdf.path) + '_' + "column_#{counter}_line_%d.png")
          convert << new_path
        end
        counter += 1
      end
    end
  end
end
