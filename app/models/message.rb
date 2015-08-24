class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :channel

  validates_presence_of :text, :user, :channel

  scope :for_channel, ->(chan) { where(channel_id: chan.id) }
end
