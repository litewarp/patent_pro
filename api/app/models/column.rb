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

  def text_path(name)
    dir = ['tmp', 'storage', patent.number.to_s].join('/')
    FileUtils.mkdir_p dir
    [dir, name].join('/')
  end

  def to_lines
    @image = local_file_for_image('master')
    magick_lines
    @line_range = number.to_i.even? ? (1..67) : (0..66)
    split_lines
  end

  def magick_lines
    MiniMagick.with_cli(:imagemagick) do
      MiniMagick::Tool::Convert.new do |convert|
        convert << @image.path
        convert.merge! ['-crop', '0x67@', '+repage', '+adjoin']
        convert << text_path("col_#{number}_line_%d.png")
      end
    end
  end

  def split_lines
    @line_range.call.each do |num|
      save_number = number.to_i.even? ? num : num + 1
      lines.create(
        number: save_number.call(num),
        image: {
          io: File.open(text_path("col_#{number}_line_#{num}.png")),
          filename: "col_#{number}_line_#{num}.png"
        }
      )
    end
  end

  def save_lined_image
    img = ImageHandler.new(id)
    img.draw_lines
  end
end
