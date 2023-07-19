class AccessToken < ApplicationRecord
  validates :token, :expires_at, presence: true
end
