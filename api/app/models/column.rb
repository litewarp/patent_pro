class Column < ApplicationRecord
  # modules
  include ExtractText
  include PdfSplit
  include MagickPdf
  include Rails.application.routes.url_helpers

  # relationships
  belongs_to :patent
  has_many :lines, dependent: :destroy
  has_one_attached :image

  def line_range
    number.to_i.even? ? (1..67) : (0..66)
  end

  def save_number(line)
    number.to_i.even? ? line : line + 1
  end

  def create_line(number)
    lines.create(number: number)
  end

  def to_lines
    split_image
    line_range.each do |digit|
      line = create_line(number: save_number(digit))
      line.attach_image(digit)
      LineWorker.perform_async(line.id)
    end
  end

  def split_image
    extract_lines(number, blob_path)
  end
end
