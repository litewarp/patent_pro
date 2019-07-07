module PtoText
  class Extractor
    def search_url
      "http://patft.uspto.gov/netahtml/PTO/srchnum.htm"
    end

    def submit_form
      agent = Mechanize.new
      page = agent.get(search_url)
      form = page.form('search_pat')
      field = form.field_with(:name => "TERM1")
      field.value = "7629705"
      refresh_path = agent.submit(form).meta_refresh.first.uri.to_s
      agent.get("http://patft.uspto.gov"+refresh_path)
    end

    def get_text
      patent_page = submit_form
      html = patent_page.css("coma > coma")
    end

  end
end
