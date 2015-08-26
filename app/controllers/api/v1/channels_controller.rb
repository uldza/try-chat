module Api
  module V1
    class ChannelsController < BaseController
      private
      def attributes
        attrs = {
          name: required_params[:name],
        }

        attrs[:user] = current_user if params[:action] == 'create'
        attrs
      end

      def serializer
        ChannelSerializer
      end
    end
  end
end
