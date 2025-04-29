require 'pg'
require 'dotenv/load'


conn=PG.connect(
    dbname:ENV['DB_NAME'],
    user:ENV['DB_USER'],
    password:ENV['DB_PASSWORD'],
    host:ENV['DB_HOST'] 
)

conn.exec <<-SQL
CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
username TEXT UNIQUE NOT NULL,
password_digest TEXT NOT NULL
);
SQL

conn.exec <<-SQL
CREATE TABLE IF NOT EXISTS services(
id SERIAL PRIMARY KEY,
name TEXT UNIQUE NOT NULL
);
SQL

conn.exec <<-SQL
CREATE TABLE IF NOT EXISTS requests(
id SERIAL PRIMARY KEY,
username TEXT NOT NULL,
service_id INTEGER REFERENCES services(id)
);
SQL

services=["Web hosting","Domain purchase","SEO optimization","Email setup"]
services.each do |service|
    conn.exec_params("INSERT INTO services (name) VALUES ($1) ON CONFLICT DO NOTHING",[service])
    
end

puts "postgres db setup completed"