require 'rails_helper'

RSpec.describe "patents#create", type: :request do
  subject(:make_request) do
    jsonapi_post "/api/v1/patents", payload
  end

  describe 'basic create' do
    let(:params) do
      {
        # ... your attrs here
      }
    end
    let(:payload) do
      {
        data: {
          type: 'patents',
          attributes: params
        }
      }
    end

    it 'works' do
      expect(PatentResource).to receive(:build).and_call_original
      expect {
        make_request
        expect(response.status).to eq(201), response.body
      }.to change { Patent.count }.by(1)
    end
  end
end
