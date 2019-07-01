require 'rails_helper'

RSpec.describe LineResource, type: :resource do
  describe 'creating' do
    let(:payload) do
      {
        data: {
          type: 'lines',
          attributes: { }
        }
      }
    end

    let(:instance) do
      LineResource.build(payload)
    end

    it 'works' do
      expect {
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      }.to change { Line.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:line) { create(:line) }

    let(:payload) do
      {
        data: {
          id: line.id.to_s,
          type: 'lines',
          attributes: { } # Todo!
        }
      }
    end

    let(:instance) do
      LineResource.find(payload)
    end

    xit 'works (add some attributes and enable this spec)' do
      expect {
        expect(instance.update_attributes).to eq(true)
      }.to change { line.reload.updated_at }
      # .and change { line.foo }.to('bar') <- example
    end
  end

  describe 'destroying' do
    let!(:line) { create(:line) }

    let(:instance) do
      LineResource.find(id: line.id)
    end

    it 'works' do
      expect {
        expect(instance.destroy).to eq(true)
      }.to change { Line.count }.by(-1)
    end
  end
end
