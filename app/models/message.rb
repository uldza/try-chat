class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :channel

  validates_presence_of :text, :user, :channel
end
