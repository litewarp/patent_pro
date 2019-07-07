# frozen_string_literal: true

class ColumnWorker
  include Sidekiq::Worker

  sidekiq_options lock: :until_executed

  def perform(column_id)
    @column = Column.find(column_id)
    @column.to_lines
  end
end
