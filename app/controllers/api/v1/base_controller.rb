module Api
  module V1
    class BaseController < ApplicationController
      protect_from_forgery with: :null_session

      respond_to :json

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

      def user?
        current_user.try(:permission_group) == User::PERMISSION_USER
      end

      def admin?
        current_user.try(:permission_group) == User::PERMISSION_ADMIN
      end

      def guest?
        current_user.try(:permission_group) == User::PERMISSION_GUEST
      end
    end
  end
end
