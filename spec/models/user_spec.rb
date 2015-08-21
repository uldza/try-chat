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
end
