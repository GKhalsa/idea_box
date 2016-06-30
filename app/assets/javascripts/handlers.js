var handlers = {
  create: function(title, body, tags){
    $.ajax({
      dataType: 'json',
      method: 'POST',
      url: '/api/v1/ideas',
      data: {idea:{title: title, body: body, tags: tags}},
      success: function(newIdea){
        appendNewIdea(newIdea, tags);
      }
    });
  },
  delete: function(id){
    $.ajax({
      dataType: 'json',
      method: 'DELETE',
      url: '/api/v1/ideas/' + id,
      data: {id: id},
      success: removeIdea(id)
    });
  },
  patch: function(id, quality){
    $.ajax({
      dataType: 'json',
      method: 'PATCH',
      url: '/api/v1/ideas/' + id,
      data: {id: id, quality: quality},
      success: upvoteDom(id)
    });
  },
  downvote: function(id, quality){
    $.ajax({
      dataType: 'json',
      method: 'PATCH',
      url: '/api/v1/ideas/' + id,
      data: {id: id, quality: quality},
      success: downvoteDom(id)
    });
  },
  editIdea: function(id, content, value){
    $.ajax({
      method: 'PATCH',
      url: '/api/v1/edit/' + id,
      data: content + '=' + value
    });
  },
  getTags: function(){
    $.getJSON('/api/v1/tags').then(
      function(tagResponse){
        views.tags(tagResponse);
      });
  }
};
