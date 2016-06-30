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
    var tags = $('#ideaTags').val();
    handlers.create(title, body, tags);
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

  $('#searchBar').on('keyup', function(){
    var theSearch = $(this).val();
    searchedIdeas(theSearch);
  });

}
