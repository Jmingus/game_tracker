class ChangeDataOptionsForCollections < ActiveRecord::Migration
  def change
    change_table :collections do |t|
      t.change :favorite, :boolean, default: false
      t.change :board_name, :string, default: 'No Board Name'
      t.change :min_player, :string, default: '1'
      t.change :max_player, :string, default: '4'
      t.change :playtime, :string , default: '60'
      t.change :published, :string, default: '1978'
      t.change :up_for_trade, :boolean, default: false
      t.change :comment, :string
    end
  end
end
