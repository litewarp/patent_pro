class Line < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :column
  has_one_attached :image

  def blob_path
    ActiveStorage::Blob.service.send(:path_for, self.image.key)
  end

  def text_path(name)
    Rails.root.join("tmp", "storage", name)
  end

  def basename
    File.basename(@file.path)
  end

  def extract_text
    @file = File.open(blob_path)
    if image.attached?
      Docsplit.extract_text(
        [@file.path],
        ocr: true,
        output: Rails.root.join('tmp', 'storage')
      )
      text = File.read(text_path("#{basename}.txt"))
      puts text
    end
  end
end
