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

function appendUpvoteDownvote(){
  var firstItem = $('#ideaList').children().first();
  var upvote = $('<button />').addClass('upvoteButton btn btn-secondary').text('thumbs up');
  var downvote = $('<button />').addClass('downvoteButton btn btn-secondary').text('thumbs down');
  var deleteButton = $('<button />').addClass('delete btn btn-secondary').text('Delete');
  upvote.appendTo(firstItem);
  downvote.appendTo(firstItem);
  deleteButton.appendTo(firstItem);
}
