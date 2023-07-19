class AddDriverAndNumberPlateToBuses < ActiveRecord::Migration[7.0]
  def change
    add_column :buses, :driver_name, :string
    add_column :buses, :number_plate, :string
  end
end
