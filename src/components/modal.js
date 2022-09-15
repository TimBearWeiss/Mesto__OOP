import {jobInput, profTitle, profSubtitle, nameInput, popupProfile, profAvatar, 
avatarInput, buttonSaveAvatar, buttonSaveProfile} from './constants.js'

import {closePopup, renderLoading} from './utils'
import {uploadUserInfoInServer, uploadAvatar} from './api.js'


   


  function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup);
    }
  }


 

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  renderLoading(true, buttonSaveAvatar);
  
  uploadAvatar(avatarInput.value)
  .then((res) => {
    profAvatar.src = avatarInput.value;
    closePopup(popupAvatar);
  })

  .finally (()=>{
    renderLoading(false, buttonSaveAvatar);
  })

  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
};


  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, buttonSaveProfile);
  
    // отправляем данные серверу 
    uploadUserInfoInServer(nameInput.value, jobInput.value)
    .then((res) => {
      profTitle.textContent = nameInput.value;
      profSubtitle.textContent = jobInput.value; 
      closePopup(popupProfile);
    })
    .finally (()=>{
      renderLoading(false, buttonSaveProfile);
    })
    .catch((err) => {
      console.log(err);
    })
  };


   export {closePopupEsc, handleProfileFormSubmit, handleAvatarFormSubmit, renderLoading};