class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :channel_id, :created_at

  has_one :user

  def created_at
    object.created_at.strftime('%Y-%m-%d %H:%M')
  end
end
