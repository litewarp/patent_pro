require 'rails_helper'

RSpec.describe "columns#update", type: :request do
  subject(:make_request) do
    jsonapi_put "/api/v1/columns/#{column.id}", payload
  end

  describe 'basic update' do
    let!(:column) { create(:column) }

    let(:payload) do
      {
        data: {
          id: column.id.to_s,
          type: 'columns',
          attributes: {
            # ... your attrs here
          }
        }
      }
    end

    # Replace 'xit' with 'it' after adding attributes
    xit 'updates the resource' do
      expect(ColumnResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { column.reload.attributes }
    end
  end
end
