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
      'PartyB' => '8676510',
      'PhoneNumber' => phoneNumber,
      'CallBackURL' => 'https://lets-ride-fe42d9bf40d4.herokuapp.com/api/callback',
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

      # After making the STK push API call and getting the response
      response_data = JSON.parse(response.body)
      response_code = response_data['ResponseCode']

      if response_code == '0'
        # STK push was successful, respond with success and the CheckoutRequestID
        render json: { success: true, checkoutRequestID: response_data['CheckoutRequestID'] }
      else
        # STK push failed, respond with error message and the ResponseDescription
        render json: { success: false, error: response_data['ResponseDescription'] }
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
  
 

def stkquery
     url = "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query"
        timestamp = "#{Time.now.strftime "%Y%m%d%H%M%S"}"
        business_short_code = ENV["MPESA_SHORTCODE"]
        password = Base64.strict_encode64("#{business_short_code}#{ENV["MPESA_PASSKEY"]}#{timestamp}")
        payload = {
        'BusinessShortCode': business_short_code,
        'Password': password,
        'Timestamp': timestamp,
        'CheckoutRequestID': params[:checkoutRequestID]
        }.to_json

       headers = {
      'Content-Type' => 'application/json',
      'Authorization' => "Bearer #{get_access_token}"
    }

  response = RestClient::Request.new({
    method: :post,
    url: url,
    payload: payload,
    headers: headers
  }).execute do |response, _request|
    case response.code
    when 500
      { status: 'error', data: JSON.parse(response.to_str) }
    when 400
      { status: 'error', data: JSON.parse(response.to_str) }
    when 200
      { status: 'success', data: JSON.parse(response.to_str) }
    else
      { status: 'error', data: "Invalid response #{response.to_str} received." }
    end
  end

  render json: response
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


