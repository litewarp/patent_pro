class Column < ApplicationRecord
  belongs_to :patent
  has_many :lines
  has_one_attached :image
end
