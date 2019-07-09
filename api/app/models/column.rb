class Column < ApplicationRecord
  # modules
  include MagickPixels
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :patent
  has_many :lines, dependent: :destroy
  has_one_attached :master_image
  has_one_attached :lined_image

  def blob_path(img_name)
    blob_key = case img_name
               when 'master'
                 master_image.key
               when 'lined'
                 lined_image.key
               end
    ActiveStorage::Blob.service.send(:path_for, blob_key)
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
    end
  end

  def extract_lines
    MiniMagick.with_cli(:imagemagick) do
      MiniMagick::Tool::Convert.new do |convert|
        convert << blob_path('master')
        convert.merge! ['-crop', '0x67@', '+repage', '+adjoin']
        convert << text_path("col_#{number}_line_%d.png")
      end
    end
  end

  def save_lined_image
    img = ImageHandler.new(id)
    img.draw_lines
  end

  def extract_text
    @file = File.open(blob_path)
    basename = File.basename(@file.path)
    if master.attached?
      Docsplit.extract_text(
        [@file.path],
        ocr: true,
        output: Rails.root.join('tmp', 'storage')
      )
      text = File.read(text_path("#{basename}.txt"))
      update!(text: text)
      File.delete(text_path("#{basename}.txt"))
    end
  end
end
