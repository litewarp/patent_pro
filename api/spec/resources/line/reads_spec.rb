require 'rails_helper'

RSpec.describe LineResource, type: :resource do
  describe 'serialization' do
    let!(:line) { create(:line) }

    it 'works' do
      render
      data = jsonapi_data[0]
      expect(data.id).to eq(line.id)
      expect(data.jsonapi_type).to eq('lines')
    end
  end

  describe 'filtering' do
    let!(:line1) { create(:line) }
    let!(:line2) { create(:line) }

    context 'by id' do
      before do
        params[:filter] = { id: { eq: line2.id } }
      end

      it 'works' do
        render
        expect(d.map(&:id)).to eq([line2.id])
      end
    end
  end

  describe 'sorting' do
    describe 'by id' do
      let!(:line1) { create(:line) }
      let!(:line2) { create(:line) }

      context 'when ascending' do
        before do
          params[:sort] = 'id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            line1.id,
            line2.id
          ])
        end
      end

      context 'when descending' do
        before do
          params[:sort] = '-id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            line2.id,
            line1.id
          ])
        end
      end
    end
  end

  describe 'sideloading' do
    # ... your tests ...
  end
end
