Rails.application.routes.draw do
  namespace :api do
    post 'stkpush', to: 'mpesas#stkpush'
    resources :payments, only: [:create]
    # Other API routes
    resources :users, only: [:create, :index]
    resources :buses, defaults: { format: :json }, only: [:index, :show, :create, :update, :destroy]
  end

  # Other routes
  resources :mpesas
end
