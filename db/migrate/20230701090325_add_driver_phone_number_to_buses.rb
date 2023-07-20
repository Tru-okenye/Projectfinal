class AddDriverPhoneNumberToBuses < ActiveRecord::Migration[6.1]
  def change
    add_column :buses, :driver_phone_number, :string
  end
end
