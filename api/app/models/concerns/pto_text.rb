module PtoText
  extend ActiveSupport::Concern
  def search_url
      "http://patft.uspto.gov/netahtml/PTO/srchnum.htm"
    end

    def submit_pto_form(number)
      agent = Mechanize.new
      page = agent.get(search_url)
      form = page.form('search_pat')
      field = form.field_with(:name => "TERM1")
      field.value = number
      refresh_path = agent.submit(form).meta_refresh.first.uri.to_s
      agent.get("http://patft.uspto.gov"+refresh_path)
    end

    def get_pto_text
      patent_page = submit_pto_form(self.number)
      html = patent_page.css("coma > coma").to_html
      sections = html.split("<center>")
      search = sections.select { |x| x.start_with? "<b><i>Description" }
      text = search.first.gsub("<br>", "") if !sections.empty?
      text ? self.update(text: text) : nil
    end

  end
