require 'rails_helper'

RSpec.describe "testers/edit", type: :view do
  before(:each) do
    @tester = assign(:tester, Tester.create!())
  end

  it "renders the edit tester form" do
    render

    assert_select "form[action=?][method=?]", tester_path(@tester), "post" do
    end
  end
end
