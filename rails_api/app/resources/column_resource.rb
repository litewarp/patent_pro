class ColumnResource < ApplicationResource
  attribute :patent_id, :integer
  attribute :number, :string
  attribute :text, :string
  has_many :lines
  belongs_to :patent
end
