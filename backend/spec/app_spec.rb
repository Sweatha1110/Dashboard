require_relative '../app'
require 'rspec'
require 'rack/test'

ENV['RACK_ENV']='test'

describe'App Endpoints' do
    include Rack::Test::Methods

    def app
        Sinatra::Application
        
    end
    it 'responding for getting /services' do
        get '/services'
        expect(last_response).to be_ok
        expect(last_response.header['Content-Type']).to include 'application/json'

    end
end

