module MagickPdfs
  # ImageMagick Wrapper
  class DocumentHandler
    def initialize(patent_num)
      init_magick
      @active_patent = Patent.find_by_number(patent_num)
      @file = URI.open(@active_patent.pdf_url)
      @basename = File.basename(@file.path)
      @pdf_length = Docsplit.extract_length([@file.path])
      @range = find_range
      puts @range
    end

    def working_path(name)
      dir = "tmp/mm/#{@active_patent.number.to_s}"
      FileUtils.mkdir_p dir
      [dir, name].join('/')
    end

    def extract_columns
      counter = 0
      @range.each do |num|
        split_pages(num)
        (0..1).each do |col|
          counter += 1
          column = @active_patent.columns.create(number: counter)
          column.master_image.attach(
            io: File.open(working_path("page_#{num}_col_#{col}.tiff")),
            filename: "col-#{counter}-master.tiff"
          )
          ColumnWorker.perform_async(column.id)
        end
      end
    end

    private

    def init_magick
      MiniMagick.configure do |config|
        config.cli = :graphicsmagick
        config.validate_on_create = false
        config.validate_on_write = false
      end
    end

    def find_range
      pdf_pages_to_tiff
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

    def split_pages(num)
      options = [
        '-trim', '+repage',
        '-chop', '0x95', '-trim', '+repage',
        '-crop', '2x0+35@', '+repage', '+adjoin'
      ]
      MiniMagick.with_cli(:imagemagick) do
        MiniMagick::Tool::Convert.new do |convert|
          convert << "#{@tiff_path}_#{num}.tiff"
          convert.merge! options
          convert << working_path("page_#{num}_col_%d.tiff")
        end
      end
    end

    def extract_page_tops
      (1..@pdf_length).collect do |num|
        MiniMagick::Tool::Convert.new do |convert|
          convert << "#{@tiff_path}_#{num}.tiff"
          convert.merge! ['-trim', '+repage', '-crop', '100%x8%+0+0', '+repage']
          convert << working_path("#{num}_top.tiff")
        end
        Docsplit.extract_text(
          ["tmp/mm/#{num}_top.tiff"],
          ocr: true,
          output: working_path('')
        )
        File.read("tmp/mm/#{num}_top.txt").split("\n").slice(1, 2)
      end
    end

    def pdf_pages_to_tiff
      puts 'Extracting Tiffs'
      Docsplit.extract_images(
        [@file.path],
        density: '300',
        format: 'tiff',
        output: working_path('')
      )
      @tiff_path = working_path(@basename)
    end
  end
end
