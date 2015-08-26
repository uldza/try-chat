Rails.application.routes.draw do
  devise_for :users

  get '/socket' => 'sockets#message'

  namespace :api do
    namespace :v1 do
      resources :channels do
        resources :messages
      end
    end
  end

  root to: 'application#index'

  match "*not_found_path", to: "application#handle_error", via: [:get, :post], format: false
end
