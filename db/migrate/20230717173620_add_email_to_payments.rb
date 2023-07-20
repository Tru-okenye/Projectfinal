class AddEmailToPayments < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :email, :string
  end
end
