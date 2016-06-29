class Api::V1::EditController < Api::ApiController

  def update
    idea = Idea.find(params[:id])
    respond_with params[:title] ? idea.update(title: params[:title]) : idea.update(body: params[:body]), location: nil
  end

end
