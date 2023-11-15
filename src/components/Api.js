import {checkResponse} from './utils.js'

// Область работы с ООП 
export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

  // забираем с сервера данные имени и профессии
  getUserInfo () {

  return fetch(this.baseUrl +'/users/me', {
  method:'GET',
  headers: this.headers
  })
  .then(checkResponse);
}
// добавляем на сервер данные имени и профессии 

uploadUserInfoInServer(name, about) {
  return fetch(this.baseUrl +'/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
      name: name,
      about: about
})  
})
      .then(checkResponse)
}

// картинки с сервера 

getCardFromServer() {
  return fetch(this.baseUrl +'/cards', {
      method:'GET',
      headers: this.headers
    })
    .then(checkResponse)      
}

postUserCard(name, url) {
  return fetch(this.baseUrl +'/cards', {
      method:'POST',
      headers: this.headers,
      body: JSON.stringify({
          name: name,
          link: url 
    })
  })
  .then(checkResponse)
}

// удаление карточки
 deleteCardFromServer(cardId) {
  return fetch(this.baseUrl +`/cards/${cardId}`, {
    method:'DELETE',
    headers: this.headers
  })
  .then(checkResponse)
};

// лайк карточки 
 addLike(cardId) {
  return fetch(this.baseUrl +`/cards/likes/${cardId}`, {
    method:'PUT',
    headers: this.headers
  })
  .then(checkResponse)
}

// удаление лайка карточки 

 deleteLike(cardId) {
  return fetch(this.baseUrl +`/cards/likes/${cardId}`, {
    method:'DELETE',
    headers: this.headers
  })
  .then(checkResponse)
}

// обновить аватар 
 uploadAvatar(url) {

  return fetch(this.baseUrl +'/users/me/avatar' , {
    method:'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: url
      
})
  })
  .then(checkResponse)
}
}

// Конец 

     




