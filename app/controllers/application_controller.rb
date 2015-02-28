class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  skip_before_filter :verify_authenticity_token
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_filter :authenticate_user!


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :user_name << :zipcode << :city
  end
end
