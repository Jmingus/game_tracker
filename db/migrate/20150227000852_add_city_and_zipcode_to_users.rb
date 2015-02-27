class AddCityAndZipcodeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :city, :string, null: false
    add_column :users, :zipcode, :string, null: false
    add_column :users, :exp_level, :integer, default: 1
  end
end
