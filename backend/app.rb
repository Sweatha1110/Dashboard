require 'sinatra'
require 'sinatra/cross_origin'
require 'json'
require 'rack/cors'
require 'sqlite3'
require 'bcrypt'
require 'jwt'
require 'pg'
require 'dotenv/load'

JWT_SECRET=ENV['JWT_SECRET']

set :bind, '0.0.0.0'  
set :port, 4567


use Rack::Cors do
  allow do
    origins 'http://localhost'
    resource '*', headers: :any, methods: [:get, :post, :options],credentials: true,expose: ['Authorization']
  end
end

#i have used memoization to avoid repeatedly calling the db function

def db
  @db ||= PG.connect(
    dbname:ENV['DB_NAME'],
    user:ENV['DB_USER'],
    password:ENV['DB_PASSWORD'],
    host:ENV['DB_HOST']
  )
  
end

before do
   content_type :json
    headers 'Access-Control-Allow-Origin' => 'http://localhost',
     'Access-Control-Allow-Credentials' => 'true',
     'Access-Control-Expose-Headers' => 'Authorization',       
     'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end


options "*" do
    200
end




post '/api/signup' do
  data = JSON.parse(request.body.read)
  begin
   
    existing_user = db.exec_params("SELECT * FROM users WHERE username = $1", [data["username"]]).first
    if existing_user
      halt 400, { error: "Username already exists" }.to_json
    end

    hashed_password = BCrypt::Password.create(data["password"])

    
    db.exec_params("INSERT INTO users (username, password_digest) VALUES ($1, $2)", [data["username"], hashed_password])
    { message: "Signup successful" }.to_json
  rescue => e
    halt 400, { error: "An error occurred: #{e.message}" }.to_json
  end
end


post '/api/login' do
  data = JSON.parse(request.body.read)
  user = db.exec_params("SELECT * FROM users WHERE username = $1", [data["username"]]).first

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


get '/api/services' do
  content_type :json
  services = db.exec("SELECT * FROM services")
  services.to_a.to_json
end

get '/api/' do
  puts "hello"
  "hello"
end

post '/api/request_service' do
  data = JSON.parse(request.body.read)
  username = data['username']
  service_id = data["service_id"]

 
  service = db.exec_params("SELECT * FROM services WHERE id = $1", [service_id]).first
  if service
    db.exec_params("INSERT INTO requests (username, service_id) VALUES ($1, $2)", [username, service_id])
    { message: "Service requested successfully" }.to_json
  else
    halt 400, { error: "Service not found" }.to_json
  end
end

#/requested_services/${username}

get '/api/requested_services/:username' do
  # puts "hello"
  username = authenticate!
  if username!=params[:username]
      halt 403,{error: "username is not authorized"}.to_json
  end
  services = db.exec_params("SELECT s.name FROM requests r JOIN services s ON r.service_id = s.id WHERE r.username = $1", [username])
  services.map { |s| s["name"] }.to_json
end

helpers do
  def authenticate!
    header=request.env["HTTP_AUTHORIZATION"]
    token=header&.split(' ')&.last
    begin
      payload=JWT.decode(token,JWT_SECRET,true,{algorithm: 'HS256'}).first
      payload["username"]
    rescue JWT::DecodeError
      halt 401,{error: "Invalid token"}.to_json
      
    end
  end
end
 