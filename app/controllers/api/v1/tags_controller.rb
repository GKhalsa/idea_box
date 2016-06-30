class Api::V1::TagsController < Api::ApiController

  def index
    respond_with Tag.pluck(:name).uniq
  end

end
