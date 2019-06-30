class Column < ApplicationRecord
  belongs_to :patent
  has_many :lines
end
