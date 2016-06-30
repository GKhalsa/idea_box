function appendNewIdea(idea, tags){
  var id = idea.id;
  var title = idea.title;
  var body = idea.body;
  var quality = idea.quality;
  var sanitized_tags = findUnique(tags.split(","));
  theAppender(id, title, body, quality, sanitized_tags);
  views.tags(sanitized_tags);
}

function theAppender(id, title, body, quality, tags){
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
  appendUpvoteDownvote();
  if (tags[0].length !== 0) appendTags(tags);
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

function findUnique(duplicatesArray){
  var uniqueArray = duplicatesArray.filter(function(elem, pos, arr) {
    return arr.indexOf(elem) == pos;
  });
  return uniqueArray;
}

function addTagButton(tag){
  return $('<button />').addClass('tagButton btn btn-info').text(tag);
}

function addTag(tag){
  if (tagExists(tag) && tagNotAlreadyThere(tag)) $("#searchBox").append(addTagButton(tag));
}

function tagExists(tag){
  return tag.length !== 0;
}

function tagNotAlreadyThere(tag){
  return $("#searchBox").find("button:contains("+tag+")").length === 0;
}

function appendTags(tags){
  var firstItem = $('#ideaList').children().first();
  tags.forEach(function(tag){
    $('<button />').addClass('tagButton btn btn-info').text(tag).appendTo(firstItem);
  });
}

function removeIdea(id){
  $('[data-post-id='+ id + ']').remove();
}
