class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :employee_id
      t.string :employee_number
      t.string :employee_name
      t.string :phone_number

      t.timestamps
    end
  end
end
