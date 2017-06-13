(function(){
  'use strict';
  var catContainers = document.querySelectorAll('.catContainer');
  var counterScore = document.querySelector('.score');
  var catNames = ['cat_1', 'cat_2'];

  var addCounter = function() {
    var score = parseInt(counterScore.textContent)||0;
    score += 1;
    counterScore.textContent=score;
  };
  for(var i = 0; i < catContainers.length; i++) {
    var cat = catContainers[i];
    cat.querySelector('.catName').textContent = catNames[i];
    // var catImg = cat.querySelector('.catImg');
    cat.addEventListener('click', addCounter);
  }

})();
