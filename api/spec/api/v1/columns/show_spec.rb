require 'rails_helper'

RSpec.describe "columns#show", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/columns/#{column.id}", params: params
  end

  describe 'basic fetch' do
    let!(:column) { create(:column) }

    it 'works' do
      expect(ColumnResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq('columns')
      expect(d.id).to eq(column.id)
    end
  end
end
