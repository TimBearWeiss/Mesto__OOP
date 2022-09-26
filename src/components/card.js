import {cardContainer, cardTemplate, popupAddCard, cardForm, buttonSaveAddCard, picturePopup,
caption, popupImage} from './constants.js'
import {renderLoading} from './modal.js'
import {closePopup, openPopup} from './utils'
import {} from './api.js'
import {userId, api} from './index.js'


export class Card {
  constructor(name, link, likes, id, cardId) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.id = id;
    this.cardId = cardId;
  }
  _getElement() {
    const cardElement = document
      .querySelector('#cardTemplate')
      .content
      .querySelector('.element')
      .cloneNode(true);
  
    return cardElement;
  }

  _generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector('.element__image');  
    this._likeNumber = this._element.querySelector('.element__like-number');
    this._likeElement = this._element.querySelector('.elements__like');
    this._btnDelete = this._element.querySelector('.element__delete-btn');
    this._element.querySelector('.element__inscription').textContent = this.name;

    this._likeNumber.textContent = this.likes.length;
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;


    if (this.id === userId) {
      this._btnDelete.style.visibility = 'visible';
    }
    else if (this.id !== userId) {
      this._btnDelete.style.visibility = 'hidden';
    };

    if (this.likes.some((item) =>item._id === userId)) {
      this._likeElement.classList.add('element__like_position_activ');
    };

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', function () {
      getFullSizeCard(this._cardImage);
    });
  }

  _getFullSizeCard(element) {
    picturePopup.src = element.src;
    picturePopup.alt = element.alt;
    caption.textContent = element.alt;
  
    openPopup(popupImage);
  };


}

  // function addCard(name, link, likes, id, cardId) {
    // const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    // const cardImage = cardElement.querySelector('.element__image');
    // const likeNumber = cardElement.querySelector('.element__like-number');
    // const likeElement = cardElement.querySelector('.elements__like');
    // const btnDelete = cardElement.querySelector('.element__delete-btn');
    
    // likeNumber.textContent = likes.length;
    // cardImage.src = link;
    // cardImage.alt = name;
    // cardElement.querySelector('.element__inscription').textContent = name;
  

    // удаление кнопки корзины у не моих карт
   
      // if (id === userId) {
      //   btnDelete.style.visibility = 'visible';
      // }
      // else if (id !== userId) {
      //   btnDelete.style.visibility = 'hidden';
      // };


      // if (likes.some((item) =>item._id ===userId)) {
      //   likeElement.classList.add('element__like_position_activ');
      // };
    


    // открытие попапа с фул картинкой 
  //   cardImage.addEventListener('click', function () {
  //     getFullSizeCard(cardImage);
  //   }); 

  //   // Лайк 
  //   likeElement.addEventListener('click', evt => {

  //     if (likeElement.classList.contains('element__like_position_activ')) {
  //       api.deleteLike(cardId)
  //       .then ((res) =>{
  //         evt.target.classList.toggle('element__like_position_activ');
  //         likeNumber.textContent = res.likes.length;
  //       })
  //       .catch((err) => {
  //         console.log(err); 
  //       });
  //     }
  //     else {
  //       api.addLike(cardId)
  //       .then ((res) =>{
  //         likeNumber.textContent = res.likes.length;
  //         evt.target.classList.toggle('element__like_position_activ');
  //       })
  //       .catch((err) => {
  //         console.log(err); 
  //       });
  //     }
  //   });
  
  //   // Удаление карточки 
    
  //   cardElement.querySelector('.element__delete-btn').addEventListener('click', function () {
  //     deleteCard(cardElement, cardId);
  //   });

  //   return cardElement;
  // };


  // function getFullSizeCard(element) {
  //   picturePopup.src = element.src;
  //   picturePopup.alt = element.alt;
  //   caption.textContent = element.alt;
  
  //   openPopup(popupImage);
  // };


  function deleteCard (cardElement, cardId) {
    deleteCardFromServer(cardId)
    .then((res) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err); 
    });
  };


  function addUsersCard(evt) {
    evt.preventDefault();
    renderLoading(true, buttonSaveAddCard);
    const imageLink = cardForm.link.value;
    const imageName = cardForm.name.value;

    
    postUserCard(imageName, imageLink)
    .then((res)=>{
      
      const newCard = addCard(imageName, imageLink, res.likes, res.owner._id, res._id);
      const popupSave = popupAddCard.querySelector('.popup__save');

    cardContainer.prepend(newCard);
      
    closePopup(popupAddCard);    
   
    popupSave.setAttribute('disabled', true);
    popupSave.classList.add('popup__save_inactive');

    cardForm.name.value = '';
    cardForm.link.value = '';  
    return res;

    })
    
    .catch((err) => {
      console.log(err);
    })

    .finally (()=>{
      renderLoading(false, buttonSaveAddCard);
    });
   
  };




export {deleteCard, addUsersCard};
