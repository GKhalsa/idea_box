function searchResult(searchResponse){
  views.reset(searchResponse);
}

function searchedIdeas(query){
  var ideas = $.getJSON('/api/v1/search/?query=' + JSON.stringify(query)).then(searchResult);
}
