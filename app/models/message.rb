class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :channel

  validates_presence_of :text, :user, :channel

  scope :for_channel, ->(chan_id) { where(channel_id: chan_id) }
end
