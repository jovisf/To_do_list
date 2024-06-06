class CreateMembros < ActiveRecord::Migration[7.1]
  def change
    create_table :membros do |t|

      t.timestamps
    end
  end
end
