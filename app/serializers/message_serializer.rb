class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :channel_id

  has_one :user
end
