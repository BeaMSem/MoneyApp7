class CreateRecords < ActiveRecord::Migration[5.0]
  def change
    create_table :records do |t|
        t.string    :name
        t.decimal   :qty, :null => true
        t.decimal   :amount
        t.string    :shop_name, :null => true
        t.integer   :payment_method_id, :null => true
        t.integer   :transfer_into_id, :null => true
        t.string    :record_type

      t.timestamps
    end
  end
end
