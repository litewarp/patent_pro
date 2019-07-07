# frozen_string_literal: true

class PatentWorker
  include Sidekiq::Worker

  sidekiq_options lock: :until_executed

  def perform(patent_id)
    patent = Patent.find(patent_id)
    patent.get_pto_text
    patent.ingest
  end
end
