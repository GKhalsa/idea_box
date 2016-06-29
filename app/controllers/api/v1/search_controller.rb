class Api::V1::SearchController < Api::ApiController

  def index
    query = params[:query][1..-2]
    respond_with Idea.filter_by_query(query), location: nil
  end

end
