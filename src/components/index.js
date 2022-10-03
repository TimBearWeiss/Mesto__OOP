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

Promise.all([api.getUserInfo(), api.getCardFromServer()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
    user.setUserInfo(userData)
    console.log(userData)
    profAvatar.src = userData.avatar;
    userId = userData._id;

      const cardList = new Section({
        data: cards,
        renderer: (element) => {
          const newCard = new Card(element, '#cardTemplate', getFullSizeCard, deleteCard, checkLikeOnCard);
          const cardElement = newCard._generate();
          cardContainer.append(cardElement);
        }
      },
      '.elements'
      );
      cardList.renderItems(cards, userData);
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
  const currentForm = document.querySelector('#popupAvatar');
  const validator = new FormValidator(data, currentForm);
  validator.enableValidation();  
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
      const newCard = new Card(res, '#cardTemplate', getFullSizeCard, deleteCard, checkLikeOnCard);
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
  const currentForm = document.querySelector('#popupAddCard');
  const validator = new FormValidator(data, currentForm);
  validator.enableValidation(); 
  popup.listeners();
  popup.openPopup();
}); 




editBtn.addEventListener('click', function () {
  const popup = new PopupWithForm('#popupProfile', () => {
    renderLoading(true, buttonSaveProfile);
    console.log('hello');
    // отправляем данные серверу 
    api.uploadUserInfoInServer(nameInput.value, jobInput.value)
    .then((res) => {
      profTitle.textContent = nameInput.value;
      profSubtitle.textContent = jobInput.value; 
      console.log(res);
      popup.closePopup();
    })
    .finally (()=>{
      renderLoading(false, buttonSaveProfile);
    })
    .catch((err) => {
      console.log(err);
    })
  });

  const currentForm = document.querySelector('#popupProfile');
  const validator = new FormValidator(data, currentForm);
  validator.enableValidation(); 

  formProfileEdit.firstname.value = profileName.textContent;
  formProfileEdit.profession.value = profileProf.textContent;
  popup.listeners();
  popup.openPopup();
}); 

const getFullSizeCard = (card) => {
  const popupImage = new PopupWithImage('.popup__image', card.link, card.name);
  popupImage.openPopup();
  popupImage.listeners();
}

const checkLikeOnCard = (boolean, cardData, likeInput) => {
  if (boolean) {
    api.addLike(cardData._id)
    .then((res) => {
      likeInput.textContent = res.likes.length;
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    api.deleteLike(cardData._id)
    .then((res) => {
      likeInput.textContent = res.likes.length;
      console.log(res);
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
