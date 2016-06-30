class Api::V1::SearchController < Api::ApiController

  def index
    query = params[:query][1..-2]
    respond_with Idea.filter_by_query(query).includes(:tags).to_json(:include => :tags), location: nil
  end

end
