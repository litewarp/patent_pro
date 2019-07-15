
class CleanupWorker
  include Sidekiq::Worker

  sidekiq_options lock: :until_executed

  def perform
    FileUtils.rm_r Rails.root.join("tmp", "storage")
    FileUtils.rm_r Rails.root.join("tmp", "mm")
  end
end
