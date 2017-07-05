class CreateRecurringExpenseCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :recurring_expense_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
