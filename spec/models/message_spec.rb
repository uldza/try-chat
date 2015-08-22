require 'rails_helper'

describe Message do
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
end
