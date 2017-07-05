Rails.application.routes.draw do

  get 'recurring_expenses/create'

  get 'recurring_expenses/update'

  get 'recurring_expenses/delete'

        # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

        root 'static_pages#project'

        match 'description',
        :to => 'static_pages#description',
        :via => :get

        match 'tutorials',
        :to => 'static_pages#tutorials',
        :via => :get

        resources :settings
        resources :records
        resources :recurring_expenses

end
