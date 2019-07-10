class Column < ApplicationRecord
  # modules
  include MagickPixels
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :patent
  has_many :lines, dependent: :destroy
  has_one_attached :master_image
  has_one_attached :lined_image

  def local_file_for_image(img_name)
    uri = if img_name == 'master'
            master_image.attachment.service_url
          elsif img_name == 'lined'
            lined_image.attachment.service_url
          end
    URI.open(uri)
  end

  def line_range
    number.to_i.even? ? (1..67) : (0..66)
  end

  def save_number(line)
    number.to_i.even? ? line : line + 1
  end

  def create_line(number)
    lines.create(number: number.to_s)
  end

  def text_path(num, name)
    Rails.root.join('tmp', 'storage', num.to_s, name)
  end

  def png_line(num)
    "col_#{number}_line_#{num}.png"
  end

  def to_lines
    extract_lines
    line_range.each do |num|
      lines.create(
        number: save_number(num),
        image: {
          io: File.open(text_path(num, png_line(num))),
          filename: png_line(num)
        }
      )
      FileUtils.remove_dir text_path(num, '')
    end
  end

  def extract_lines
    MiniMagick.with_cli(:imagemagick) do
      MiniMagick::Tool::Convert.new do |convert|
        convert << local_file_for_image('master').path
        convert.merge! ['-crop', '0x67@', '+repage', '+adjoin']
        convert << text_path(number, "col_#{number}_line_%d.png")
      end
    end
  end

  def save_lined_image
    img = ImageHandler.new(id)
    img.draw_lines
  end
end
