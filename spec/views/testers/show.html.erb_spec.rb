require 'rails_helper'

RSpec.describe "testers/show", type: :view do
  before(:each) do
    @tester = assign(:tester, Tester.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
