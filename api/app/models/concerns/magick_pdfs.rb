module MagickPdfs
  # ImageMagick Wrapper
  class DocumentHandler
    def initialize(uri)
      init_magick
      @uri = uri
      @uuid = SecureRandom.uuid
      @file = URI.open(uri)
      @basename = File.basename(@file.path)
      @pdf_length = Docsplit.extract_length([@file.path])
      @range = find_range
    end

    def pdf_pages_to_tiff
      puts 'Extracting Tiffs'
      puts @range
      Docsplit.extract_images(
        [@file.path],
        pages: @range,
        density: '300',
        format: 'tiff',
        output: 'tmp/mm/'
      )
      @tiff_path = "tmp/mm/#{@basename}"
    end

    def pdf_pages_to_png
      Docsplit.extract_images(
        [@file.path],
        size: '50%',
        format: 'png',
        output: 'tmp/mm/'
      )
      @png_path = "tmp/mm/#{@basename}"
    end

    def extract_columns(patent_id)
      pdf_pages_to_tiff
      patent = Patent.find(patent_id)
      counter = 0
      @range.each do |num|
        MiniMagick.with_cli(:imagemagick) do
          MiniMagick::Tool::Convert.new do |convert|
            convert << "#{@tiff_path}_#{num}.tiff"
            convert.trim.repage.+
            convert.chop('0x100').trim.repage.+
            convert.crop('2x0+35@').repage.+
            convert.adjoin.+
            convert << Rails.root.join('tmp', 'mm', "page_#{num}_col_%d.tiff")
          end
        end
        (0..1).each do |col|
          counter += 1
          column = patent.columns.create(number: counter)
          column.image.attach(
            io: File.open("tmp/mm/page_#{num}_col_#{col}.tiff"),
            filename: "col-#{counter}.tiff"
          )
        end
      end
      FileUtils.rm Dir.glob('/tmp/mm/*')
    end

    def init_magick
      MiniMagick.configure do |config|
        config.cli = :graphicsmagick
        config.validate_on_create = false
        config.validate_on_write = false
      end
    end

    def find_range
      pdf_pages_to_png
      page_tops = extract_page_tops
      le_start = page_tops.find_index do |page|
        page.find_index do |line|
          line.gsub("\s", '').match?(/^[^3-9a-zA-Z]{1,6}$/)
        end
      end
      le_end = page_tops.rindex do |page|
        page.find_index { |line| line.match?(/^[^3-9a-zA-Z]{1,6}$/) }
      end
      start = le_start + 1 || 1 # default to first page
      finish = le_end + 1 || @pdf_length + 1 # default to last
      (start..finish)
    end

    def extract_page_tops
      (1..@pdf_length).collect do |num|
        MiniMagick::Tool::Convert.new do |convert|
          convert << "#{@png_path}_#{num}.png"
          convert.trim.crop('100%x10%+0+0')
          convert << '+repage'
          convert << "tmp/mm/#{num}_top.jpg"
        end
        Docsplit.extract_text(
          ["tmp/mm/#{num}_top.jpg"],
          ocr: true,
          output: 'tmp/mm/'
        )
        File.read("tmp/mm/#{num}_top.txt").split("\n").slice(1, 2)
      end
    end
  end
end
