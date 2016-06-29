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
  var id = idea.id;
  var title = idea.title;
  var body = idea.body;
  var quality = idea.quality;
  theAppender(id, title, body, quality);
  appendUpvoteDownvote();
}

function appendUpvoteDownvote(){
  var lastItem = $('#ideaList').children().last();
  var upvote = $('<button />').addClass('upvoteButton btn btn-secondary').text('thumbs up');
  var downvote = $('<button />').addClass('downvoteButton btn btn-secondary').text('thumbs down');
  var deleteButton = $('<button />').addClass('delete btn btn-secondary').text('Delete');
  upvote.appendTo(lastItem);
  downvote.appendTo(lastItem);
  deleteButton.appendTo(lastItem);
}

function theAppender(id, title, body, quality){
  $('#ideaList').append(
    '<li class="list-group-item" data-post-id="'+ id +'">'+
      '<div clas="row">'+
        '<div class="col-md-5">'+
          '<h2>' + title + '</h2>' +
          '<h5>' + body + '</h5>' +
        '</div>'+

        '<div class="col-md-3">'+
          '<h2>' + quality + '</h2>' +
        '</div>'+
        '<br/><br/><br/>'+
      '</div>'+
    '</li>'
  );
}


var views = {
  index: function(ideasResponse){
    for(var i = 0; i < ideasResponse.length; i++){
      var id = ideasResponse[i].id;
      var title = ideasResponse[i].title;
      var body = ideasResponse[i].body;
      var quality = ideasResponse[i].quality;
      theAppender(id,title, body, quality);
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
