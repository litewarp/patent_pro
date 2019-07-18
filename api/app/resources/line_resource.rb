class LineResource < ApplicationResource
  include Rails.application.routes.url_helpers
  # config
  self.default_page_size = 100

  # data attributes
  attribute :column_id, :integer
  attribute :number, :string
  attribute :text, :string
  attribute :image, :string do
    @object.image.attachment.service_url if @object.image.attached?
  end

  # relationships
  belongs_to :column
end
