class Line < ApplicationRecord
  # modules
  include ExtractText
  include PdfSplit
  include MagickPdf
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :column
  has_one_attached :image


  def attach_image(digit)
    name = "col_#{self.column.number}_line_#{digit}.jpg"
    file_path = Rails.root.join("tmp", "storage", name)
    attached = self.image.attach(io: File.open(file_path), filename: name)
    if attached
      LineWorker.perform_async(self.id)
    end
  end

end
