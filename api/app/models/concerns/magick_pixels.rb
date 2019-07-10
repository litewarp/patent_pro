module MagickPixels
  # ImageMagick Wrapper
  class ImageHandler
    attr_reader :pixels

    def initialize(col_id)
      init_mini_magick
      @path = SecureRandom.uuid
      @active_column = Column.find(col_id)
      @master_file = @active_column.image_path('master')
    end

    ## segement column into 67 equal lines
    ## attach file to model as split_image
    def draw_split
      image = MiniMagick::Image.open(@master_file.path)
      lh = (image.height / 67).ceil
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        (1..67).each { |i| convert.merge! << red_line((i * lh), image.width) }
        convert << "tmp/mm/#{@path}_split.png"
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
        lines.each { |num| convert.merge! << red_line(num, @col_count) }
        convert << "tmp/mm/#{@path}_lined.png"
      end
      save_lined_image
    end

    private

    def red_line(x_pos, width)
      le_line = "line 0,#{x_pos} #{width}, #{x_pos}"
      ['-stroke', 'red', '-strokewidth', '2', '-draw', le_line]
    end

    def extract_pixelmap
      file_path = "tmp/mm/#{@path}.txt"
      MiniMagick::Tool::Convert.new do |convert|
        convert << @master_file.path
        convert.colorspace('Gray').depth(8)
        convert << file_path
      end
      file = File.read(file_path)
      File.open("tmp/mm/#{@path}_min.txt", 'a') do |new_file|
        file.each_line do |line|
          new_file << line.gsub(/\s\([0-9\,\s]+\)\s/, '')
        end
      end
      File.delete(file_path)
    end

    def parse_bitmap
      is_you_white = lambda do |row|
        line = if @active_column.number.to_i.even?
                 row.slice(35..-1)
               else
                 row.slice(0..-35)
               end
        white_cols = line.select { |col| col.split(/\:/).second == '#FFFFFF' }
        whiteness = white_cols.count / row.count
        whiteness > 0.98
      end

      file_path = "tmp/mm/#{@path}_min.txt"
      lines = File.read(file_path).split("\n")
      @col_count, @row_count = lines.last
                                    .gsub(/\:.*$/, '')
                                    .split(',')
                                    .collect { |x| x.to_i + 1 }
      File.delete(file_path)
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
      @active_column.split_image.attach(
        io: File.open("tmp/mm/#{@path}_split.png"),
        filename: "col_#{@active_column.number}_split.png"
      )
    end

    def save_lined_image
      @active_column.lined_image.attach(
        io: File.open("tmp/mm/#{@path}_lined.png"),
        filename: "col_#{@active_column.number}_lined.png"
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
