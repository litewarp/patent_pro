# frozen_string_literal: true

class LineWorker
  include Sidekiq::Worker

  sidekiq_options lock: :until_executed

  def perform(line_id)
    Line.find(line_id).extract_text
  end
end
