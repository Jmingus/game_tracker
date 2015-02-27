class WantsController < ApplicationController
  before_action :set_want, only: [:destroy]

  def create
    @want = Want.create( want_params )
    if @want.save
      redirect_to root_path, flash: { notice: 'Wishlist Item Saved'}
    else
      redirect_to root_path, flash: { notice: 'Wishlist Item has errors when creating, please inform Jacob'}
    end
  end

  def destroy
    if @want.destroy
      redirect_to root_path, flash: { notice: 'Wishlist Item Destroyed'}
    else
      redirect_to root_path, flash: { notice: 'Wishlist Item has errors when destroying, please inform Jacob'}
    end
  end

  private

# Use strong_parameters for attribute whitelisting
# Be sure to update your create() and update() controller methods.

  def set_want
    @want = Want.find(params[:id])
  end

  def collection_params
    params.require(:want).permit(:board_image,
                                       :favorite,
                                       :board_name,
                                       :min_player,
                                       :max_player,
                                       :playtime,
                                       :published,
                                       :comment)
  end
end
