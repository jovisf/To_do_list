class AddNomeAndEmailToMembros < ActiveRecord::Migration[7.1]
  def change
    add_column :membros, :nome, :string, null: false
    add_column :membros, :email, :string, null: false

    # Adiciona uma restrição de unicidade à coluna email
    add_index :membros, :email, unique: true
  end
end
