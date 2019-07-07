

module MagickPdf
  extend ActiveSupport::Concern
  def pdf_path(name)
    Rails.root.join("tmp", "storage", name)
  end
  def image_to_column(page, file_name)
    MiniMagick::Tool::Convert.new do |convert|
      convert << pdf_path(file_name)
      convert.resize("50%")
      convert.trim
      convert.repage.+
      convert.chop("0x100")
      convert.trim
      convert.repage.+
      convert.crop("2x0+35@")
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

  def extract_page_tops(page)
    MiniMagick::Tool::Convert.new do |convert|
      convert << pdf_path("#{basename}_#{page}.tiff")
      convert.trim
      convert.repage.+
      convert.crop '100%x10%+0+0'
      convert.repage.+
      convert.adjoin.+
      convert << pdf_path("top_of_#{page}.tiff")
    end
  end
end
