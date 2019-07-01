require 'rails_helper'

RSpec.describe "lines#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/v1/lines/#{line.id}"
  end

  describe 'basic destroy' do
    let!(:line) { create(:line) }

    it 'updates the resource' do
      expect(LineResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { Line.count }.by(-1)
      expect { line.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq('meta' => {})
    end
  end
end
