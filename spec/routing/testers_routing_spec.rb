require "rails_helper"

RSpec.describe TestersController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/testers").to route_to("testers#index")
    end

    it "routes to #new" do
      expect(:get => "/testers/new").to route_to("testers#new")
    end

    it "routes to #show" do
      expect(:get => "/testers/1").to route_to("testers#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/testers/1/edit").to route_to("testers#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/testers").to route_to("testers#create")
    end

    it "routes to #update" do
      expect(:put => "/testers/1").to route_to("testers#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/testers/1").to route_to("testers#destroy", :id => "1")
    end

  end
end
