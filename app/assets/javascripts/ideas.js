$(document).ready(launchSequence);

function launchSequence(){
  $.getJSON('/api/v1/ideas').then(
    function(ideasResponse){
      views.index(ideasResponse);
    });

    $( "#submitButton" ).click(function(event){
      event.preventDefault();
      var title = $('#ideaTitle').val();
      var body = $('#ideaBody').val();
      handlers.create(title, body);
      $('#ideaForm')[0].reset();
    });

    $('#ideaList').on('click', '.delete', function(event){
      var id = $(this).parent().data('postId');
      handlers.delete(id);
    });

    $('#ideaList').on('click', '.upvoteButton',function(){
      // debugger;
      var id = $(this).parent().data('postId');
      handlers.patch(id);

    });

}

function appendNewIdea(idea){
  var listItem = $('#ideaList').append('<div data-post-id="'+ idea.id +
   '">title:'+ idea.title + '|| body: ' + idea.body +' || quality: ' +
    idea.quality +'       <input type="button" class="delete" value="Delete"/></div>');
    appendUpvoteDownvote();
}

function appendUpvoteDownvote(){
  var lastItem = $('#ideaList').children().last();
  var upvote = $('<button />').addClass('upvoteButton').text('thumbs up');
  var downvote = $('<button />').addClass('downvoteButton').text('thumbs down');
  upvote.appendTo(lastItem);
  downvote.appendTo(lastItem);
}


var views = {
  index: function(ideasResponse){
    for(var i = 0; i < ideasResponse.length; i++){
      var id = ideasResponse[i].id;
      var title = ideasResponse[i].title;
      var body = ideasResponse[i].body;
      var quality = ideasResponse[i].quality;
      var listItem = $('#ideaList').append('<div data-post-id="'+ id +
       '">title:'+title + '|| body: ' + body +' || quality: ' + quality +
       '  <input type="button" class="delete" value="Delete"/></div>');
      appendUpvoteDownvote();
    }
  }
};

function removeIdea(id){
  $('[data-post-id='+ id + ']').remove();
}

function changeSuccess(id){
  debugger;
  $('[data-post-id='+ id + ']').load(document.URL + ' [data-post-id='+ id + ']');
}

var handlers = {
  create: function(title, body){
    $.ajax({
      dataType: 'json',
      method: 'POST',
      url: '/api/v1/ideas',
      data: {idea:{title: title, body: body}},
      success: function(newIdea){
        appendNewIdea(newIdea);
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
  patch: function(id){
    $.ajax({
      dataType: 'json',
      method: 'PATCH',
      url: '/api/v1/ideas/' + id,
      data: {id: id},
      success: changeSuccess(id)
    });
  }
};
