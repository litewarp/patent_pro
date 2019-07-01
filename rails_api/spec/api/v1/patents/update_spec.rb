require 'rails_helper'

RSpec.describe "patents#update", type: :request do
  subject(:make_request) do
    jsonapi_put "/api/v1/patents/#{patent.id}", payload
  end

  describe 'basic update' do
    let!(:patent) { create(:patent) }

    let(:payload) do
      {
        data: {
          id: patent.id.to_s,
          type: 'patents',
          attributes: {
            # ... your attrs here
          }
        }
      }
    end

    # Replace 'xit' with 'it' after adding attributes
    xit 'updates the resource' do
      expect(PatentResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { patent.reload.attributes }
    end
  end
end
