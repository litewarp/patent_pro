module MagickPixels

  def init
    MiniMagick.configure do |config|
      config.cli = :graphicsmagick
      config.validate_on_create = false
      config.validate_on_write = false
    end
  end

  def open_file(uri)
    @file = MiniMagick::Image.open(uri)
  end

  def handle_pdf(uri)
    pdf = open_file(uri)
    pdf.pages
  end

  def prepare_image(file_path)
    @image = MiniMagick::Image.open(file_path)
    @pixels = @image.colorspace("Gray").get_pixels
  end

  def find_non_white_rows
    you_is_white = lambda do |_row|
      results = _row.collect { |_col| _col[0] != 255 }
      not_white = results.select { |x| !x}.count
      blackness = not_white / _row.count
      blackness < 0.10
    end


    rows = @pixels.collect.with_index do |row, row_index|
      # in grayscale, all 3 values are same, so comp to on [0]
      row_index if you_is_white.call(row)
    end
    rows.compact!
    rows
  end

  def find_white_rows
    #subtract 1 to match with index
    row_count = @pixels.count-1
    @non_white_rows = find_non_white_rows
    @white_rows = (0..row_count).to_a - @non_white_rows
  end

  def parse_this
    find_white_rows
    @non_white_rows.collect.with_index { |row, index| row+1 == @non_white_rows[index+1] }
    ## also try white_rows
  end
end

