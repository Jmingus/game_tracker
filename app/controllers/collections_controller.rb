class CollectionsController < ApplicationController
  before_action :set_collection, only: [:destroy]

  def create
    @user = User.find(params[:user_id])
    @collection = @user.collections.create(collection_params)
    @collection.user_id = current_user.id
    @collection.save
  end

  def destroy
    @collection.destroy
  end

  private

# Use strong_parameters for attribute whitelisting
# Be sure to update your create() and update() controller methods.

  def set_collection
    @collection = Collection.find(params[:id])
  end

  def collection_params
    params.require(:collection).permit(:board_image,
                                       :favorite,
                                       :board_name,
                                       :min_player,
                                       :max_player,
                                       :playtime,
                                       :published,
                                       :up_for_trade,
                                       :comment)
  end
end
