module MagickPixels
  # ImageMagick Wrapper
  class ImageHandler
    attr_reader :pixels

    def initialize(col_id)
      @path = SecureRandom.uuid
      @column = Column.find(col_id)
      @master_file = @column.image_path('master')
      @folder = "tmp/mm/#{@column.patent.number}"
      FileUtils.mkdir_p @folder
    end

    def working_path(name)
      [@folder, name].join('/')
    end

    ## segement column into 67 equal lines
    ## attach file to model as split_image
    def draw_split
      img = MiniMagick::Image.open(@master_file.path)
      lh = (img.height / 67).ceil
      row = ->(y) { (y * lh) > img.height ? img.height : (y * lh) }
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        (1..67).each { |i| convert.merge! red_line(row.call(i), img.height) }
        convert << working_path("#{@path}_split.png")
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
        convert << working_path("#{@path}_lined.png")
      end
      save_lined_image
    end

    private

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
      no_parens = ->(x) { x.gsub(/\s\([0-9\,\s]+\)\s/, '') }
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        convert.colorspace('Gray').depth(8)
        convert << working_path("#{@path}.txt")
      end
      File.open(working_path("#{@path}_min.txt"), 'a') do |new_file|
        map = File.read(working_path("#{@path}.txt"))
        map.each_line { |line| new_file << no_parens.call(line) }
      end
      File.delete(working_path("#{@path}.txt"))
    end

    def parse_bitmap
      ## slightly less than Alabama
      ## 98 percent is sufficient for purity
      is_you_white = lambda do |row|
        ## slice out the 35px column with line_numbers
        ## for even column, line on left, odd, line on right
        line = @column.number.to_i.even? ? row.slice(35..-1) : row.slice(0..-35)
        white_cols = line.select { |col| col.split(/\:/).second == '#FFFFFF' }
        whiteness = white_cols.count / row.count
        whiteness > 0.98
      end

      lines = File.read(working_path("#{@path}_min.txt")).split("\n")
      @col_count, @row_count = lines.last
                                    .gsub(/\:.*$/, '')
                                    .split(',')
                                    .collect { |x| x.to_i + 1 }
      File.delete(working_path("#{@path}_min.txt"))
      lines.each_slice(@col_count).collect { |row| is_you_white.call(row) }
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
        io: File.open(working_path("#{@path}_split.png")),
        filename: "col_#{@column.number}_split.png"
      )
    end

    def save_lined_image
      @column.lined_image.attach(
        io: File.open(working_path("#{@path}_lined.png")),
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
