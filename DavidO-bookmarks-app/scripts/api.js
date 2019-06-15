'use strict';

const api = (function(){
  let name = 'davidO';
  let baseURL = `https://thinkful-list-api.herokuapp.com/${name}/bookmarks`;

  const getBookmarks = function(){
    return fetch(baseURL)
      .then( res => {
        return res.json();
      } )
      .then(data => {
        return data;
      });
  };

  const createBookmark = function(title,url,desc = ' ',rating = null) {
    console.log('Create Bookmark Ran');
    const newBookmark = JSON.stringify({ title,url,desc,rating });

    return getBookmarks(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newBookmark
    });
  };

  const deleteItem = function(id) {
    console.log('api.deleteItem ran');
    return getBookmarks(`${baseURL}/${id}`, {
      method: 'DELETE'
    });
  };

  return {
    getBookmarks,
    deleteItem,
    createBookmark
  };
}());