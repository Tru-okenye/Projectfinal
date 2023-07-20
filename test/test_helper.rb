ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors, with: :threads)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
# class CreateUsers < ActiveRecord::Migration[6.1]
#   def change
#     create_table :users do |t|
#       t.string :name
#       t.string :email
#       t.string :password_digest
#       t.boolean :admin, default: false
#       t.string :confirmation_token
#       t.datetime :confirmed_at
#       t.datetime :confirmation_sent_at
#       t.timestamps
#     end
#     add_index :users, :email, unique: true
#     add_index :users, :confirmation_token, unique: true
#   end
# end