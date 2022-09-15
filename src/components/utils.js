
import {closePopupEsc} from './modal'

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    
   };
   
   function closePopup(popup) {
     popup.classList.remove('popup_opened');
     document.removeEventListener('keydown', closePopupEsc);
    
   };


function checkResponse(res) {
    if (res.ok) {
      return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
      };


function renderLoading(isLoading, submitButton) {
        if (isLoading) {
          submitButton.textContent = 'Сохранение...';
        } else {
          submitButton.textContent = 'Сохранить';
        }
      };


   export {openPopup, closePopup, checkResponse, renderLoading};




   

   
