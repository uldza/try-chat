Rails.application.routes.draw do
  root to: 'application#index'

  get '/socket' => 'sockets#message'
end
