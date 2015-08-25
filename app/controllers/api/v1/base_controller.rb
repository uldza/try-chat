module Api
  module V1
    class BaseController < ApplicationController
      protect_from_forgery with: :null_session

      before_filter :check_user, except: [:index, :show]

      respond_to :json

      def index
        respond_with( scoped_resources )
      end

      def show
        @resource = scoped_resources.find( params[:id] )
        respond_with( @resource )
      end

      def create
        @resource = resource_class.new( attributes )
        @resource.save
        respond_with( @resource )
      end

      def update
        @resource = scoped_resources.find( params[:id] )
        @resource.assign_attributes( attributes )
        @resource.save
        respond_with( @resource )
      end

      def destroy
        @resource = scoped_resources.find( params[:id] )
        respond_with( @resource.destroy )
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

      def attributes
        {}
      end

      def resource_class
        self.class.name.split('::', 2).last.sub(/Controller$/, '').classify.constantize
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
end
