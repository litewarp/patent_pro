class Line < ApplicationRecord
  # modules
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :column
  has_one_attached :image

  # validations
  validates :number, uniqueness: { scope: :column_id }

  def working_path(name)
    dir =['tmp', 'storage', column.patent.number.to_s].join('/')
    FileUtils.mkdir_p dir
    [dir, name].join('/')
  end

  def extract_text
    file = URI.open(image.attachment.service_url)
    Docsplit.extract_text([file.path], ocr: true, output: working_path(""))
    output = working_path("#{File.basename(file)}.txt")
    text = File.read(output)
    self.update!(text: text)
    File.delete(output)
  end

end
