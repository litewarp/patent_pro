require 'rails_helper'

RSpec.describe "patents#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/v1/patents/#{patent.id}"
  end

  describe 'basic destroy' do
    let!(:patent) { create(:patent) }

    it 'updates the resource' do
      expect(PatentResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { Patent.count }.by(-1)
      expect { patent.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq('meta' => {})
    end
  end
end
