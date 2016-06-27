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
    });
}

var views = {
  index: function(ideasResponse){
    for(var i = 0; i < ideasResponse.length; i++){
      var title = ideasResponse[i].title;
      var body = ideasResponse[i].body;
      var quality = ideasResponse[i].quality;
      $('ul').append('<li>title:'+title + '|| body: ' + body +' || quality: ' + quality +'</li>');
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
        $('ul').append('<li>title:'+newIdea.title + '|| body: ' + newIdea.body +' || quality: ' + newIdea.quality +'</li>');
      }
    });
  }
};
