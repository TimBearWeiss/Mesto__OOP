import '../pages/index.css'; // добавьте импорт главного файла стилей 
import './Api.js';
import {Section} from './Section.js'
import {
  addBtn,
  editBtn, 
  cardForm,
  data,
  buttonSaveProfile,
  likeInput,
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
  profAvatar,
  nameSelector,
  professionSelector
} from "./constants.js";
//  Шесть карточек «из коробки»

import {renderLoading} from './utils.js'
import {FormValidator} from './Validate.js'
import {Card} from './Card.js'
import {PopupWithForm} from './PopupWithForm.js' 
import {PopupWithImage} from './PopupWithImage.js' 
import {Api} from './Api.js'
import {UserInfo} from './UserInfo.js'


const user = new UserInfo({
  nameSelector,
  professionSelector
})

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '4f0ff6e8-a2e0-495e-814d-038253b8623a',
    'Content-Type': 'application/json'
  }
});

const avatarPopup = new PopupWithForm('#popupAvatar', (inputList) => {
  renderLoading(true, buttonSaveAvatar);
  
  api.uploadAvatar(inputList['0'])
  .then((res) => {
    profAvatar.src = inputList['0'];
    avatarPopup.closePopup();
  })
  .finally (()=>{
    renderLoading(false, buttonSaveAvatar);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
});
avatarPopup.listeners();
const avatarValidator = new FormValidator(data, popupAvatar);
avatarValidator.enableValidation(); 

const createCards = (data) => {
  const newCard = new Card(data, '#cardTemplate', getFullSizeCard, deleteCard, addLikeOnCard, removeLikeOnCard);
  const cardElement = newCard._generate();
  return cardElement;
}

const popupImage = new PopupWithImage('.popup__image');
popupImage.listeners();

const placePopup = new PopupWithForm('#popupAddCard', (inputList) => {
  renderLoading(true, buttonSaveAddCard);
  const imageName = inputList['0']; 
  const imageLink = inputList['1']; 
  
  api.postUserCard(imageName, imageLink)
  .then((res)=>{
    cardList.addItem(createCards(res));
    placePopup.closePopup();
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
const placeValidator = new FormValidator(data, popupAddCard);
placeValidator.enableValidation(); 
placePopup.listeners();

const profilePopup = new PopupWithForm('#popupProfile', (inputList) => {
  renderLoading(true, buttonSaveProfile);
  
  // отправляем данные серверу 
  api.uploadUserInfoInServer(inputList['0'], inputList['1'])
  .then((res) => {
  user.setUserInfo(res);
    profilePopup.closePopup();
  })
  .finally (()=>{
    renderLoading(false, buttonSaveProfile);
  })
  .catch((err) => {
    console.log(err);
  })
});
const profileValidator = new FormValidator(data, popupProfile);
profileValidator.enableValidation(); 
profilePopup.listeners();

const cardList = new Section({
    renderer: (element) => {
      cardContainer.append(createCards(element));
    }
  },
  '.elements'
  );

Promise.all([api.getUserInfo(), api.getCardFromServer()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
    user.setUserInfo(userData)
    profAvatar.src = userData.avatar;
    userId = userData._id;
    cardList.renderItems(cards);
    console.log(cards);
  })
      .catch(err => {
      console.log(err);
  });

editAvatar.addEventListener('click', function () {
  avatarPopup.openPopup();
}); 

addBtn.addEventListener('click', function () {
  placePopup.openPopup();
}); 

editBtn.addEventListener('click', function () {
  formProfileEdit.firstname.value = profileName.textContent;
  formProfileEdit.profession.value = profileProf.textContent;
  profilePopup.openPopup();
}); 

const getFullSizeCard = (card) => {
  popupImage.openPopup(card.link, card.name);
}

function addLikeOnCard (card){
  api.addLike(card.getId())
    .then((res) => {
      console.log(res);
      card.addLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeLikeOnCard (card){
  api.deleteLike(card.getId())
    .then((res) => {
      console.log(res);
      card.removeLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

const deleteCard = (cardElement) => {
  api.deleteCardFromServer(cardElement._id)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err); 
  });
};


export let userId = '';
