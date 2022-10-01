
import {closePopupEsc} from './modal'

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


   export {checkResponse, renderLoading};




   

   
