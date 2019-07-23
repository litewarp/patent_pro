class Line < ApplicationRecord
  # modules
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :column
  has_one_attached :image

  # validations
  validates :number, uniqueness: { scope: :column_id }

  def working_path(name)
    dir = ['tmp', 'storage', column.patent.number.to_s].join('/')
    FileUtils.mkdir_p dir
    [dir, name].join('/')
  end

  def extract_text(file)
    image = RTesseract.new(file)
    pdf = PDF::Reader.new(image.to_pdf)
    line = pdf.pages.first.text
    text = if line.length < 50 && line.last === "."
            line << "<<I>>"
           else
             line
           end
    update!(extracted_text: text)
    File.delete(file)
  end

end
