Rails.application.routes.draw do
  devise_for :users

  get '/socket' => 'sockets#message'

  namespace :api do
    namespace :v1 do
      resources :messages
      resources :channels
    end
  end

  root to: 'application#index'

  match "*not_found_path", to: "application#handle_error", via: [:get, :post], format: false
end
