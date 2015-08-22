FactoryGirl.define do
  factory :channel do
    name "Some chat chan"
    association :user, factory: :user
  end

end
