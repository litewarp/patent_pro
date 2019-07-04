# frozen_string_literal: true

class ColumnWorker
  include Sidekiq::Worker

  sidekiq_options lock: :until_executed

  def perform(column_id)
    Column.find(column_id).extract_text
  end
end
