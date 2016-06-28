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

    $('ul').on('click', '.delete', function(event){
      var id = $(this).parent().data('postId');
      $(this).parent().remove();
      handlers.delete(id);
    });

}

function appendNewIdea(idea){
  $('ul').append('<li data-post-id="'+ idea.id + '">title:'+ idea.title + '|| body: ' + idea.body +' || quality: ' + idea.quality +'       <input type="button" class="delete" value="Delete"/></li>');
}


var views = {
  index: function(ideasResponse){
    for(var i = 0; i < ideasResponse.length; i++){
      var id = ideasResponse[i].id;
      var title = ideasResponse[i].title;
      var body = ideasResponse[i].body;
      var quality = ideasResponse[i].quality;
      $('ul').append('<li data-post-id="'+ id + '">title:'+title + '|| body: ' + body +' || quality: ' + quality +'  <input type="button" class="delete" value="Delete"/></li>');
    }
  }
};

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
      data: {id: id}
      // success: launchSequence()
    });
  }
};
