require 'rails_helper'

RSpec.describe "lines#show", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/lines/#{line.id}", params: params
  end

  describe 'basic fetch' do
    let!(:line) { create(:line) }

    it 'works' do
      expect(LineResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq('lines')
      expect(d.id).to eq(line.id)
    end
  end
end
