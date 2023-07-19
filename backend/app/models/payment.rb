class Payment < ApplicationRecord
  attr_accessor :phone_number

  validates :name, :from, :to, :date, :time, :seats, :email, presence: true
  validates :amount, numericality: { greater_than: 0 }
end
