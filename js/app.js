(function(){
  'use strict';
  // model
  var model = {
    currentCat: null,
    cats: [
      {
        id: 0,
        name: 'cat_1',
        url: 'images/cat_1.jpg',
        number: 0
      },
      {
        id: 1,
        name: 'cat_2',
        url: 'images/cat_2.jpg',
        number: 0
      },
      {
        id: 2,
        name: 'cat_3',
        url: 'images/cat_3.jpg',
        number: 0
      },
      {
        id: 3,
        name: 'cat_4',
        url: 'images/cat_4.jpg',
        number: 0
      },
      {
        id: 4,
        name: 'cat_5',
        url: 'images/cat_5.jpg',
        number: 0
      },
      {
        id: 5,
        name: 'cat_6',
        url: 'images/cat_6.jpg',
        number: 0
      }
    ],
    // change current cat to other cat
    changeCurrentCat: function(id) {
      this.currentCat = this.cats[id];
    },

    // update current cat's statistics
    updateCurrentCat: function(newData) {
      this.currentCat.name = newData.name;
      this.currentCat.url = newData.url;
      this.currentCat.number = newData.number;
    }
  };


  // octopus
  var octopus = {
    adminToggle: false,

    toggleAdmin: function() {
      this.adminToggle = !this.adminToggle;
      view.renderAdminView();
    },

    init: function() {
      model.changeCurrentCat(0);
      view.init();
    },

    changeCat: function(catId) {
      if(model.currentCat.id != catId) {
        model.changeCurrentCat(catId);
        view.renderContainer();
      }
    },

    getCurrentCat: function() {
      return model.currentCat;
    },

    getCats: function() {
      return model.cats;
    },

    increaseCurClickNumber: function() {
      model.currentCat.number++;
      view.renderClickNumber();
    },
    updateCurCat: function(newData) {
      model.updateCurrentCat(newData);
      view.renderContainer();
    }
  };

  // view
  var view = {

    init : function() {
      this.initCatsList();
      this.initCatContainer();
      this.initAdminView();
    },

    initCatsList: function() {
      this.catItemTemplate = $('script[data-template="catItem"]').html();
      this.$catsList = $('.catsList');
      var cats = octopus.getCats();
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
        octopus.increaseCurClickNumber();
      });
      this.renderContainer();
    },

    renderContainer: function() {
      var curCat = octopus.getCurrentCat();
      var $catContainer = this.$catContainer;
      $catContainer.find('.catName').text(curCat.name);
      $catContainer.find('.catImg').attr('src', curCat.url);
      // $catContainer.find('.clickNumber').text(curCat.number);
      this.renderClickNumber();
    },

    renderClickNumber: function() {
      var curCat = octopus.getCurrentCat();
      var $catContainer = this.$catContainer;
      $catContainer.find('.clickNumber').text(curCat.number);
    },

    initAdminView: function() {
      var curCat = octopus.getCurrentCat();
      this.$adminView = $('.adminView');
      var $adminView = this.$adminView;
      this.$adminInfo = $adminView.find('.admin-info');
      var $adminInfo = this.$adminInfo;
      var $adminBtn = $adminView.find('.admin-btn');

      // add event listern for the admin button
      $adminBtn.on('click', function(e) {
        octopus.toggleAdmin();
      });

      // add event listener for the cancel button
      $adminInfo.find('.cancel-btn').on('click', function(e) {
        // tell octopus to close admin view
        octopus.toggleAdmin();
      });
      // add event listener for the save button
      $adminInfo.find('.save-btn').on('click', function(e) {
        // create new data for updating the current cat
        var newCat = {
          name: $adminInfo.find('#admin-name').val(),
          url: $adminInfo.find('#admin-url').val(),
          number: $adminInfo.find('#admin-clicks').val()
        };
        // tell octopus to update the current cat
        octopus.updateCurCat(newCat);
        // tell octopus to close admin view
        octopus.toggleAdmin();
      });

      this.renderAdminView();


    },

    renderAdminView: function() {
      var adminStatus = octopus.adminToggle;
      var $adminInfo = this.$adminInfo;
      var curCat = octopus.getCurrentCat();
      if(adminStatus){ // open admin view
        $adminInfo.find('#admin-name').val(curCat.name);
        $adminInfo.find('#admin-url').val(curCat.url);
        $adminInfo.find('#admin-clicks').val(curCat.number);

        $adminInfo.show();
      } else { // close
        $adminInfo.hide();
      }

    }


  };


  octopus.init();


})();
