(function(){
  'use strict';
  // model
  var CatMaker = function(id, name, url) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.number = 0;
  };

  var cats = [];
  cats.push(new CatMaker(0, 'cat_1', 'images/cat_1.jpg'));
  cats.push(new CatMaker(1, 'cat_2', 'images/cat_2.jpg'));
  cats.push(new CatMaker(2, 'cat_3', 'images/cat_3.jpg'));
  cats.push(new CatMaker(3, 'cat_4', 'images/cat_4.jpg'));
  cats.push(new CatMaker(4, 'cat_5', 'images/cat_5.jpg'));
  cats.push(new CatMaker(5, 'cat_6', 'images/cat_6.jpg'));

  // octopus
  var octopus = {
    init: function() {
      this.currentCat = cats[0] || null;
      view.init();
    },

    changeCat: function(catId) {
      if(this.currentCat.id != catId) {
        this.currentCat = cats[catId];
        view.renderContainer();
      }
    },

    getCurrentCat: function() {
      return this.currentCat;
    },

    increaseClickNumber: function() {
      this.currentCat.number++;
      view.renderClickNumber();
    }
  };

  // view
  var view = {

    init : function() {
      this.initCatsList();
      this.initCatContainer();
    },

    initCatsList: function() {
      this.catItemTemplate = $('script[data-template="catItem"]').html();
      this.$catsList = $('.catsList');
      console.log(this.$catsList);
      for(var i = 0; i < cats.length; i++) {
        var catItem = this.catItemTemplate;
        catItem = catItem.replace(/{{id}}/g, i).replace(/{{url}}/g, cats[i].url).replace(/{{name}}/g, cats[i].name);
        this.$catsList.append(catItem);
      }
      this.$catsList.on('click', '.catBtn', function(e) {
        e.preventDefault();
        var $this = $(this);
        var catId = $this.parent().data().id;
        octopus.changeCat(catId);
      });

    },

    initCatContainer : function() {
      this.$catContainer = $('.catContainer');
      this.$catContainer.on('click', '.catImg', function(e) {
        octopus.increaseClickNumber();
      });
      this.renderContainer();
    },

    renderContainer: function() {
      var curCat = octopus.getCurrentCat();
      var $catContainer = this.$catContainer;
      $catContainer.attr('data-id', curCat.id);
      $catContainer.find('.catName').text(curCat.name);
      $catContainer.find('.catImg').attr('src', curCat.url);
      // $catContainer.find('.clickNumber').text(curCat.number);
      this.renderClickNumber();
    },

    renderClickNumber: function() {
      var curCat = octopus.getCurrentCat();
      var $catContainer = this.$catContainer;
      $catContainer.find('.clickNumber').text(curCat.number);
    }


  };


  octopus.init();


})();
