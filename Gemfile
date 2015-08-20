source 'https://rubygems.org'

gem 'rails', '4.2.1'
gem 'mysql2'
gem 'uglifier', '>= 1.3.0'

# Frontend gems
gem 'haml-rails'
gem 'sass-rails', '~> 5.0'
gem 'bower-rails'
gem 'socket.io-rails'
# React as frontend lib
gem 'react-rails', '~> 1.0'
# write javascript as ES6
gem 'sprockets'
gem 'sprockets-es6', require: 'sprockets/es6'

# For auth
gem 'devise'

# For json structure
gem 'active_model_serializers', '~> 0.9.0'

# Puma web server
gem 'tubesock'
gem 'redis'
gem 'puma'

# Capistrano for deployment
#gem 'capistrano3-puma'
#gem 'capistrano'
#gem 'capistrano-rails'
#gem 'capistrano-rvm'
#gem 'capistrano-bundler'

group :development, :test do
  gem 'poltergeist'
  gem 'rspec-rails'
  gem 'capybara'
  gem 'simplecov', require: false, platforms: :mri_19
  gem 'simplecov-rcov'
  gem 'database_cleaner'
  gem 'shoulda-matchers'
  gem 'pry'
  gem 'pry-nav'
  gem 'factory_girl_rails'
  gem 'timecop'
end

group :test do
  gem 'webmock'
end

