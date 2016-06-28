class Api::V1::IdeasController < Api::ApiController

  def index
    respond_with Idea.all
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def destroy
    respond_with :api, :v1, Idea.destroy(params[:id]), location: nil
  end

  def update
    respond_with Idea.find(params[:id]).update(quality: 0)
  end

  private

    def idea_params
      params.require("idea").permit(:title, :body)
    end

end
