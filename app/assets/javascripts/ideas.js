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
      var id = $(this).parent().data('postId');
      var quality = $('#quality-' + id).children().find('span').text();
      var nextQuality =  upvoteStatus(quality);
      handlers.patch(id, nextQuality);
    });

    $('#ideaList').on('click', '.downvoteButton', function(){
      var id = $(this).parent().data('postId');
      var quality = $('#quality-' + id).children().find('span').text();
      var nextQuality =  downvoteStatus(quality);
      handlers.downvote(id, nextQuality);
    });

    $('#ideaList').on('click', '.title', function(){
      $(this).attr('contenteditable', true);
    });

    $('#ideaList').on('blur', '.title', function(){
      var id = $(this).data('titleId');
      var newTitle = $(this).html();
      var content = 'title';
      handlers.editIdea(id, content, newTitle);
    });

    $('#ideaList').on('click', '.body', function(){
      $(this).attr('contenteditable', true);
    });

    $('#ideaList').on('blur', '.body', function(){
      var id = $(this).data('bodyId');
      var newBody = $(this).html();
      var content = 'body';
      handlers.editIdea(id, content, newBody);
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
          '<h2>' + '<div class=title data-title-id="'+ id +'">' +  title  +'</div>'+  '</h2>' +
          '<h5>' + '<div class=body data-body-id="'+ id +'">' +  body +  '</div>'+ '</h5>' +
        '</div>'+

        '<div class="col-md-3" id=quality-'+id+'>'+
          '<h2>' +
            '<span>' + quality + '</span>' +
          '</h2>' +
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

function upvoteStatus(currentQuality){
  var statuses = {swill: 'plausible', plausible: 'genius', genius: 'genius' };
  return statuses[currentQuality];
}

function downvoteStatus(currentQuality){
  var statuses = {genius: 'plausible', plausible: 'swill', swill: 'swill'};
  return statuses[currentQuality];
}

function upvoteDom(id){
  var currentQuality = $('#quality-' + id).children().find('span').text();
  var nextQuality = upvoteStatus(currentQuality);
  $('#quality-' + id).children().find('span').text(nextQuality);
}

function downvoteDom(id){
  var currentQuality = $('#quality-' + id).children().find('span').text();
  var nextQuality = downvoteStatus(currentQuality);
  $('#quality-' + id).children().find('span').text(nextQuality);
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
  }
};
