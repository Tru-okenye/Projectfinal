class Api::PaymentsController < ApplicationController
  def create
    payment = Payment.new(payment_params)

    if payment.save
      render json: { success: true, data: payment }, status: :created
    else
      render json: { success: false, errors: payment.errors }, status: :unprocessable_entity
    end
  end

  private

  def payment_params
    params.require(:payment).permit(:name, :email, :phone, :seats, :amount, :from, :to, :date, :time)
  end
end
