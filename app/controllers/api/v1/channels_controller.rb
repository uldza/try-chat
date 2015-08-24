module Api
  module V1
    class ChannelsController < BaseController
      private
      def attributes
        {
          user: current_user,
          name: params[:channel],
        }
      end

    end
  end
end
