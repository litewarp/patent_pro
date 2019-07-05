require 'rails_helper'

RSpec.describe "columns#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/v1/columns/#{column.id}"
  end

  describe 'basic destroy' do
    let!(:column) { create(:column) }

    it 'updates the resource' do
      expect(ColumnResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { Column.count }.by(-1)
      expect { column.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq('meta' => {})
    end
  end
end
