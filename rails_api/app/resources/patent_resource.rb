class PatentResource < ApplicationResource
  attribute :title, :string
  attribute :number, :string
  has_many :columns
end
