class AddAttachmentBoardImageToWants < ActiveRecord::Migration
  def self.up
    change_table :wants do |t|
      t.attachment :board_image
    end
  end

  def self.down
    remove_attachment :wants, :board_image
  end
end
