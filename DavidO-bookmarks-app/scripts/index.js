'use strict';
/* global bookmarkList, store, api $ */

$(document).ready(function() {
  bookmarkList.bindEventListeners();

  // On initial load, fetch Shopping Items and render
  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarkList.render();
    })
    .catch(err => console.log(err.message));
});



//store.addItem(item)) was present on line 0. Full line was items.forEach((item) => store.addItem(item));