require 'google/apis/gmail_v1'
require 'googleauth'
require 'googleauth/stores/file_token_store'

# Set up the Gmail API client options
Google::Apis::ClientOptions.default.application_name = 'MYBUSS'
Google::Apis::ClientOptions.default.application_version = '0.0.0'
Google::Apis::ClientOptions.default.log_http_requests = true

# Set up credentials
def get_credentials(request)
  client_id = '770822386836-91ehjcsrlqdf77loisdaecs4ajm490nh.apps.googleusercontent.com'
  client_secret = ' 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'
  scope = Google::Apis::GmailV1::AUTH_GMAIL_COMPOSE
  redirect_uri = 'http://localhost:3000/oauth2callback'

  client = Google::Auth::WebUserAuthorizer.new(client_id, scope, token_store: Google::Auth::Stores::FileTokenStore.new(file: 'config/user_token.yaml'))
  user_id = 'default'

  if request&.session&.key?(:CALLBACK_STATE_KEY)
    code = request.session[:CALLBACK_STATE_KEY]
    credentials = client.get_and_store_credentials_from_code(user_id: user_id, code: code, base_url: redirect_uri)
  else
    url = client.get_authorization_url(base_url: redirect_uri)
    puts "Open the following URL in your browser and authorize the application:"
    puts url
    puts "Enter the authorization code:"
    code = gets.chomp
    credentials = client.get_and_store_credentials_from_code(user_id: user_id, code: code, base_url: redirect_uri)
  end

  # Assign the credentials to Gmail API
  service = Google::Apis::GmailV1::GmailService.new
  service.client_options = Google::Apis::ClientOptions.default
  service.authorization = credentials

  service # Return the service object
end

# Usage example:
# request = nil # Replace with your actual request object
# credentials = get_credentials(request)
# Now you can use the `credentials` for Gmail API operations
