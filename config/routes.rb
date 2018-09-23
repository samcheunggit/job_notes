Rails.application.routes.draw do
  namespace :api do
   resources :jobs, only: [:index, :create, :destroy, :update]
  end

  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
