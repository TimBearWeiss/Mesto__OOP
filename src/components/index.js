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

const createCards = (data) => {
  const newCard = new Card(data, '#cardTemplate', getFullSizeCard, deleteCard, checkLikeOnCard);
  const cardElement = newCard._generate();
  return cardElement;
}

const placePopup = new PopupWithForm('#popupAddCard', (inputList) => {
  renderLoading(true, buttonSaveAddCard);
  // const imageLink = cardForm.link.value;
  // const imageName = cardForm.name.value; 
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

const profilePopup = new PopupWithForm('#popupProfile', (inputList) => {
  renderLoading(true, buttonSaveProfile);
  console.log('hello');
  // отправляем данные серверу 
  api.uploadUserInfoInServer(inputList['0'], inputList['1'])
  .then((res) => {
    profTitle.textContent = inputList[0];
    profSubtitle.textContent = inputList[1]; 
    console.log(res);
    profilePopup.closePopup();
  })
  .finally (()=>{
    renderLoading(false, buttonSaveProfile);
  })
  .catch((err) => {
    console.log(err);
  })
});

console.log(profilePopup._getInputValues());

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
    console.log(userData)
    profAvatar.src = userData.avatar;
    userId = userData._id;
    cardList.renderItems(cards);
  })
      .catch(err => {
      console.log(err);
  });

editAvatar.addEventListener('click', function () {
  const currentForm = document.querySelector('#popupAvatar');
  const validator = new FormValidator(data, currentForm);
  validator.enableValidation();  
  avatarPopup.listeners();
  avatarPopup.openPopup();
}); 

addBtn.addEventListener('click', function () {
  const currentForm = document.querySelector('#popupAddCard');
  const validator = new FormValidator(data, currentForm);
  validator.enableValidation(); 
  placePopup.listeners();
  placePopup.openPopup();
}); 

editBtn.addEventListener('click', function () {
  const currentForm = document.querySelector('#popupProfile');
  const validator = new FormValidator(data, currentForm);
  validator.enableValidation(); 

  formProfileEdit.firstname.value = profileName.textContent;
  formProfileEdit.profession.value = profileProf.textContent;
  profilePopup.listeners();
  profilePopup.openPopup();
}); 

const getFullSizeCard = (card) => {
  const popupImage = new PopupWithImage('.popup__image', card.link, card.name);
  popupImage.openPopup();
  popupImage.listeners();
}

const checkLikeOnCard = (boolean, cardData, input) => {
  if (boolean) {
    api.addLike(cardData._id)
    .then((res) => {
      console.log(res);
      input.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    api.deleteLike(cardData._id)
    .then((res) => {
      console.log(res);
      input.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

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
