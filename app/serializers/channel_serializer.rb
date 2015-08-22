class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :name, :deletable

  has_one :user
  has_many :messages
end
