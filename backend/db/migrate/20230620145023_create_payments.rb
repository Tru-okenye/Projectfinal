class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.string :name
      t.decimal :amount
      t.string :from
      t.string :to
      t.date :date
      t.time :time
      t.string :seats
     
      t.string :phone # Add the phone column

      t.timestamps
    end
  end
end
