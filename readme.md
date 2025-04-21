Simple cloud Dashboard - Full stack web application

This project is built using React.js for the frontend and Ruby (Sinatra framework) for the backend. 


FEATURES :

-Login page
-Signup page
-Landing page 
    --Home page
    --Request service page
    --View the services currently in use
-JWT token authentication (session storage) , bcrypt password hasing 


TEchstack:

Frontend :	React.js, Axios, Bootstrap
Backend	: Ruby, Sinatra, SQLite , rack-cors
Auth :	JWT (JSON Web Tokens)
Communication	REST API
Hosting/Run :	Localhost (WSL / Ubuntu setup)

COMMANDS :

PARENT FOLDER : 
-sudo chown -R sweatha:sweatha /home/sweatha/<dir_name>
-sudo gem install bundler

Frontend : pre-requisites -node js , npm cmd
-npm install create-react-app
-npx create-react-app <app_name>
-cd frontend
-npm install
-npm build
-npm start

BACKEND : pre-requisites - ruby ,jwt,bcrypt, sqlite3 
-put all the required gems in the gem file and run
-bundle init
-bundle install
-ruby <db_file>.rb
-ruby <app>.rb

