class Tarefa < ApplicationRecord
    belongs_to :membro
  
    validates :nome, presence: true, length: { minimum: 5, maximum: 50 }
    validates :descricao, length: { maximum: 140 }
    validates :finalizada, inclusion: { in: [true, false] }
    validates :prioridade, inclusion: { in: ['Baixa', 'Média', 'Alta'] }
  
    before_validation :set_prioridade_padrao
  
    def set_prioridade_padrao
      self.prioridade ||= 'Baixa'
    end
  
    def finalizar
      return if finalizada?
  
      self.finalizada = true
      self.data_termino = Time.now
      save
    end
  
    def finalizada?
      finalizada
    end
  end