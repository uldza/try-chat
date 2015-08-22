require 'rails_helper'

describe Api::V1::BaseController do
  before do
    sign_in_as_admin
  end

  after do
    Rails.application.reload_routes!
  end

  describe '#render_401' do
    it 'returns empty body with 401 status code' do
      routes.draw { get 'render_401' => 'api/v1/base#render_401' }
      get :render_401

      expect(response.body).to eq('')
      expect(response.status).to eq(401)
    end
  end

  describe '#render_403' do
    it 'returns empty body with 403 status code' do
      routes.draw { get 'render_403' => 'api/v1/base#render_403' }
      get :render_403

      expect(response.body).to eq('')
      expect(response.status).to eq(403)
    end
  end

  describe '#render_404' do
    it 'returns empty body with 404 status code' do
      routes.draw { get 'render_404' => 'api/v1/base#render_404' }
      get :render_404

      expect(response.body).to eq('')
      expect(response.status).to eq(404)
    end
  end


  describe "#publish" do
    it "publishes given message to given redis channel" do
      expect(Redis).to receive_message_chain('new.publish').with('chan', 'Test message')
      controller.send(:publish, 'chan', 'Test message')
    end
  end
end
