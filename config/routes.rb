Rails.application.routes.draw do
  root 'ideas#index'

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :destroy, :update]
      resources :edit, only: [:update]
    end
  end

end
