module MagickPixels
  # ImageMagick Wrapper
  class ImageHandler
    attr_reader :pixels

    def initialize(col_id)
      @column = Column.find(col_id)
      @master_file = @column.image_path('master')
      @folder = "tmp/mm/#{@column.patent.number}"
      FileUtils.mkdir_p @folder
      @image = MiniMagick::Image.open(@master_file.path)
    end

    def draw_lines
      extract_pixelmap
      lines = segmentize
      puts "Drawing Lines: #{lines.count}"
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        lines.each { |num| convert.merge! red_line(num, @image.width) }
        convert << working_path("#{@column.number}_lined.png")
      end
      @column.update!(lined_img_count: lines.count)
      save_lined_image
    end

    def save_lines
      find_or_create = lambda do |line|
        found = @column.lines.find_by_number(line)
        return found if found

        @column.lines.create(column_id: @column.id, number: line)
      end

      get_text = lambda do |pdf|
        begin
          text = pdf.pages.first.text
        rescue => e
          puts e
        end
        text ? text : ""
      end

      puts "Extracting Text From Split Images"
      path = magick_lines
      indents = []
      (1..67).each do |line|
        file_path = working_path("#{path}_#{line.to_s.rjust(2, '0')}.png")
        file = File.open(file_path)
        li = find_or_create.call(line)
        Docsplit.extract_text([file.path], ocr: true, output: working_path(""))
        line_text = File.read(file_path.gsub("png", "txt"))

        indents.push(line+1) if line_text.length < 50 && line_text.last === "."
        to_save = indents.include?(line) ? "\t".concat(line_text.to_s) : line_text
        li.update!(extracted_text: to_save)
      end
    end

    ## determine coordinates for the line to draw
    ## and prepares output for imagemagick
    def red_line(row, width)
      coordinates = "line 0,#{row} #{width},#{row}"
      ['-stroke', 'red', '-strokewidth', '2', '-draw', coordinates]
    end

    def extract_pixelmap
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        gravity = @column.number.to_i.even? ? 'West' : 'East'
        convert << '-gravity' << gravity << '-chop' << '35x0' << '+repage'
        convert.colorspace('Gray').depth(8)
        convert << working_path("#{@column.number}_pixelmap.txt")
      end
    end

    def parse_bitmap
      ## slightly less than Alabama
      ## 98 percent is sufficient for purity
      is_you_white = lambda do |row|
        ## slice out 25px column with line_numbers
        ## for even column, line on left, odd, line on right

        white_cols = row.select { |col| col.match?(/\#FFFFFF/) }
        whiteness = white_cols.count / row.count.to_f
        whiteness > 0.9999
      end
      lines = File.read(working_path("#{@column.number}_pixelmap.txt"))
                  .split("\n")
      @col_count = lines.last.gsub(/\:.*$/, '').split(',').first.to_i + 1
      result = lines.each_slice(@col_count).collect { |r| is_you_white.call(r) }

      File.delete(working_path("#{@column.number}_pixelmap.txt"))
      result
    end

    def extract_segments
      line_type = lambda do |prev_line, next_line|
        if !prev_line
          next_line ? 'start' : 'single'
        else
          next_line ? nil : 'end'
        end
      end
      rows = parse_bitmap
      rows.collect.with_index do |row, index|
        next unless row

        line_type.call(rows[index - 1], rows[index + 1])
      end
    end

    def save_split_image
      @column.split_image.attach(
        io: File.open(working_path("#{@column.number}_split.png")),
        filename: "col_#{@column.number}_split.png"
      )
    end

    def save_lined_image
      @column.lined_image.attach(
        io: File.open(working_path("#{@column.number}_lined.png")),
        filename: "col_#{@column.number}_lined.png"
      )
    end

    def segmentize
      line_break_at = lambda do |obj|
        obj.count > 1 ? (obj.inject(0, :+) / obj.count).ceil : obj.first
      end
      boundaries = extract_segments
      breaks = []
      boundaries.each_with_index do |row, index|
        case row
        when 'single'
          breaks << [index]
        when 'start'
          new_array = boundaries.slice(index..-1)
          until_end = new_array.find_index { |x| x == 'end' }
          breaks << [index, index + until_end]
        when 'end'
          new_array = boundaries.slice(0..index)
          breaks << [index] unless new_array.find_index { |x| x == 'start' }
        end
      end
      breaks.collect { |obj| line_break_at.call(obj) }
    end

    def magick_lines
      MiniMagick.with_cli(:imagemagick) do
        MiniMagick::Tool::Convert.new do |convert|
          convert << @master_file.path
          convert.merge! ['-crop', '0x67@', '+repage', '+adjoin', '-scene', '01']
          convert << working_path("col_#{@column.number}_line_%02d.png")
        end
      end
      "col_#{@column.number}_line"
    end

    private

    def working_path(name)
      [@folder, name].join('/')
    end
  end
end
