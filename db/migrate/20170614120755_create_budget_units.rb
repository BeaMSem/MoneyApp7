class CreateBudgetUnits < ActiveRecord::Migration[5.0]
  def change
    create_table :budget_units do |t|

      t.string  :name
      t.decimal :in_credit, :default => nil
      t.decimal :in_debt, :default => nil
      t.boolean :is_savings
      t.boolean :is_income
      t.boolean :is_payment_method
      t.timestamps

    end
  end
end
