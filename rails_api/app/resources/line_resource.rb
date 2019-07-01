class LineResource < ApplicationResource
  attribute :column_id, :integer
  attribute :number, :string
  attribute :text, :string
  attribute :image, :string do
    @object.image.service_url
  end
end
