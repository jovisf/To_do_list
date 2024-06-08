class Tarefa < ApplicationRecord
    belongs_to :membro
  
    validates :nome, presence: true, length: { minimum: 5, maximum: 50 }
    validates :descricao, length: { maximum: 140 }
    validates :finalizada, inclusion: { in: [true, false] }
    enum prioridade: %i[baixa media alta].index_with(&:to_s), _default: 'baixa'
  
  
  
    def finalizar
      return if finalizada?
  
      self.finalizada = true
      self.data_termino = Time.now
      save
    end
  
  end