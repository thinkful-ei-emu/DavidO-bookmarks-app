'use strict';
/* global store, api, $ */

const bookmarkList = (function(){

  // THis will later be used to generate error. A section for it has been added into the html document. 
  //   function generateError(message) {
  //     return `
  //         <section class="error-content">
  //           <button id="cancel-error">X</button>
  //           <p>${message}</p>
  //         </section>
  //       `;
  //   }

  function render() {

    

    //IMPORTANT  NOTE! ALL HTML MANIPULATION MUST BE INSIDE THE RENDER FUNCTION:
    // renderError();

    // Filter item list if store prop is true by item.checked === false
    // let items = [ ...store.items ];
    // if (store.hideCheckedItems) {
    //   items = items.filter(item => !item.checked);
    // }
  
    // Filter item list if store prop `searchTerm` is not empty
    // if (store.searchTerm) {
    //   items = items.filter(item => item.name.includes(store.searchTerm));
    // }

    function generateItemElement(item) {
      console.log(item);
      // const checkedClass = item.checked ? 'shopping-item__checked' : '';
      // const editBtnStatus = item.checked ? 'disabled' : '';
  
      let itemTitle = `<span class="shopping-item ">${item.title}</span>`;
      let itemRating = `<span class="shopping-item ">${item.rating}</span>`;
      // if (item.isEditing) {
      //   itemTitle = `
      //     <form class="js-edit-item">
      //       <input class="shopping-item" type="text" value="${item.name}" />
      //     </form>
      //   `;
      // }
    
      return `
        <li class="js-item-element" data-item-id="${item.id}">
          ${itemTitle} 
          ${itemRating}
          <div class="bookmark-item-controls">
            <button class="bookmark-item-toggle js-item-toggle">
              <span class="button-label">Expand</span>
            </button>
            <button class="bookmark-item-delete js-item-delete">
              <span class="button-label">Delete</span>
            </button>
          </div>
        </li>`;
    }
  
  
    function generateBookmarkItemsString(bookmarkList) {
      const items = bookmarkList.map((item) => generateItemElement(item));
      return items.join('');
    }


    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookmarkListItemsString = generateBookmarkItemsString(store.items);
  
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListItemsString);

    // This if else block toggles the add bookmark form
    if (store.adding === true){
      $('.bookmarkDropDown').html(

        `<form class ="add-Bookmark-dropdown">
        <input class = "title">Title</input>
        <input class = "url">URL</input>
        <input class = "description">Description</input>
        <input class = "rating">Rating</input>
        </form>
        <button class = "submitBookmark">Submit</button>`

      );
    }
    else{
      $('.bookmarkDropDown').html(
        ''
      );   
    }

    
    
    //This if else block toggles the expand form 
    
    
  }

  //this function does not appear to be correctly targeting the correct item 
  //since the console.log does not occur. I've tried  

  function handleNewItemSubmit() {
    $('.submitBookmark').submit(function (event) {
      event.preventDefault();
      console.log('submit was clicked');
      const newBookmarkTitle = $('.js-bookmark-list-entry').val();
      const newBookmarkURL = $('.title').val();
      const newBookmarkDesc = $('.description').val();
      const newBookmarkRating = $('.rating').val();
      $('.js-shopping-list-entry').val('');
      api.createBookmark(newBookmarkTitle,newBookmarkURL,newBookmarkDesc, newBookmarkRating)
        .then((newBookmark) => {
          store.addItem(newBookmark);
          render();
        })
        .catch((err) => {
          console.log(err);
          // store.setError(err.message);
          // renderError();
        });
    });
  }

  function addBookmark(){
    //Step 1. When I click the button consol.log(button clicked.)
    //step 2. I should update the store so that adding=true. (console.log(store)
    //step 3. update the render method to display or not display form or soemthign based on adding property.  }
    $('.addBookmark').click(()=> {
      console.log('addBookmark was clicked.');
      store.addBookmarkForm();
      render();
    });
  }

  //this is not correctly activating. 
  function expandedBookmark(){
    $('.bookmark-item-toggle').click(()=>{
      console.log('expand button was clicked');
      store.expanded === !store.expanded;
      if (store.expanded === true){
        console.log(item.id,item.desc, item.url, item.rating,)
      };

      render();
    });
  }


  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }   

  function handleDeleteItemClicked() {
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      console.log('delete button was clicked');
      api.deleteItem(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch((err) => {
          console.log(err);
          // store.setError(err.message);
          // renderError();
        }
        );
    });
  }

  //The below section of code calls the event listener functions listed above in this document and 
  //should be chaged as needed. None were copied over when this comment was.
  function bindEventListeners() {
    handleNewItemSubmit();
    addBookmark();
    expandedBookmark();
    //     handleItemCheckClicked();
    handleDeleteItemClicked();
  //     handleEditShoppingItemSubmit();
  //     handleToggleFilterClick();
  //     handleShoppingListSearch();
  //     handleItemStartEditing();
  //     handleCloseError();
  }

  // This object contains the only exposed methods from this module:
  return {
    //likely you'll be returnign the two lines of code below. 
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
