'use strict';
// eslint-disable-next-line no-unused-vars


const store = (function(){

  const addItem = function(item) {
    this.items.push(item);
  };

  const addBookmarkForm = function(){
    this.adding = !this.adding;
    console.log(this.adding);
  };
  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  return{
    items: [],
    adding:false,
    expanded:false,
    error: null,
    addItem,
    addBookmarkForm,
    findAndDelete,
  };

}());