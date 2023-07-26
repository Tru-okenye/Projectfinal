Rails.application.routes.draw do
  namespace :api do
    post 'employees/login', to: 'employees#login'
    post 'stkpush', to: 'mpesas#stkpush'
    post 'stkquery', to: 'mpesas#stkquery'
  
    resources :payments, only: [:create]
    
    # Other API routes
  
    resources :buses, defaults: { format: :json }, only: [:index, :show, :create, :update, :destroy]
  end

  root 'api/buses#index' 
  # Other routes
  resources :mpesas
  
end
