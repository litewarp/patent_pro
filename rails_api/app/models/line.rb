class Line < ApplicationRecord
  # modules
  include ExtractText
  include PdfSplit
  include MagickPdf
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :column
  has_one_attached :image

end
