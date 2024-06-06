class AddColumnsToTarefas < ActiveRecord::Migration[6.0]
  def change
    add_column :tarefas, :nome, :string, limit: 50, null: false
    add_column :tarefas, :descricao, :text, limit: 140
    add_column :tarefas, :finalizada, :boolean, null: false, default: false
    add_column :tarefas, :data_termino, :datetime
    add_column :tarefas, :prioridade, :string, default: 'Baixa', limit: 20, null: false
    add_reference :tarefas, :membro, foreign_key: true
  end
end
