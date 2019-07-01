require 'rails_helper'

RSpec.describe ColumnResource, type: :resource do
  describe 'serialization' do
    let!(:column) { create(:column) }

    it 'works' do
      render
      data = jsonapi_data[0]
      expect(data.id).to eq(column.id)
      expect(data.jsonapi_type).to eq('columns')
    end
  end

  describe 'filtering' do
    let!(:column1) { create(:column) }
    let!(:column2) { create(:column) }

    context 'by id' do
      before do
        params[:filter] = { id: { eq: column2.id } }
      end

      it 'works' do
        render
        expect(d.map(&:id)).to eq([column2.id])
      end
    end
  end

  describe 'sorting' do
    describe 'by id' do
      let!(:column1) { create(:column) }
      let!(:column2) { create(:column) }

      context 'when ascending' do
        before do
          params[:sort] = 'id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            column1.id,
            column2.id
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
            column2.id,
            column1.id
          ])
        end
      end
    end
  end

  describe 'sideloading' do
    # ... your tests ...
  end
end
