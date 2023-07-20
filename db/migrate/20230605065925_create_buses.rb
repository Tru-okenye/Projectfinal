class CreateBuses < ActiveRecord::Migration[7.0]
  def change
    create_table :buses do |t|
      t.string :from
      t.string :to
      t.float :amount
      t.date :date
      t.time :time
      t.integer :seats

      t.timestamps
    end
  end
end
