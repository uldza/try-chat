require 'rails_helper'

describe User do
  let(:user) { FactoryGirl.create(:user) }

  describe "validations" do
    before do
      subject.valid?
    end

    it { expect(subject.errors[:email].size).to eq(2) }
    it { expect(subject.errors[:password].size).to eq(1) }
    it { expect(subject.errors[:permission_group].size).to eq(1) }

  end

  users = %w(admin user guest)
  users.each do |user_by_type|
    describe "##{user_by_type}?" do
      before do
        @correct_user = build(user_by_type)
        @incorrect_user = build('user')
        @incorrect_user = build('admin') if user_by_type == 'user'
      end

      context "when user is #{user_by_type}" do
        it { expect(@correct_user.send("#{user_by_type}?")).to be_truthy }
      end

      context "when user is not #{user_by_type}" do
        it { expect(@incorrect_user.send("#{user_by_type}?")).to be_falsey }
      end
    end
  end
end
