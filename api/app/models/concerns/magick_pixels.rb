module MagickPixels
  # ImageMagick Wrapper
  class ImageHandler
    attr_reader :pixels

    def initialize(col_id)
      init_mini_magick
      @active_column = Column.find(col_id)
      @master_file = @active_column.local_file_for_image('master')
      extract_pixelmap
    end

    def extract_pixelmap
      @path = SecureRandom.uuid
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
        white_cols = row.select { |col| col.split(/\:/).second == '#FFFFFF' }
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
      rows = parse_bitmap
      rows.collect.with_index do |row, index|
        next_line = rows[index + 1]
        prev_line = rows[index - 1]
        if row
          if !next_line && !prev_line
            'single'
          elsif next_line && !prev_line
            'start'
          elsif !next_line && prev_line
            'end'
          end
        end
      end
    end

    def segmentize
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
      breaks.collect do |obj|
        if obj.count == 1
          obj.first
        elsif obj.count > 1
          avg = obj.inject(0, :+) / obj.count
          avg.ceil
        end
      end
    end

    def draw_lines
      lines = segmentize
      convert = MiniMagick::Tool::Convert.new
      convert << @master_file.path
      lines.each do |num|
        convert << '-stroke' << 'red' << '-strokewidth' << '2'
        convert << '-draw' << "line 0,#{num} #{@col_count}, #{num}"
      end
      convert << "tmp/mm/#{@path}_lined.tiff"
      convert.call
      save_lined_image
    end

    def save_lined_image
      @active_column.lined_image.attach(
        io: File.open("tmp/mm/#{@path}_lined.tiff"),
        filename: "col-#{@active_column.number}-lined.tiff"
      )
    end

    private

    def init_mini_magick
      MiniMagick.configure do |config|
        config.cli = :graphicsmagick
        config.validate_on_create = false
        config.validate_on_write = false
      end
    end
  end
end
