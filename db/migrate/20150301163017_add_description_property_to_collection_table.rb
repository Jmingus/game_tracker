class AddDescriptionPropertyToCollectionTable < ActiveRecord::Migration
  def change
    add_column :collections, :description, :string, default: '`Tis a Board Game!'
  end
end
