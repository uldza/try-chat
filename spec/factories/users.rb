FactoryGirl.define do
  factory :users, class: User do
    trait :user_basic do
      email
      password              'password'
      password_confirmation 'password'
    end

    factory :user do
      user_basic
      permission_group User::PERMISSION_USER
    end

    factory :admin do
      user_basic
      permission_group User::PERMISSION_ADMIN
    end

    factory :guest do
      user_basic
      permission_group User::PERMISSION_GUEST
    end
  end
end
