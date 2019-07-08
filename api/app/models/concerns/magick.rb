module MagickPixels

  ### pixels[row_index][col_index] = [r,g,b] ###

  ### returns row_index of all white_rows ###

  def prepare_image(file_path)
    @image = MiniMagick::Image.open(file_path)
    @pixels = @image.colorspace("Gray").get_pixels
  end

  def find_non_white_rows
    rows = @pixels.collect.with_index do |row, row_index|
      # in grayscale, all 3 values are same, so comp to on [0]
      row_index if row.find_index { |col| col[0] != 255 }
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
  end
end

