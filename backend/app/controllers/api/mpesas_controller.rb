require 'rest-client'

class Api::MpesasController < ApplicationController
  MPESA_CONSUMER_KEY = 'lfPeIPhZ7KDHfyNCFILttArLsKhZv0Ma'
  MPESA_CONSUMER_SECRET = 'Voqvlbj5qApy6YEK'
  MPESA_PASSKEY = 'fef66eba0f3f6485df404ac4980e3f49924cc8a8b3e6ef7dd6bbc238cdd0629c'
  MPESA_SHORTCODE = '6437127'

  def stkpush
    phoneNumber = params[:phoneNumber]
    amount = params[:amount]

    url = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    timestamp = Time.now.strftime('%Y%m%d%H%M%S')
    business_short_code = MPESA_SHORTCODE
    password = Base64.strict_encode64("#{business_short_code}#{MPESA_PASSKEY}#{timestamp}")

    payload = {
      'BusinessShortCode' => business_short_code,
      'Password' => password,
      'Timestamp' => timestamp,
      'TransactionType' => 'CustomerBuyGoodsOnline',
      'Amount' => amount,
      'PartyA' => phoneNumber,
      'PartyB' => business_short_code,
      'PhoneNumber' => phoneNumber,
      'callbackurl' => 'https://c064-105-163-1-124.ngrok-free.app/callback',
      'AccountReference' => 'mybuss',
      'TransactionDesc' => 'Payment for my bus'
    }.to_json

    headers = {
      'Content-Type' => 'application/json',
      'Authorization' => "Bearer #{get_access_token}"
    }

    RestClient.log = 'stdout'

    puts "Payload: #{payload}"
    puts "Headers: #{headers}"

    begin
      response = RestClient.post(url, payload, headers)
      puts "Response code: #{response.code}"
      puts "Response body: #{response.body}"
      case response.code
      when 200
        render json: { success: true, data: JSON.parse(response.body) }
      else
        render json: { success: false, error: "Request failed with code #{response.code}", response: response.body }
      end
    rescue RestClient::ExceptionWithResponse => e
      puts "RestClient::ExceptionWithResponse: #{e.message}"
       puts "Response body: #{e.response.body}"
      render json: { success: false, error: "Request failed with an exception", exception: e.message }
    rescue StandardError => e
      puts "StandardError: #{e.message}"
      render json: { success: false, error: "An error occurred", exception: e.message }
    end
  end



  private

  def generate_access_token_request
    url = 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    consumer_key = MPESA_CONSUMER_KEY
    consumer_secret = MPESA_CONSUMER_SECRET
    userpass = Base64.strict_encode64("#{consumer_key}:#{consumer_secret}")
    headers = {
      'Authorization' => "Basic #{userpass}"
    }

    RestClient.get(url, headers)
  end

  def get_access_token
    access_token = AccessToken.first

    if access_token.nil? || access_token.expires_at < Time.now
      res = generate_access_token_request()

      if res.code == 200
        body = JSON.parse(res.body, symbolize_names: true)
        token = body[:access_token]
        expires_in = body[:expires_in]
        access_token = AccessToken.create!(token: token, expires_at: Time.now + 2.days)
      else
        raise MpesaError, 'Unable to generate access token'
      end
    end

    access_token.token
  end
end
