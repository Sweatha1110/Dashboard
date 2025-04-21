require 'securerandom'
JWT_SECRET=SecureRandom.hex(64)
puts JWT_SECRET
