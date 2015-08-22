FactoryGirl.define do
  factory :message do
    text "This is chat message"
    association :user, factory: :user
    association :channel, factory: :channel
  end

end
