require 'rails_helper'

RSpec.describe "lines#update", type: :request do
  subject(:make_request) do
    jsonapi_put "/api/v1/lines/#{line.id}", payload
  end

  describe 'basic update' do
    let!(:line) { create(:line) }

    let(:payload) do
      {
        data: {
          id: line.id.to_s,
          type: 'lines',
          attributes: {
            # ... your attrs here
          }
        }
      }
    end

    # Replace 'xit' with 'it' after adding attributes
    xit 'updates the resource' do
      expect(LineResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { line.reload.attributes }
    end
  end
end
