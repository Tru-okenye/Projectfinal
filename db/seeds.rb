
require_relative '../config/environment'

# Create some sample employees
Employee.create!(
  employee_id: 'EMP001',
  employee_number: 'E001',
  employee_name: 'John Doe',
  phone_number: '123456789'
)

Employee.create!(
  employee_id: 'EMP002',
  employee_number: 'E002',
  employee_name: 'Jane Smith',
  phone_number: '987654321'
)





Bus.create(from: 'City A', to: 'City B', amount: 10.0, date: Date.today, time: Time.now, seats: 50)
Bus.create(from: 'City C', to: 'City D', amount: 15.0, date: Date.tomorrow, time: Time.now, seats: 40)
# Add more bus records as needed
