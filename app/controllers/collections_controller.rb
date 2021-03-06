class CollectionsController < ApplicationController
  before_action :set_collection, only: [:destroy]

  def index
    @user = User.find(params[:user_id])
    @collections = @user.collections
    render json: @collections.to_json
  end

  def show
  end

  def create
    @user = User.find(params[:user_id])
    @collection = @user.collections.create(collection_params)
    @collection.user_id = current_user.id
    if @collection.save!
      render json: @collection.to_json, notice: 'Collection Item Saved'
    else
      render json: @collection.to_json, notice: 'Errors are afoot in the create method'
    end
  end

  def destroy
    if @collection.destroy!
      render json: @collection.to_json, notice: 'Collection Item Destroy'
    else
      render json: @collection.to_json, notice: 'Errors are afoot in the destroy method'
    end
  end

  private

# Use strong_parameters for attribute whitelisting
# Be sure to update your create() and update() controller methods.

  def set_collection
    @collection = Collection.find(params[:id])
  rescue StandardError => e
    render json: { message: e.message, status: 404 }.to_json, status: 404
  end

  def collection_params
    params.require(:collection).permit(:image,
                                       :favorite,
                                       :board_name,
                                       :min_player,
                                       :max_player,
                                       :playtime,
                                       :published,
                                       :up_for_trade,
                                       :description
    )
  end
end
