require 'rails_helper'

RSpec.describe "columns#index", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/columns", params: params
  end

  describe 'basic fetch' do
    let!(:column1) { create(:column) }
    let!(:column2) { create(:column) }

    it 'works' do
      expect(ColumnResource).to receive(:all).and_call_original
      make_request
      expect(response.status).to eq(200), response.body
      expect(d.map(&:jsonapi_type).uniq).to match_array(['columns'])
      expect(d.map(&:id)).to match_array([column1.id, column2.id])
    end
  end
end
