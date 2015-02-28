class CreateTesters < ActiveRecord::Migration
  def change
    create_table :testers do |t|
      t.boolean :favorite
      t.string :board_name
      t.integer :min_player
      t.integer :max_player
      t.integer :playtime
      t.date :published
      t.boolean :up_for_trade
      t.string :comment
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :testers, :users
  end
end
