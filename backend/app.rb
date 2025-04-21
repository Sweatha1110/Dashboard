require 'sinatra'
require 'sinatra/cross_origin'
require 'json'
require 'rack/cors'
require 'sqlite3'
require 'bcrypt'
require 'jwt'
require 'dotenv/load'

JWT_SECRET=ENV['JWT_SECRET']
set :bind, '0.0.0.0'  
set :port, 4567
use Rack::Cors do
  allow do
    origins 'http://localhost:3000'
    resource '*', headers: :any, methods: [:get, :post, :options],credentials: true,expose: ['Authorization']
  end
end


DB = SQLite3::Database.new 'db.sqlite3'
DB.results_as_hash = true


before do
   content_type :json
    headers 'Access-Control-Allow-Origin' => 'http://localhost:3000',
     'Access-Control-Allow-Credentials' => 'true',
     'Access-Control-Expose-Headers' => 'Authorization',       
     'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end


options "*" do
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    200
end




post '/signup' do
  data = JSON.parse(request.body.read)
  begin
    # Check if username already exists
    existing_user = DB.execute("SELECT * FROM users WHERE username = ?", [data["username"]]).first
    if existing_user
      halt 400, { error: "Username already exists" }.to_json
    end

    hashed_password = BCrypt::Password.create(data["password"])

    
    DB.execute("INSERT INTO users (username, password_digest) VALUES (?, ?)", [data["username"], hashed_password])
    { message: "Signup successful" }.to_json
  rescue => e
    halt 400, { error: "An error occurred: #{e.message}" }.to_json
  end
end


post '/login' do
  data = JSON.parse(request.body.read)
  user = DB.execute("SELECT * FROM users WHERE username = ?", [data["username"]]).first

  if user && BCrypt::Password.new(user["password_digest"]) == data["password"]
    puts user
    payload={username:user["username"],exp: Time.now.to_i + 3600}

    token=JWT.encode(payload,JWT_SECRET,'HS256')
    headers 'Authorization'=> " #{token}"
    {   
       message: "Login successful", username: user["username"] }.to_json
  else
    halt 401, { error: "Invalid credentials" }.to_json
  end
rescue BCrypt::Errors::InvalidHash
    halt 401, { error: "Invalid password format" }.to_json
  
end


get '/services' do
  services = DB.execute("SELECT * FROM services")
  services.to_json
end


post '/request_service' do
  data = JSON.parse(request.body.read)
  username = data['username']
  service_id = data["service_id"]

 
  service = DB.execute("SELECT * FROM services WHERE id = ?", [service_id]).first
  if service
    DB.execute("INSERT INTO requests (username, service_id) VALUES (?, ?)", [username, service_id])
    { message: "Service requested successfully" }.to_json
  else
    halt 400, { error: "Service not found" }.to_json
  end
end

#/requested_services/${username}

get '/requested_services/:username' do
  puts "hello"
  username = params[:username]
  services = DB.execute("SELECT s.name FROM requests r JOIN services s ON r.service_id = s.id WHERE r.username = ?", [username])
  services.map { |s| s["name"] }.to_json
end

helpers do
  def authenticate!
    header=request.env["HTTP_AUTHORIZATION"]
    token=header&.split(' ').last
    begin
      payload=JWT.decode(payload,JWT_SECRET,true,{algorithm: 'HS256'}).first
      payload["username"]
    rescue JWT::DecodeError
      halt 401,{error: "Invalid token"}.to_json
      
    end
  end
end
 