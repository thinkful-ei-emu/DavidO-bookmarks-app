'use strict';
// eslint-disable-next-line no-unused-vars


const store = (function(){

  const addItem = function(item) {
    item.expanded = false;
    this.items.push(item);
  };

  const addBookmarkForm = function(){
    this.adding = !this.adding;
    console.log(this.adding);
  };
  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  // const expandingBookmarkToggle = function(id){
  //   console.log('store.expandingBookmark Ran');
  //   this.items.find(
  //     items => items.id === 
  //   );
  //    = !this.expanded;
  // };

  return{
    items: [],
    adding:false,
    error: null,
    addItem,
    addBookmarkForm,
    findAndDelete,
    // expandingBookmark
  };

}());