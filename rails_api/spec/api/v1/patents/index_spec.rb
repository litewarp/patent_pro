require 'rails_helper'

RSpec.describe "patents#index", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/patents", params: params
  end

  describe 'basic fetch' do
    let!(:patent1) { create(:patent) }
    let!(:patent2) { create(:patent) }

    it 'works' do
      expect(PatentResource).to receive(:all).and_call_original
      make_request
      expect(response.status).to eq(200), response.body
      expect(d.map(&:jsonapi_type).uniq).to match_array(['patents'])
      expect(d.map(&:id)).to match_array([patent1.id, patent2.id])
    end
  end
end
