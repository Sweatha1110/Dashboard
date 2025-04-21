    
    require 'sqlite3'

    db = SQLite3::Database.new 'db.sqlite3'

    
    db.execute <<-SQL
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_digest TEXT
    );
    SQL

    
    db.execute <<-SQL
    CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
    );
    SQL

    db.execute <<-SQL
    CREATE TABLE IF NOT EXISTS requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        service_id INTEGER,
        FOREIGN KEY(service_id) REFERENCES services(id)
    );
    SQL

    services = ["Web Hosting", "Domain Purchase", "SEO Optimization", "Email Setup"]
    services.each do |service|
    db.execute("INSERT OR IGNORE INTO services (name) VALUES (?)", [service])
    end

    puts "Database setup complete."
