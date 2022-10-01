import {userId} from './index.js'

export class Card {
  constructor(cardData, selector, getFull, deleteCard, checkLikeOnCard) {
    this._cardData = cardData;
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.id = cardData.owner._id;
    this.cardId = cardData.cardId;
    this.selector = selector;
    this.getFull = getFull;
    this._deleteCard = deleteCard;
    this._checkLikeOnCard = checkLikeOnCard;
  }

  _setEventListeners() {  
    this._element.querySelector('.elements__like').addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like_position_activ");
      if (evt.target.classList.contains('element__like_position_activ')) {        
        this._checkLikeOnCard(true, this._cardData, this._likeNumber);
      } else {        
        this._checkLikeOnCard(false, this._cardData, this._likeNumber);
      }
    });

    this._element.querySelector('.element__image').addEventListener("click", () => {
      this.getFull(this._cardData);
    });

    this._element.querySelector('.element__delete-btn').addEventListener("click", () => {
      this._element.remove();
      this._deleteCard(this._cardData);
    });
  }

  _getElement() {
    const cardElement = document
      .querySelector(this.selector)
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
}