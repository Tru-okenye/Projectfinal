class AddExpiresAtToAccessTokens < ActiveRecord::Migration[7.0]
  def change
    add_column :access_tokens, :expires_at, :datetime
  end
end
