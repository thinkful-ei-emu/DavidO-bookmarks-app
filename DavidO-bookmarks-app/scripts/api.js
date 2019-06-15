/* eslint-disable indent */
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

  const createBookmark = function(title,url,desc = ' ',rating = null){
    console.log('Create Bookmark Ran');
    // const newBookmark = JSON.stringify({ title,url,desc, });
    const newBookmark = `{"title": "${title}", "url":"${url}", "desc":"${desc}", "rating": ${rating}}`;
    console.log(newBookmark);
    return fetch(baseURL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    })
      .then( res => {
        return res.json();
      } )
      .then(data => {
        console.log(data);
        console.log('aftter data');
        return data;
      });
  };

  const deleteBookmarks = function(id){
    return fetch(`${baseURL}/${id}`,{
      method:'DELETE'
    })
      .then( res => {
        return res.json();
      } );
    //   .then(data => {
    //     return data;
    //   });
  };

  return {
    deleteBookmarks,  
    getBookmarks,
    createBookmark
  };
}());