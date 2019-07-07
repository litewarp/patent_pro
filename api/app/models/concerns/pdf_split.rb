
  ### MiniMagick Methods ###
module PdfSplit
  extend ActiveSupport::Concern

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

  ### SUB_METHODS ###
  def blob_path
    ActiveStorage::Blob.service.send(:path_for, self.image.key)
  end

  def text_path(name)
    Rails.root.join("tmp", "storage", name)
  end

  def pdf_path(name)
    Rails.root.join("tmp", "storage", name)
  end

  def image_to_column(page, file_path)
    MiniMagick::Tool::Convert.new do |convert|
      convert << file_path
      convert.trim.repage.+
      convert.chop("0x100").trim.repage.+
      convert.crop("2x0+35@").repage.+
      convert << pdf_path("page_#{page}_col_%d.tiff")
    end
  end

  def extract_lines(col, file_path)
    MiniMagick::Tool::Convert.new do |convert|
      convert << file_path
      convert.crop("0x67@")
      convert.repage.+
      convert.adjoin.+
      convert << pdf_path("col_#{col}_line_%d.jpg")
    end
  end

  def extract_page_tops(page, pdf_path)
    MiniMagick::Tool::Convert.new do |convert|
      convert << pdf_path
      convert.trim.repage.+
      convert.crop('100%x10%+0+0').repage.+.adjoin.+
      convert << pdf_path("top_of_#{page}.tiff")
    end
  end

  # outputs each page of PDF as tiff
  def pdf_to_images
    Docsplit.extract_images(
      [@pdf.path],
      density: '400',
      format: 'tiff',
      output: pdf_path('')
    )
  end

  def cleanup
    FileUtils.remove_dir(pdf_path(''))
  end

  def docsplit_text(path)
    Docsplit.extract_text(
      [path],
      ocr: true,
      output: pdf_path('')
    )
  end
end
