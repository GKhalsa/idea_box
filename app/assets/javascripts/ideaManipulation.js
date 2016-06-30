function appendNewIdea(idea, tags){
  var id = idea.id;
  var title = idea.title;
  var body = idea.body;
  var quality = idea.quality;
  theAppender(id, title, body, quality);
  appendUpvoteDownvote();
  appendTags(tags);
}

function theAppender(id, title, body, quality){
  $('#ideaList').prepend(
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

function appendUpvoteDownvote(){
  var firstItem = $('#ideaList').children().first();
  var upvote = $('<button />').addClass('upvoteButton btn btn-secondary').text('thumbs up');
  var downvote = $('<button />').addClass('downvoteButton btn btn-secondary').text('thumbs down');
  var deleteButton = $('<button />').addClass('delete btn btn-secondary').text('Delete');
  upvote.appendTo(firstItem);
  downvote.appendTo(firstItem);
  deleteButton.appendTo(firstItem);
}

function appendTags(tags){
  var firstItem = $('#ideaList').children().first();
  var tag = $('<button />').addClass('tagButton btn btn-secondary').text(tags.split(",")[0]);
  tag.appendTo(firstItem);
}

function removeIdea(id){
  $('[data-post-id='+ id + ']').remove();
}
