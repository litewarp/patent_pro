require 'rails_helper'

RSpec.describe "patents#show", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/patents/#{patent.id}", params: params
  end

  describe 'basic fetch' do
    let!(:patent) { create(:patent) }

    it 'works' do
      expect(PatentResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq('patents')
      expect(d.id).to eq(patent.id)
    end
  end
end
