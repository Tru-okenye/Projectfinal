 class Api::UsersController < ApplicationController
 def index
  email = params[:email]
  password = params[:password]

  begin
    @user = User.find_by(email: email)

    if @user&.authenticate(password)
      render json: @user, status: :ok
    else
      render json: { error: 'Invalid email or password.' }, status: :unauthorized
    end
  rescue StandardError => e
    # Log the error for debugging purposes
    Rails.logger.error("Error in UsersController#index: #{e.message}")
    render json: { error: 'An unexpected error occurred.' }, status: :internal_server_error
  end
end


  def create
    @user = User.new(user_params)

    if @user.save
      render json: { message: 'User created successfully.' }, status: :created
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end