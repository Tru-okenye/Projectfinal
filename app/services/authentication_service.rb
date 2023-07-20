class AuthenticationService
  SECRET_KEY = '3#Jk#1o&dfj$2dsT!5Fg$8*12b7Hm5T'.freeze


  def self.encode(payload)
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    JWT.decode(token, SECRET_KEY)[0]
  rescue JWT::DecodeError
    nil
  end
end
