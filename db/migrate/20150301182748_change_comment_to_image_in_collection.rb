class ChangeCommentToImageInCollection < ActiveRecord::Migration
  def change
     rename_column :collections, :comment, :image
  end
end
