class Column < ApplicationRecord
  # modules
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :patent
  has_many :lines, dependent: :destroy
  has_one_attached :image

  def blob_path
    ActiveStorage::Blob.service.send(:path_for, self.image.key)
  end

  def line_range
    number.to_i.even? ? (1..67) : (0..66)
  end

  def save_number(line)
    number.to_i.even? ? line : line + 1
  end

  def create_line(number)
    lines.create(number: number.to_s)
  end

  def text_path(name)
    Rails.root.join("tmp", "storage", name)
  end

  def to_lines
    extract_lines(self.number, blob_path)
    line_range.each do |digit|
      line = create_line(save_number(digit))
      line.attach_image(digit)
      LineWorker.perform_async(line.id)
    end
  end

  def extract_lines(col, file_path)
    MiniMagick::Tool::Convert.new do |convert|
      convert << file_path
      convert.crop("0x67@")
      convert.repage.+
      convert.adjoin.+
      convert << text_path("col_#{col}_line_%d.jpg")
    end
  end

  def extract_text
    @file = File.open(blob_path)
    basename = File.basename(@file.path)
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
end
