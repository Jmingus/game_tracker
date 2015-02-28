require 'rails_helper'

RSpec.describe "testers/new", type: :view do
  before(:each) do
    assign(:tester, Tester.new())
  end

  it "renders new tester form" do
    render

    assert_select "form[action=?][method=?]", testers_path, "post" do
    end
  end
end
