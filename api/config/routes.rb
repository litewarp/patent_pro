Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount Sidekiq::Web => '/sidekiq'
      resources :patents, param: :number
      resources :columns
      resources :lines
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
