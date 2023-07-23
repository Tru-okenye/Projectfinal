Rails.application.routes.draw do
  namespace :api do
    post 'stkpush', to: 'mpesas#stkpush'
    post 'callback', to: 'mpesas#callback'
   post 'sessions/login', to: 'sessions#login'
    resources :payments, only: [:create]
    
    # Other API routes
    resources :users, only: [:create, :index]
    resources :buses, defaults: { format: :json }, only: [:index, :show, :create, :update, :destroy]
  end

  root 'api/users#index' 
  # Other routes
  resources :mpesas
  
end
