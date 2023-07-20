# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
# Enable logging to the console
Rails.logger = ActiveSupport::Logger.new(STDOUT)