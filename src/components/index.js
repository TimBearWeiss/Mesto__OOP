import '../pages/index.css'; // добавьте импорт главного файла стилей 
import '../components/api.js';

import {
  addBtn,
  editBtn,
  popups,
  popupProfile,
  popupAddCard,
  cardForm,
  popupImage,
  profileName,
  profileProf,
  formProfileEdit,
  profileForm,
  editAvatar,
  popupAvatar,
  avatarForm,
  cardContainer, 
  profTitle, 
  profSubtitle, 
  profAvatar
} from "./constants.js";
//  Шесть карточек «из коробки»

import {addUsersCard, addCard} from './card.js'
import {openPopup, closePopup} from './utils'
import {enableValidation} from './validate.js' 

//редактирование информации о себе
import {handleProfileFormSubmit, handleAvatarFormSubmit} from './modal.js' 
import {Api} from './api.js'




export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '4f0ff6e8-a2e0-495e-814d-038253b8623a',
    'Content-Type': 'application/json'
  }
}); 


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-redframe',
  errorClass: 'popup__input-error_visible'
}); 




Promise.all([api.getUserInfo(), api.getCardFromServer()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {

      // тут установка данных пользователя
      profTitle.textContent = userData.name 
      profSubtitle.textContent = userData.about
      profAvatar.src = userData.avatar
      userId = userData._id
      console.log(userData);

      // и тут отрисовка карточек
      cards.forEach(function(element) {
        const newCard = addCard(element.name, element.link, element.likes, element.owner._id, element._id);
        cardContainer.append(newCard);
       });
       console.log(cards);
  })
      .catch(err => {
      console.log(err);
  });


// закрытие попапа при клике на оверлей 

popupAvatar.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupAvatar);
  };
});

popupProfile.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popupProfile);
    };
});

popupAddCard.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupAddCard);
  };
});

popupImage.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupImage);
  };
});


popups.forEach (popup => {
  popup.addEventListener('click', evt => {
   evt.target.classList.contains('popup__close-button') ? closePopup(popup) : false;
  }); 
});


// открытие попапов 

editAvatar.addEventListener('click', function () {
  openPopup(popupAvatar);
}); 


addBtn.addEventListener('click', function () {
  openPopup(popupAddCard);
}); 

editBtn.addEventListener('click', function () {
  formProfileEdit.firstname.value = profileName.textContent;
  formProfileEdit.profession.value = profileProf.textContent;
  openPopup(popupProfile);
}); 

// Кнопки сохранения форм
profileForm.addEventListener('submit', handleProfileFormSubmit);

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

cardForm.addEventListener('submit', addUsersCard);


export let userId = '';







