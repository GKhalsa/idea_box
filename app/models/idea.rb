class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)

  def self.filter_by_query(query)
    downcase_query = query.downcase
    Idea.where('LOWER(title) LIKE ? OR LOWER(body) LIKE ?', "%#{downcase_query}%","%#{downcase_query}%")
  end
end
