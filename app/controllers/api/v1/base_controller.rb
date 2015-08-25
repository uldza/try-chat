module Api::V1
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session

    before_filter :check_user, except: [:index, :show]

    respond_to :json

    def index
      render json: scoped_resources, status: 200, each_serializer: serializer
    end

    def show
      @resource = scoped_resources.find( params[:id] )
      render json: @resource, status: 200
    end

    def create
      @resource = resource_class.new( attributes )
      @resource.save
      render json: @resource, status: 200
    end

    def update
      @resource = scoped_resources.find( params[:id] )
      @resource.assign_attributes( attributes )
      @resource.save
      render json: @resource, status: 200
    end

    def destroy
      @resource = scoped_resources.find( params[:id] )
      render json: {success: @resource.destroy}, status: 200
    end

    def render_401
      render nothing: true, status: 401
    end

    def render_403
      render nothing: true, status: 403
    end

    def render_404
      render nothing: true, status: 404
    end

    private
    def publish( redis_channel, message )
      Redis.new.publish redis_channel, message
    end

    def serializer; end

    def required_params
      params.require( resource_name )
    end

    def attributes
      {}
    end

    def resource_class
      self.class.name.split('::', 3).last.sub(/Controller$/, '').classify.constantize
    end

    def resource_name
      resource_class.to_s.downcase
    end


    def scoped_resources
      resource_class.all
    end

    def check_user
      render_401 unless current_user
      render_403 if current_user.guest?
    end
  end
end
