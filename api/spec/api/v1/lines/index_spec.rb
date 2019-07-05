require 'rails_helper'

RSpec.describe "lines#index", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/lines", params: params
  end

  describe 'basic fetch' do
    let!(:line1) { create(:line) }
    let!(:line2) { create(:line) }

    it 'works' do
      expect(LineResource).to receive(:all).and_call_original
      make_request
      expect(response.status).to eq(200), response.body
      expect(d.map(&:jsonapi_type).uniq).to match_array(['lines'])
      expect(d.map(&:id)).to match_array([line1.id, line2.id])
    end
  end
end
