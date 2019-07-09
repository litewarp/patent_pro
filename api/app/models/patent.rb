class Patent < ApplicationRecord
  # modules

  # relationships
  has_one_attached :pdf
  has_many :columns, dependent: :destroy

  # validations
  validates :number, presence: true
  validates_uniqueness_of :number

  def init_parser
    @pdf = URI.open(pdf_url)
    @basename = File.basename(@pdf.path)
    @pdf_length = Docsplit.extract_length([@pdf.path])
  end

  def pdf_path(name)
    Rails.root.join('tmp', 'storage', name)
  end

  def pdf_url
    pat_url = "http://pat2pdf.org/pat2pdf/foo.pl?number=#{number}"
    doc = Nokogiri::HTML(URI.open(pat_url))
    path = doc.css('div#content').at('li>a').attributes['href'].value
    "http://pat2pdf.org#{path}"
  end

  def ingest
    init_parser
    pdf_to_images
    start = find_columns_start
    page_to_columns(start..@pdf_length)
  end

  def page_to_columns(range)
    range.each do |page|
      image_to_column(page, pdf_path("#{@basename}_#{page}.tiff"))
    end
    counter = 0
    range.each do |page|
      (0..1).each do |column|
        counter += 1
        filename = "page_#{page}_col_#{column}.tiff"
        image_path = pdf_path(filename)
        col = columns.create(number: counter)
        col.image.attach(io: File.open(image_path), filename: filename)
        ColumnWorker.perform_async(col.id)
      end
    end
  end

  def cleanup
    CleanupWorker.perform_async
  end

  def pto_search_url
    'http://patft.uspto.gov/netahtml/PTO/srchnum.htm'
  end

  def submit_pto_form
    agent = Mechanize.new
    page = agent.get(pto_search_url)
    form = page.form('search_pat')
    field = form.field_with(name: 'TERM1')
    field.value = @number
    refresh_path = agent.submit(form).meta_refresh.first.uri.to_s
    agent.get('http://patft.uspto.gov' + refresh_path)
  end

  def get_pto_text
    patent_page = submit_pto_form
    html = patent_page.css('coma > coma').to_html
    sections = html.split('<center>')
    search = sections.select { |x| x.start_with? '<b><i>Description' }
    text = search.first.gsub('<br>', '') unless sections.empty?
    text ? update(text: text) : nil
  end

  def image_to_column(page, file_path)
    MiniMagick::Tool::Convert.new do |convert|
      convert << file_path
      convert.contrast.trim.repage.+
      convert.chop('0x100').trim.repage.+
      convert.crop('2x0+35@').repage.+
      convert << pdf_path("page_#{page}_col_%d.tiff")
    end
  end
end
