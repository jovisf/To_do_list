Rails.application.routes.draw do
  resources :membros

  resources :tarefas

  put 'tarefa/:id/finalizar', to: 'tarefas#finalizar'

  root "membros#index"

  # Rota para OPTIONS em qualquer caminho
  match "*path", via: [:options], to: -> (_) { [204, {}, ""] }

  get "up" => "rails/health#show", as: :rails_health_check
end
