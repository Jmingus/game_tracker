class CollectionsController < ApplicationController
  before_action :set_collection, only: [:destroy]
  
  def create
    @collection = Collection.create( collection_params )
    if @collection.save
      redirect_to root_path, flash: { notice: 'Collection Item Saved'}
    else
      redirect_to root_path, flash: { notice: 'Collection Item has errors when creating, please inform Jacob'}
    end
  end

  def destroy
    if @collection.destroy
      redirect_to root_path, flash: { notice: 'Collection Item Destroyed'}
    else
      redirect_to root_path, flash: { notice: 'Collection Item has errors when destroying, please inform Jacob'}
    end
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
