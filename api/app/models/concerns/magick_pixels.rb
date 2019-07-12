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

    def working_path(name)
      [@folder, name].join('/')
    end

    ## segement column into 67 equal lines
    ## attach file to model as split_image
    def draw_split
      lh = (@image.height / 67).ceil
      row = ->(y) { (y * lh) > @image.height ? @image.height : (y * lh) }
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        (1..67).each { |i| convert.merge! red_line(row.call(i), @image.height) }
        convert << working_path("#{@column.number}_split.png")
      end
      save_split_image
    end

    ## draw lines at white <=> black transitions
    ## attach file to model as lined_image
    def draw_lines
      extract_pixelmap
      lines = segmentize
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        lines.each { |num| convert.merge! red_line(num, @col_count) }
        convert << working_path("#{@column.number}_lined.png")
      end
      save_lined_image
    end

    ## determine coordinates for the line to draw
    ## and prepares output for imagemagick
    def red_line(row, width)
      coordinates = "line 0,#{row} #{width},#{row}"
      ['-stroke', 'red', '-strokewidth', '2', '-draw', coordinates]
    end

    ## extracts pixelmap to txt file and then minifies it
    ## could use improvement
    ## full tiff as txt is 80 and min is ~41mb
    ## query whether minifying is really more efficent
    ## than parsing and gsubbing map once
    def extract_pixelmap
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        convert.colorspace('Gray').depth(8)
        convert << working_path("#{@column.number}_pixelmap.txt")
      end
    end

    def parse_bitmap
      ## slightly less than Alabama
      ## 98 percent is sufficient for purity
      is_you_white = lambda do |row|
        ## slice out the 35px column with line_numbers
        ## for even column, line on left, odd, line on right
        line = @column.number.to_i.even? ? row.slice(35..-1) : row.slice(0..-35)
        white_cols = line.select { |col| col.match?(/\#FFFFFF/) }
        whiteness = white_cols.count / row.count.to_f
        whiteness > 0.98
      end
      lines = File.read(working_path("#{@column.number}_pixelmap.txt"))
                  .split("\n")
      File.delete(working_path("#{@column.number}_pixelmap.txt"))
      # offset width by 35px to account for chopped line numbers
      width = @image.width - 35
      byebug
      lines.each_slice(width).collect { |r| is_you_white.call(r) }
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

        line_type.call(rows[index - 1], next_line[index + 1])
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
  end
end
