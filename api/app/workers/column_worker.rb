# frozen_string_literal: true

class ColumnWorker
  include Sidekiq::Worker

  sidekiq_options lock: :until_executed

  def perform(column_id)
    @column = Column.find(column_id)
    @column.extract_text
    @column.save_lined_image
    @column.save_split_image
    @column.save_line_images
  end
end
