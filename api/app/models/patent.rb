# standard US Patent
class Patent < ApplicationRecord
  include MagickPdfs
  # relationships
  has_one_attached :pdf
  has_many :columns, dependent: :destroy

  # validations
  validates :number, presence: true
  validates_uniqueness_of :number

  def pdf_url
    pat_url = "http://pat2pdf.org/pat2pdf/foo.pl?number=#{number}"
    doc = Nokogiri::HTML(URI.open(pat_url))
    path = doc.css('div#content').at('li>a').attributes['href'].value
    "http://pat2pdf.org#{path}"
  end

  def extract_pto_text
    patent_page = submit_pto_form
    html = patent_page.css('coma > coma').to_html
    sections = html.split('<center>')
    search = sections.select { |x| x.start_with? '<b><i>Description' }
    text = search.first.gsub('<br>', '') unless sections.empty?
    text ? update(text: text) : nil
  end

  def save_columns
    doc = DocumentHandler.new(number)
    doc.extract_columns
  end

  private

  def cleanup
    CleanupWorker.perform_async
  end

  def submit_pto_form
    agent = Mechanize.new
    page = agent.get('http://patft.uspto.gov/netahtml/PTO/srchnum.htm')
    form = page.form('search_pat')
    field = form.field_with(name: 'TERM1')
    field.value = number
    refresh_path = agent.submit(form).meta_refresh.first.uri.to_s
    agent.get('http://patft.uspto.gov' + refresh_path)
  end
end
