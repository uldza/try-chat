class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :name, :deletable

  has_one :user
end
