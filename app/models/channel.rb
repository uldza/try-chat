class NotDeletableError < StandardError; end

class Channel < ActiveRecord::Base
  validates_presence_of :name, :user

  belongs_to :user
  has_many :messages, -> { order(:created_at) }, inverse_of: :channel, dependent: :destroy

  def destroy
    raise NotDeletableError unless deletable?
    super
  end
end
