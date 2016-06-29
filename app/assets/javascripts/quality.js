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
