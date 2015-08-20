class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :recoverable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable, :validatable

  PERMISSIONS = [
    PERMISSION_ADMIN = 'admin',
    PERMISSION_USER = 'user',
    PERMISSION_GUEST = 'guest',
  ]

  #has_many :channels, inverse_of: :user, dependent: :destroy
  #has_many :messages, through: :channels, dependent: :destroy

  validates :permission_group, inclusion: {in: PERMISSIONS, allow_blank: false}
  validates_presence_of :email
end
