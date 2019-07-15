module MagickPdfs
  # ImageMagick Wrapper
  class DocumentHandler
    def initialize(patent_num)
      @active_patent = Patent.find_by_number(patent_num)
      @file = URI.open(@active_patent.pdf_url(@active_patent.number))
      @basename = File.basename(@file.path)
      @pdf_length = Docsplit.extract_length([@file.path])
      @range = find_range
    end

    def working_path(name)
      dir = "tmp/mm/#{@active_patent.number}"
      FileUtils.mkdir_p dir
      [dir, name].join('/')
    end

    def extract_columns
      ## use counter for column count ##
      counter = 0
      @range.each do |num|
        split_pages(num)
        ## imagemagick outputs it as col_0 and col_1 per page
        ## iterate on top of the page range to account for split
        (0..1).each do |col|
          counter += 1
          column = @active_patent.columns.create(number: counter)
          column.master_image.attach(
            io: File.open(working_path("page_#{num}_col_#{col}.png")),
            filename: "col-#{counter}-master.png"
          )
          ## dispatch the image and text workers
          ColumnWorker.perform_async(column.id)
          File.delete(working_path("page_#{num}_col_#{col}.png"))
        end
      end
    end

    private

    def find_range
      pdf_pages_to_png
      page_tops = extract_page_tops
      le_start = page_tops.find_index do |page|
        page.find_index do |line|
          line.gsub("\s", '').match?(/^[^3-9a-zA-Z\f\t\n]{1,6}$/)
        end
      end
      le_end = page_tops.rindex do |page|
        page.find_index { |line| line.match?(/^[^3-9a-zA-Z\f\t\n]{1,6}$/) }
      end
      start = le_start + 1 || 1 # default to first page
      finish = le_end + 1 || @pdf_length + 1 # default to last
      (start..finish)
    end

    def split_pages(num)
      options = [
        '-trim', '+repage',
        '-chop', '0x98', '-trim', '+repage',
        '-crop', '2x0+35@', '+repage', '+adjoin'
      ]
      MiniMagick.with_cli(:imagemagick) do
        MiniMagick::Tool::Convert.new do |convert|
          convert << "#{@png_path}_#{num}.png"
          convert.merge! options
          convert << working_path("page_#{num}_col_%d.png")
        end
      end
      File.delete("#{@png_path}_#{num}.png")
    end

    def extract_page_tops
      (1..@pdf_length).collect do |num|
        MiniMagick::Tool::Convert.new do |convert|
          convert << "#{@png_path}_#{num}.png"
          convert.merge! ['-trim', '+repage', '-crop', '100%x7%+0+0', '+repage']
          convert << working_path("#{num}_top.png")
        end
        Docsplit.extract_text(
          [working_path("#{num}_top.png")],
          ocr: true,
          output: working_path('')
        )
        txt = File.read(working_path("#{num}_top.txt")).split("\n").slice(1, 2)
        FileUtils.rm_r(Dir[working_path("#{num}_top.*")])
        txt
      end
    end

    def pdf_pages_to_png
      puts 'Extracting Tiffs'
      Docsplit.extract_images(
        [@file.path],
        density: '300',
        format: 'png',
        output: working_path('')
      )
      @png_path = working_path(@basename)
    end
  end
end
