class Line < ApplicationRecord
  # modules
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :column
  has_one_attached :image

  def blob_path
    ActiveStorage::Blob.service.send(:path_for, self.image.key)
  end

  def attach_image(digit)
    name = "col_#{self.column.number}_line_#{digit}.jpg"
    file_path = Rails.root.join("tmp", "storage", name)
    attached = self.image.attach(io: File.open(file_path), filename: name)
  end

  def text_path(name)
    Rails.root.join("tmp", "storage", name)
  end

  def add_ocr_border
    file_path = text_path("col_#{self.column.number}_line_#{self.number}_bordered")
    MiniMagick::Tool::Convert.new do |convert|
      convert << @file.path
      convert.bordercolor("white").border("2x2")
      convert << "#{file_path}.jpg"
    end
    file_path
  end

  def extract_text
    @file = File.open(blob_path)
    if image.attached?
      file_path = add_ocr_border
      Docsplit.extract_text(
        ["#{file_path}.jpg"],
        ocr: true,
        output: text_path('')
      )
      file_name = "#{File.basename(file_path)}.txt"
      self.update!(text: File.read(text_path(file_name)))
      File.delete(text_path(file_name))
    end
  end
end