module Helpers
  # auth helpers for controller tests
  def sign_in_as_user
    sign_in :user, FactoryGirl.create(:user)
  end

  def sign_in_as_admin
    sign_in :user, FactoryGirl.create(:admin)
  end

  def sign_in_as_guest
    sign_in :user, FactoryGirl.create(:guest)
  end
end
