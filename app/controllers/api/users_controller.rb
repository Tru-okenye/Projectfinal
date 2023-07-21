class Api::UsersController < ApplicationController
  def index
    email = params[:email]
    password = params[:password]
    @user = User.find_by(email: email)

    if @user&.authenticate(password)
      render json: @user, status: :ok
    else
      render json: { error: 'Invalid email or password.' }, status: :unauthorized
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

def root
    # Implement the logic for the root page here
    render json: { message: 'Welcome to the Root Page!' }, status: :ok
  end

