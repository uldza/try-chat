require 'rails_helper'

describe Channel do
  let(:channel) { create(:channel) }

  it_behaves_like "association includer", :belongs_to, :user

  describe "validations" do
    before do
      subject.valid?
    end

    it { expect(subject.errors[:name].size).to eq(1) }
    it { expect(subject.errors[:user].size).to eq(1) }
  end


  describe "#destroy" do
    context "when channel is deletable" do
      it "will be destroyed" do
        channel
        expect{channel.destroy}.to change{Channel.count}.from(1).to(0)
      end
    end

    context "when channel is not deletable" do
      it "raises NotDeletableError" do
        channel.update_attribute(:deletable, false)
        expect{channel.destroy}.to raise_error( NotDeletableError )
      end
    end
  end
end
