require 'rails_helper'

RSpec.describe "testers/index", type: :view do
  before(:each) do
    assign(:testers, [
      Tester.create!(),
      Tester.create!()
    ])
  end

  it "renders a list of testers" do
    render
  end
end
