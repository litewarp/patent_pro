class ColumnResource < ApplicationResource
  # config
  self.default_page_size = 100

  # data attributes
  attribute :patent_id, :integer
  attribute :number, :string
  attribute :text, :string

  # relationships
  has_many :lines
  belongs_to :patent
end
