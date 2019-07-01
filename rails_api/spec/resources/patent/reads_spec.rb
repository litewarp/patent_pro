require 'rails_helper'

RSpec.describe PatentResource, type: :resource do
  describe 'serialization' do
    let!(:patent) { create(:patent) }

    it 'works' do
      render
      data = jsonapi_data[0]
      expect(data.id).to eq(patent.id)
      expect(data.jsonapi_type).to eq('patents')
    end
  end

  describe 'filtering' do
    let!(:patent1) { create(:patent) }
    let!(:patent2) { create(:patent) }

    context 'by id' do
      before do
        params[:filter] = { id: { eq: patent2.id } }
      end

      it 'works' do
        render
        expect(d.map(&:id)).to eq([patent2.id])
      end
    end
  end

  describe 'sorting' do
    describe 'by id' do
      let!(:patent1) { create(:patent) }
      let!(:patent2) { create(:patent) }

      context 'when ascending' do
        before do
          params[:sort] = 'id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            patent1.id,
            patent2.id
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
            patent2.id,
            patent1.id
          ])
        end
      end
    end
  end

  describe 'sideloading' do
    # ... your tests ...
  end
end
