require 'rails_helper'

describe MessageSerializer, type: :class do
  let(:user) { create(:user, email: 'john@example.com') }
  let(:channel) { create(:channel, name: 'General chat', deletable: true, user: user) }
  let(:message) { create(:message, text: 'Hi dude!', user: user, channel: channel) }

  subject { described_class.new message }

  before do
    @parsed = JSON.parse(subject.to_json)
  end

  it 'creates JSON with required fields' do
    expect(@parsed.keys).to eq(%w(id text channel_id user))
  end

  it 'has correct values' do
    user_hash = {
      'id'                => user.id,
      'email'             => 'john@example.com',
      'permission_group'  => User::PERMISSION_USER
    }

    expect(@parsed).to match({
      'id'                => message.id,
      'channel_id'        => channel.id,
      'text'              => 'Hi dude!',
      'user'              => user_hash
    })
  end
end
