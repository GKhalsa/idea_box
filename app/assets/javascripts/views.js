var views = {
  index: function(ideasResponse){
    for(var i = 0; i < ideasResponse.length; i++){
      var id = ideasResponse[i].id;
      var title = ideasResponse[i].title;
      var body = ideasResponse[i].body;
      var quality = ideasResponse[i].quality;
      var tags = ideasResponse[i].tags.map(function(tag){return tag.name;});
      theAppender(id,title, body, quality, tags);
    }
  },
  reset: function(searchResponse){
    $('#ideaList').children().remove();
    this.index(searchResponse);
  },
  tags: function(tagResponse){
    tagResponse.forEach(function(tag){
      addTag(tag);
    });
  }
};
