class Api::ConfirmationsController < ApplicationController
  def confirm
    user = User.find_by(confirmation_token: params[:token])

    if user.present?
      user.update(confirmed_at: Time.now)
      render json: { message: 'Email confirmed successfully' }
    else
      render json: { error: 'Invalid confirmation token' }, status: :unprocessable_entity
    end
  end
end

