class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.boolean :favorite, default: false
      t.string :board_name, null: false
      t.integer :min_player, null: false, default: 1
      t.integer :max_player, null: false
      t.integer :playtime, null: false
      t.date :published, null: false
      t.boolean :up_for_trade, default: false
      t.string :comment
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :collections, :users
  end
end
