module PdfSplit

  def pdf_length
    Docsplit.extract_length([@pdf.path])
  end

  # outputs each page of PDF as tiff
  def pdf_to_images
    Docsplit.extract_images(
      [@pdf.path],
      density: '300',
      format: 'tiff',
      output: pdf_path('')
    )
  end

  def docsplit_text(path)
    Docsplit.extract_text(
      [path],
      ocr: true,
      output: pdf_path('')
    )
  end

end
