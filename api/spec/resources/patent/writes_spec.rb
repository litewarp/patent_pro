require 'rails_helper'

RSpec.describe PatentResource, type: :resource do
  describe 'creating' do
    let(:payload) do
      {
        data: {
          type: 'patents',
          attributes: { }
        }
      }
    end

    let(:instance) do
      PatentResource.build(payload)
    end

    it 'works' do
      expect {
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      }.to change { Patent.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:patent) { create(:patent) }

    let(:payload) do
      {
        data: {
          id: patent.id.to_s,
          type: 'patents',
          attributes: { } # Todo!
        }
      }
    end

    let(:instance) do
      PatentResource.find(payload)
    end

    xit 'works (add some attributes and enable this spec)' do
      expect {
        expect(instance.update_attributes).to eq(true)
      }.to change { patent.reload.updated_at }
      # .and change { patent.foo }.to('bar') <- example
    end
  end

  describe 'destroying' do
    let!(:patent) { create(:patent) }

    let(:instance) do
      PatentResource.find(id: patent.id)
    end

    it 'works' do
      expect {
        expect(instance.destroy).to eq(true)
      }.to change { Patent.count }.by(-1)
    end
  end
end
