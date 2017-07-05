class CreateRecurringExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :recurring_expenses do |t|

      t.string    :name
      t.string    :category
      t.integer   :category_id
      t.decimal   :amount
      t.string    :cron_code, :null => true

      t.timestamps
    end
  end
end
