class ColumnResource < ApplicationResource
  include Rails.application.routes.url_helpers
  # config
  self.default_page_size = 100

  # data attributes
  attribute :patent_id, :integer
  attribute :number, :string
  attribute :text, :string
  attribute :lined_img_count, :string

  attribute :master_img_url, :string do
    @object.master_image.attachment.service_url if @object.master_image.attached?
  end

  attribute :lined_img_url, :string do
    @object.lined_image.attachment.service_url if @object.lined_image.attached?
  end
  attribute :split_img_url, :string do
    @object.split_image.attachment.service_url if @object.split_image.attached?
  end

  # relationships
  has_many :lines
  belongs_to :patent
end
