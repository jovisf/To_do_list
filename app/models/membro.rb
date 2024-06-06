class Membro < ApplicationRecord
    has_many :tarefas
    
    validates :email, presence: true, uniqueness: true
    validates :nome, presence: true, length: { minimum: 5 }
  end
  