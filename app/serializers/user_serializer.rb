class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :permission_group
end
