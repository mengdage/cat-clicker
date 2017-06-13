(function(){
  'use strict';
  var catImg = document.querySelector('.catImg');
  var counterScore = document.querySelector('.score');
  catImg.addEventListener('click', function(e) {
    var score = parseInt(counterScore.textContent);
    score += 1;
    counterScore.textContent=score;
  });

})();
