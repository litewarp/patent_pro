# frozen_string_literal: true

class ColumnWorker
  include Sidekiq::Worker

  sidekiq_options lock: :until_executed

  def perform(column_id)
    @column = Column.find(column_id)
    @column.save_split_line_images
  end
end
