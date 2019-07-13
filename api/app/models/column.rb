class Column < ApplicationRecord
  # modules
  include MagickPixels
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :patent
  has_many :lines, dependent: :destroy
  has_one_attached :master_image
  has_one_attached :lined_image
  has_one_attached :split_image

  # validations
  validates :number, uniqueness: { scope: :patent_id }

  def save_all_images
    img = ImageHandler.new(id)
    img.draw_lines
    img.draw_split
    img.save_lines
  end

  def save_lined_image
    img = ImageHandler.new(id)
    img.draw_lines
  end

  def save_split_image
    img = ImageHandler.new(id)
    img.draw_split
  end

  def save_line_images
    img = ImageHandler.new(id)
    img.save_lines
  end

  def image_path(img_name)
    uri = lambda do
      case img_name
      when 'master'
        master_image.attachment.service_url
      when 'lined'
        lined_image.attachment.service_url
      when 'split'
        split_image.attachment.service_url
      end
    end
    URI.open(uri.call)
  end

  def extract_text
    file = URI.open(master_image.attachment.service_url)
    Docsplit.extract_text([file.path], ocr: true, output: working_path(""))
    output = working_path("#{File.basename(file)}.txt")
    text = File.read(output)
    self.update!(text: text)
    File.delete(output)
  end

  def working_path(name)
    dir = ['tmp', 'storage', patent.number.to_s].join('/')
    FileUtils.mkdir_p dir
    [dir, name].join('/')
  end
end
