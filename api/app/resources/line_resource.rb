class LineResource < ApplicationResource
  include Rails.application.routes.url_helpers
  # config
  self.default_page_size = 100

  # data attributes
  attribute :column_id, :integer
  attribute :number, :string
  attribute :text, :string
  attribute :image, :string do
    rails_blob_url(@object.image.attachment)
  end

  # relationships
  belongs_to :column
end
