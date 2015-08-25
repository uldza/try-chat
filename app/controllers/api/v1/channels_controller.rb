module Api
  module V1
    class ChannelsController < BaseController
      private
      def attributes
        {
          user: current_user,
          name: required_params[:name],
        }
      end

      def serializer
        ChannelSerializer
      end
    end
  end
end
