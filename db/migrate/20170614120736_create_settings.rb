class CreateSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :settings do |t|
      t.string  :name
      t.string  :category_name
      t.integer :category_id
      t.integer :budget_unit_id
      t.decimal :total, :null => true
      t.decimal :balance, :null => true
      t.decimal :payment, :null => true

      t.timestamps
    end
  end
end
