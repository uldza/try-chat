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

  has_many :channels, inverse_of: :user, dependent: :destroy
  has_many :messages, inverse_of: :user, dependent: :destroy

  validates :permission_group, inclusion: {in: PERMISSIONS, allow_blank: false}
  validates_presence_of :email

  before_validation :assign_permisions, unless: :permission_group?
  before_validation :assign_password, if: :guest?

  scope :guests, -> { where(permission_group: PERMISSION_GUEST) }

  def user?
    permission_group == User::PERMISSION_USER
  end

  def admin?
    permission_group == User::PERMISSION_ADMIN
  end

  def guest?
    permission_group == User::PERMISSION_GUEST
  end

  private
  def assign_permisions
    self.permission_group = User::PERMISSION_USER
  end

  def assign_password
    self.password = email
    self.password_confirmation = email
  end
end
