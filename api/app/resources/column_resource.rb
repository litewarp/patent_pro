class ColumnResource < ApplicationResource
  include Rails.application.routes.url_helpers
  # config
  self.default_page_size = 100

  # data attributes
  attribute :patent_id, :integer
  attribute :number, :string
  attribute :text, :string

  attribute :master_img_url, :string do
    rails_blob_path(@object.master_image.attachment) if @object.master_image.attached?
  end

  attribute :lined_img_url, :string do
    rails_blob_path(@object.master_image.attachment) if @object.lined_image.attached?
  end
  # relationships
  has_many :lines
  belongs_to :patent
end
