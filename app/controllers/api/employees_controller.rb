
class Api::EmployeesController < ApplicationController
  def login
    # Assuming the frontend sends employee_id and employee_number in the request parameters
    employee_id = params[:employee_id]
    employee_number = params[:employee_number]

    # Check if the employee exists in the database
    employee = Employee.find_by(employee_id: employee_id, employee_number: employee_number)

    if employee
      render json: { success: true, employee: employee }, status: :ok
    else
      render json: { success: false, error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
