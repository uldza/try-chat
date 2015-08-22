require 'rails_helper'

describe UserSerializer, type: :class do
  let(:user) { FactoryGirl.create(:user, email: 'john@example.com') }

  subject { described_class.new user }

  before do
    @parsed = JSON.parse(subject.to_json)
  end

  it 'creates JSON with required fields' do
    expect(@parsed.keys).to eq(%w(id email permission_group))
  end

  it 'has correct values' do
    expect(@parsed).to match({
      'id'                => user.id,
      'email'             => 'john@example.com',
      'permission_group'  => User::PERMISSION_USER
    })
  end
end
