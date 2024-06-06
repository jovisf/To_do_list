# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_06_210420) do
  create_table "membros", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nome", null: false
    t.string "email", null: false
    t.index ["email"], name: "index_membros_on_email", unique: true
  end

  create_table "tarefas", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nome", limit: 50, null: false
    t.text "descricao", size: :tiny
    t.boolean "finalizada", default: false, null: false
    t.datetime "data_termino", precision: nil
    t.string "prioridade", limit: 20, default: "Baixa", null: false
    t.bigint "membro_id"
    t.index ["membro_id"], name: "index_tarefas_on_membro_id"
  end

  add_foreign_key "tarefas", "membros"
end
