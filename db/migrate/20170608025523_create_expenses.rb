class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.decimal :amount, :precision => 8, :scale => 2, null: false
      t.string :description, null: false
      t.datetime :time, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
