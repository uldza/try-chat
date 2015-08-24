require 'rails_helper'

describe Message do
  let(:user) { create(:user) }
  let(:message) { create(:message, user: user) }
  let(:message_2) { create(:message, user: user) }
  let(:message_3) { create(:message, user: user, channel: message_2.channel) }

  it_behaves_like "association includer", :belongs_to, :user
  it_behaves_like "association includer", :belongs_to, :channel

  describe "validations" do
    before do
      subject.valid?
    end

    it { expect(subject.errors[:text].size).to eq(1) }
    it { expect(subject.errors[:user].size).to eq(1) }
    it { expect(subject.errors[:channel].size).to eq(1) }
  end

  describe ".scopes" do
    describe ".for_channel" do
      it "returns messages for given channel" do
        message
        message_2
        message_3
        resources = Message.for_channel( message_2.channel )
        expect( resources ).not_to include( message )
        expect( resources ).to include( message_2, message_3 )
      end
    end
  end
end
