class AddAttachmentBoardImageToCollections < ActiveRecord::Migration
  def self.up
    change_table :collections do |t|
      t.attachment :board_image
    end
  end

  def self.down
    remove_attachment :collections, :board_image
  end
end
