FROM ruby:3.2-slim

WORKDIR /app

COPY . .

RUN apt-get update -qq && apt-get install -y libpq-dev build-essential

COPY Gemfile* ./

RUN gem install bundler && bundle install

EXPOSE 4567

CMD ruby db_setup.rb && ruby app.rb