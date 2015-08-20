class SocketsController < ApplicationController
  include Tubesock::Hijack

  def message
    hijack do |tubesock|

      redis_thread = Thread.new do
        Redis.new.subscribe "chat" do |on|
          on.message do |channel, msg|
            tubesock.send_data msg
          end
        end
      end

      tubesock.onmessage do |msg|
        Redis.new.publish "chat", msg
      end

      tubesock.onclose do
        redis_thread.kill
      end

    end
  end
end
