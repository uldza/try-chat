require 'rails_helper'

describe ChannelSerializer, type: :class do
  let(:user) { create(:admin, email: 'john@example.com') }
  let(:channel) { create(:channel, name: 'General chat', deletable: true, user: user) }

  subject { described_class.new channel }

  before do
    @parsed = JSON.parse(subject.to_json)
  end

  it 'creates JSON with required fields' do
    expect(@parsed.keys).to eq(%w(id name deletable user))
  end

  it 'has correct values' do
    user_hash = {
      'id'                => user.id,
      'email'             => 'john@example.com',
      'permission_group'  => User::PERMISSION_ADMIN
    }

    expect(@parsed).to match({
      'id'                => channel.id,
      'name'              => 'General chat',
      'deletable'         => true,
      'user'              => user_hash
    })
  end
end
