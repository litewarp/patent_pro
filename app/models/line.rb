class Line < ApplicationRecord
  belongs_to :column
  has_one_attached :image
end
