class Collection < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :board_name
  validates_presence_of :board_name, :min_player, :max_player, :playtime, :published, :description
end
