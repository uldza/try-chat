class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from(Exception) { |ex| handle_error(ex) } unless ENV['RAILS_ENV'] == 'development'

  before_action :authenticate_user!

  def index
    @channels = Channel.all
  end

  def handle_error(exception = nil)
    @status = 500

    case exception
    # exception is nil when it happened in a middleware (routing errors)
    when ActionController::RoutingError, ActiveRecord::RecordNotFound, nil
      @status = 404
    else
      # Ussualy here I add to notify some external monitoring solution
      # env["airbrake.error_id"] = notify_airbrake(exception)
    end

    @url = '/'

    render :handle_error, layout: false, status: @status
  end
end
