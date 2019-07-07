
module ExtractText
  extend ActiveSupport::Concern

  def extract_text
    @file = File.open(blob_path)
    if image.attached?
      Docsplit.extract_text(
        [@file.path],
        ocr: true,
        output: Rails.root.join('tmp', 'storage')
      )
      text = File.read(text_path("#{basename}.txt"))
      self.update!(text: text)
      File.delete(text_path("#{basename}.txt"))
    end
  end

  ### SUB_METHODS ###
  def blob_path
    ActiveStorage::Blob.service.send(:path_for, self.image.key)
  end

  def text_path(name)
    Rails.root.join("tmp", "storage", name)
  end

end
