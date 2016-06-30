class Idea < ActiveRecord::Base
  has_many :tags
  enum quality: %w(swill plausible genius)

  def self.filter_by_query(query)
    downcase_query = query.downcase
    Idea.where('LOWER(title) LIKE ? OR LOWER(body) LIKE ?', "%#{downcase_query}%","%#{downcase_query}%")
  end

  def add_tags(tags)
    tags.split(",").uniq.each { |tag| self.tags.create(name: tag)}
  end
end
