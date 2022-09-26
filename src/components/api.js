import {checkResponse} from './utils.js'


// Область работы с ООП 

export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

  getInitialCards() {
        return fetch().then()
    // ...
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








// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
//   headers: {
//     authorization: '4f0ff6e8-a2e0-495e-814d-038253b8623a',
//     'Content-Type': 'application/json',
//   },
// };


     




