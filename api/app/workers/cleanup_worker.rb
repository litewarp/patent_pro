
class CleanupWorker
  include Sidekiq::Worker

  sidekiq_options lock: :until_executed

  def perform
    FileUtils.remove_dir(Rails.root.join("tmp", "storage))
  end
end
