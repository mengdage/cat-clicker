(function(){
  'use strict';
  // Cat class
  var initialCats = [
    {
      id: 0,
      name: 'cat_1',
      src: 'images/cat_1.jpg',
      clickCount: 0,
      nickNames: [ 'nn1', 'nn2', 'nn3', 'nn4' ]
    },
    {
      id: 1,
      name: 'cat_2',
      src: 'images/cat_2.jpg',
      clickCount: 0,
      nickNames: [ 'nna1', 'nna2', 'nna3', 'nna4' ]
    },
    {
      id: 2,
      name: 'cat_3',
      src: 'images/cat_3.jpg',
      clickCount: 0,
      nickNames: [ 'nnb1', 'nnb2', 'nnb3', 'nnb4' ]
    },
    {
      id: 3,
      name: 'cat_4',
      src: 'images/cat_4.jpg',
      clickCount: 0,
      nickNames: [ 'nnc1', 'nnc2', 'nnc3', 'nnc4' ]
    },
    {
      id: 4,
      name: 'cat_5',
      src: 'images/cat_5.jpg',
      clickCount: 0,
      nickNames: [ 'nnd1', 'nnd2', 'nnd3', 'nnd4' ]
    },
    {
      id: 5,
      name: 'cat_6',
      src: 'images/cat_6.jpg',
      clickCount: 0,
      nickNames: [ 'nne1', 'nne2', 'nne3', 'nne4' ]
    }
  ];
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
    // make cat list
    self.catList = ko.observableArray([]);
    initialCats.forEach(function(cat){
      self.catList.push(new Cat(cat));
    });

    // set the currentCat to the first cat
    self.currentCat = ko.observable(self.catList()[0]);
    // increase the clickCount
    self.increaseCount = function() {
      self.currentCat().increaseCount();
    };
    // change the currentCat
    self.changeCurrentCat = function(cat) {
      self.currentCat(cat);
    };

  };

  ko.applyBindings(new ViewModel());




})();
