class LineResource < ApplicationResource
  include Rails.application.routes.url_helpers
  attribute :column_id, :integer
  attribute :number, :string
  attribute :text, :string
  attribute :image, :string do
    rails_blob_url(@object.image.attachment)
  end
  belongs_to :column
end
