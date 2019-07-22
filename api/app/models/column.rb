class Column < ApplicationRecord
  # modules
  include MagickPixels
  include MagickHat
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
    MiniMagick::Tool::Convert.new do |convert|
      convert << URI.open(master_image.attachment.service_url).path
      gravity = number.to_i.even? ? 'West' : 'East'
      convert.merge! ['-gravity', gravity, '-chop', '35x0', '+repage']
      convert << working_path("col-#{number}-chopped.png")
    end
    file = File.open(working_path("col-#{number}-chopped.png"))
    Docsplit.extract_text([file.path], ocr: true, output: working_path(''))
    output = working_path("col-#{number}-chopped.txt")
    text = File.read(output)
    update!(extracted_text: text)
    File.delete(output)
  end

  def match_handler
    match = MatchHandler.new(id)
    matched_text = match.fuzzy_lines
    self.update!(matched_text: matched_text.join("\n"))
  end

  def working_path(name)
    dir = ['tmp', 'storage', patent.number.to_s].join('/')
    FileUtils.mkdir_p dir
    [dir, name].join('/')
  end
end
