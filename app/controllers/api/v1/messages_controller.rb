module Api
  module V1
    class MessagesController < BaseController
      before_filter :load_channel

      private
      def scoped_resources
        Message.for_channel( @channel )
      end

      def load_channel
        @channel = Channel.find(params[:channel_id])
        @channel = Channel.first unless @channel.present?
      end

      def attributes
        {
          user: current_user,
          channel: @cannel,
          text: params[:message]
        }
      end

      def serializer
        MessageSerializer
      end
    end
  end
end
