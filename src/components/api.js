import {checkResponse} from './utils.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '4f0ff6e8-a2e0-495e-814d-038253b8623a',
    'Content-Type': 'application/json',
  },
};


     
// забираем с сервера данные имени и профессии
function getUserInfo () {
    
    return fetch(config.baseUrl +'/users/me', {
    method:'GET',
    headers: config.headers
  })
  .then(checkResponse);

}



// добавляем на сервер данные имени и профессии 

function uploadUserInfoInServer(name, about) {
    return fetch(config.baseUrl +'/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
        name: name,
        about: about
  })
        
})
        .then(checkResponse)

}



// картинки с сервера 

function getCardFromServer() {
    return fetch(config.baseUrl +'/cards', {
        method:'GET',
        headers: config.headers
      })
      .then(checkResponse)      
}





function postUserCard(name, url) {
    return fetch(config.baseUrl +'/cards', {
        method:'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: url 
      })
    })
    .then(checkResponse)
};



// удаление карточки 

function deleteCardFromServer(cardId) {
  return fetch(config.baseUrl +`/cards/${cardId}`, {
    method:'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
};


// лайк карточки 
function addLike(cardId) {
  return fetch(config.baseUrl +`/cards/likes/${cardId}`, {
    method:'PUT',
    headers: config.headers
  })
  .then(checkResponse)
};



// удаление лайка карточки 

function deleteLike(cardId) {
  return fetch(config.baseUrl +`/cards/likes/${cardId}`, {
    method:'DELETE',
    headers: config.headers
  })
  .then(checkResponse)

};


// обновить аватар 
function uploadAvatar(url) {

  return fetch(config.baseUrl +'/users/me/avatar' , {
    method:'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
      
})
  })
  .then(checkResponse)

}




export {postUserCard, getCardFromServer}
export {uploadUserInfoInServer, deleteCardFromServer} 
export {deleteLike, addLike, uploadAvatar, getUserInfo}
