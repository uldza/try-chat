require 'rails_helper'

describe User do
  it_behaves_like "association includer", :has_many, :channels
  it_behaves_like "association includer", :has_many, :messages

  describe "validations" do
    before do
      subject.valid?
    end

    it { expect(subject.errors[:email].size).to eq(2) }
    it { expect(subject.errors[:password].size).to eq(1) }

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

  describe ".scopes" do
    describe ".guests" do
      before do
        @user_1 = create(:user, permission_group: User::PERMISSION_USER)
        @user_2 = create(:user, permission_group: User::PERMISSION_GUEST)
        @user_3 = create(:user, permission_group: User::PERMISSION_GUEST)
        @user_4 = create(:user, permission_group: User::PERMISSION_ADMIN)
      end
      it "returns guest users only" do
        expect(User.guests).to match_array([@user_2, @user_3])
      end
    end
  end

  describe "#assign_permisions" do
    let(:user) { build(:user, permission_group: nil) }
    it "is called before validation" do
      expect(user).to receive(:assign_permisions)
      user.valid?
    end

    it "is not called when user have permistion group" do
      user.permission_group = User::PERMISSION_GUEST
      expect(user).not_to receive(:assign_permisions)
      user.valid?
    end

    context "when saving user without permistion_group" do
      it "assigns user permistion group" do
        expect{user.valid?}.to change{user.permission_group}.from(nil).to(User::PERMISSION_USER)
      end
    end
  end

  describe "#assign_password" do
    let(:user) { build(:user, permission_group: User::PERMISSION_USER) }
    let(:guest) { build(:user, email: 'example@example.com', permission_group: User::PERMISSION_GUEST) }

    it "is called before validation" do
      expect(guest).to receive(:assign_password)
      guest.valid?
    end

    it "is not called for user" do
      expect(user).not_to receive(:assign_password)
      user.valid?
    end

    context "when saving guest user" do
      it "assigns guest password same as email" do
        expect(guest).to receive('password=').with('example@example.com')
        expect(guest).to receive('password_confirmation=').with('example@example.com')
        guest.valid?
      end
    end
  end
end
