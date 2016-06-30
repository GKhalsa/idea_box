class Api::V1::IdeasController < Api::ApiController

  def index
    respond_with Idea.all.includes(:tags).to_json(:include => :tags)
  end

  def create
    idea = Idea.create(idea_params)
    idea.add_tags(params[:idea][:tags])

    respond_with idea, location: nil
  end

  def destroy
    idea = Idea.find(params[:id])
    idea.tags.destroy_all
    respond_with :api, :v1, Idea.destroy(params[:id]), location: nil
  end

  def update
    respond_with Idea.find(params[:id]).update(quality: params[:quality])
  end

  private

    def idea_params
      params.require("idea").permit(:title, :body)
    end

end
