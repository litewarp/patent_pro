require 'rails_helper'

RSpec.describe ColumnResource, type: :resource do
  describe 'creating' do
    let(:payload) do
      {
        data: {
          type: 'columns',
          attributes: { }
        }
      }
    end

    let(:instance) do
      ColumnResource.build(payload)
    end

    it 'works' do
      expect {
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      }.to change { Column.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:column) { create(:column) }

    let(:payload) do
      {
        data: {
          id: column.id.to_s,
          type: 'columns',
          attributes: { } # Todo!
        }
      }
    end

    let(:instance) do
      ColumnResource.find(payload)
    end

    xit 'works (add some attributes and enable this spec)' do
      expect {
        expect(instance.update_attributes).to eq(true)
      }.to change { column.reload.updated_at }
      # .and change { column.foo }.to('bar') <- example
    end
  end

  describe 'destroying' do
    let!(:column) { create(:column) }

    let(:instance) do
      ColumnResource.find(id: column.id)
    end

    it 'works' do
      expect {
        expect(instance.destroy).to eq(true)
      }.to change { Column.count }.by(-1)
    end
  end
end
