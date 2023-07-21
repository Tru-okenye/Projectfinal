
# config/application.rb or config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://127.0.0.1:5173'  # Replace this with the actual URL of your frontend
    resource '/api/*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

  
