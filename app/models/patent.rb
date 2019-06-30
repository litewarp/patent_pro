class Patent < ApplicationRecord
  has_one_attached :pdf
  include PdfParser
end
