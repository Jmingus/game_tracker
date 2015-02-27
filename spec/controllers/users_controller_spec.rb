require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")

  }
  describe "POST #create" do
    context "with valid params" do
      it "creates a new User" do
        expect {
          post :create, {:user => valid_attributes}, valid_session
        }.to change(User, :count).by(1)
      end
    end
  end
end
