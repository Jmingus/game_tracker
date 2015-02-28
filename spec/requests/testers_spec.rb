require 'rails_helper'

RSpec.describe "Testers", type: :request do
  describe "GET /testers" do
    it "works! (now write some real specs)" do
      get testers_path
      expect(response).to have_http_status(200)
    end
  end
end
