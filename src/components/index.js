import '../pages/index.css'; // добавьте импорт главного файла стилей 
import '../components/api.js';
import {Section} from './Section.js'
import {
  addBtn,
  editBtn, 
  cardForm,
  buttonSaveAddCard,
  popupProfile,
  popupAddCard,
  profileName,
  profileProf,
  avatarInput,
  buttonSaveAvatar,
  formProfileEdit,
  editAvatar,
  popupAvatar,
  cardContainer, 
  jobInput,
  nameInput,
  profTitle, 
  profSubtitle, 
  profAvatar
} from "./constants.js";
//  Шесть карточек «из коробки»

import {renderLoading} from './utils'
import {Card} from './card.js'
import {Popup, PopupWithForm, PopupWithImage} from './Popup.js'
// import {enableValidation} from './validate.js' 

//редактирование информации о себе
import {handleProfileFormSubmit, handleAvatarFormSubmit} from './modal.js' 
import {Api} from './api.js'

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '4f0ff6e8-a2e0-495e-814d-038253b8623a',
    'Content-Type': 'application/json'
  }
}); 

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save',
//   inactiveButtonClass: 'popup__save_inactive',
//   inputErrorClass: 'popup__input-redframe',
//   errorClass: 'popup__input-error_visible'
// }); 

Promise.all([api.getUserInfo(), api.getCardFromServer()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {

      // тут установка данных пользователя
      profTitle.textContent = userData.name 
      profSubtitle.textContent = userData.about
      profAvatar.src = userData.avatar
      userId = userData._id
      console.log(userData);


      const cardList = new Section({
        data: cards,
        renderer: (element) => {
          const newCard = new Card(element, '#cardTemplate');
          const cardElement = newCard._generate();
          cardContainer.append(cardElement);
        }
      },
      '.elements'
      );


      cardList.renderItems(cards, userData);
      // и тут отрисовка карточек
      // cards.forEach(function(element) {
      //   const newCard = new Card(element, '#cardTemplate');
      //   const cardElement = newCard._generate();
      //   cardContainer.append(cardElement);
      //  });
  })
      .catch(err => {
      console.log(err);
  });

editAvatar.addEventListener('click', function () {
  const popup = new PopupWithForm('#popupAvatar', () => {
    renderLoading(true, buttonSaveAvatar);
  
    api.uploadAvatar(avatarInput.value)
    .then((res) => {
      profAvatar.src = avatarInput.value;
      popup.closePopup();
    })
    .finally (()=>{
      renderLoading(false, buttonSaveAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
  });  
  popup.listeners();
  popup.openPopup();
}); 

addBtn.addEventListener('click', function () {
  const popup = new PopupWithForm('#popupAddCard', () => {
    renderLoading(true, buttonSaveAddCard);
    const imageLink = cardForm.link.value;
    const imageName = cardForm.name.value;   
    
    api.postUserCard(imageName, imageLink)
    .then((res)=>{
      const newCard = new Card(res, '#cardTemplate');
      const cardElement = newCard._generate();
      const card = new Section({
        data: res,
      },
      '.elements'
      );
      card.addItem(cardElement);
      popup.closePopup();    
      // popupSave.setAttribute('disabled', true);
      // popupSave.classList.add('popup__save_inactive');
      cardForm.name.value = '';
      cardForm.link.value = '';
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (()=>{
      renderLoading(false, buttonSaveAddCard);
    });
  });
  popup.listeners();
  popup.openPopup();
}); 

editBtn.addEventListener('click', function () {
  const popup = new PopupWithForm('#popupProfile', () => {
    // renderLoading(true, buttonSaveProfile);
    console.log('hello');
    // отправляем данные серверу 
    api.uploadUserInfoInServer(nameInput.value, jobInput.value)
    .then((res) => {
      profTitle.textContent = nameInput.value;
      profSubtitle.textContent = jobInput.value; 
      console.log(res);
      popup.closePopup();
    })
    // .finally (()=>{
    //   renderLoading(false, buttonSaveProfile);
    // })
    .catch((err) => {
      console.log(err);
    })
  });

  formProfileEdit.firstname.value = profileName.textContent;
  formProfileEdit.profession.value = profileProf.textContent;
  popup.listeners();
  popup.openPopup();
}); 

// Кнопки сохранения форм
// profileForm.addEventListener('submit', handleProfileFormSubmit);

// avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// cardForm.addEventListener('submit', addUsersCard);


export let userId = '';
