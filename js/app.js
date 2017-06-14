(function(){
  'use strict';
  // Cat class
  var Cat = function(data) {
    var self = this;
    self.clickCount = ko.observable(data.clickCount);
    self.name = ko.observable(data.name);
    self.src = ko.observable(data.src);
    self.nickNames = ko.observableArray(data.nickNames);

    self.increaseCount = function() {
      self.clickCount(self.clickCount()+1);
    };

    self.title = ko.computed(function() {
      var title;
      var clicks = self.clickCount();
      if(clicks < 10) {
        title = 'Newborn';
      } else if(clicks < 50) {
        title = 'Infant';
      } else if(clicks < 100) {
        title = 'Child';
      } else if(clicks < 200) {
        title = 'Teen';
      } else if(clicks < 500) {
        title = 'Adult';
      } else {
        title = 'TOO MANY!';
      }
      return title;
    });
  };

  var ViewModel = function() {
    var self = this;
    self.currentCat = ko.observable(new Cat({
      name: 'cat1',
      clickCount: 0,
      src: 'images/cat_1.jpg',
      nickNames: [
        'nn1',
        'nn2',
        'nn3',
        'nn4'
      ]
    }));
    self.increaseCount = function() {
      self.currentCat().increaseCount();
    };
  };

  ko.applyBindings(new ViewModel());




})();
