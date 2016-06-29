class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)

  def self.filter_by_query(query)
    downcase_query = query
    Idea.where('title LIKE ? OR body LIKE ?', "%#{downcase_query}%","%#{downcase_query}%")
  end
end
