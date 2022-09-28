export class FormValidator {
  constructor(data, formElement) {
    this.data = data;
    this.formElement = formElement;
    // this.formSelector = data.formSelector;
    // this.inputSelector = data.inputSelector;
    // this.submitButtonSelector = data.submitButtonSelector;
    // this.inactiveButtonClass = data.inactiveButtonClass;
    // this.errorClass = data.errorClass;
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.data.inputErrorClass);
    errorElement.classList.remove(this.data.errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this.data.inputErrorClass);
    errorElement.classList.add(this.data.errorClass);
  }

  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this.data.inactiveButtonClass);
    } else {
          // иначе сделай кнопку активной
      buttonElement.removeAttribute('disabled', true);
      buttonElement.classList.remove(this.data.inactiveButtonClass);
    }
  }

  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      // теперь, если ошибка вызвана регулярным выражением,
        // переменная validationMessage хранит наше кастомное сообщение
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(this.formElement.querySelectorAll(this.data.inputSelector));
  
    const buttonElement = this.formElement.querySelector(this.data.submitButtonSelector);
  
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(inputList, buttonElement);
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formElement, inputElement)
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(this.formElement.querySelectorAll(this.data.inputSelector));
    const buttonElement = this.formElement.querySelector(this.data.submitButtonSelector);
    // Переберём полученную коллекцию
    inputList.forEach((input) => {

      input.addEventListener('input', ()=> {
        if (!input.validity.valid) {
          // теперь, если ошибка вызвана регулярным выражением,
          // переменная validationMessage хранит наше кастомное сообщение
          this._showInputError(input, input.validationMessage);
        } else {
          this._hideInputError(input);
        }

        this._isValid(input);
        this._toggleButtonState(inputList, buttonElement);

      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      this._setEventListeners();

      this.formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
    })
  };

}


// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save',
//   inactiveButtonClass: 'popup__save_inactive',
//   inputErrorClass: 'popup__input-redframe',
//   errorClass: 'popup__input-error_visible'
// }); 




// const enableValidation = (enableValidation) => {

//     // Функция, которая добавляет класс с ошибкой
//   const showInputError = (formElement, inputElement, errorMessage) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
//     // Заменим содержимое span с ошибкой на переданный параметр
//     errorElement.textContent = errorMessage;
//     inputElement.classList.add(enableValidation.inputErrorClass);
//     errorElement.classList.add(enableValidation.errorClass);
//   };
  
  
//   // Функция, которая удаляет класс с ошибкой
//   const hideInputError = (formElement, inputElement) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(enableValidation.inputErrorClass);
//     errorElement.classList.remove(enableValidation.errorClass);
//     // Очистим ошибку
//     errorElement.textContent = '';
//   };
  
//   const hasInvalidInput = (inputList) => {
//     // проходим по этому массиву методом some
//     return inputList.some((inputElement) => {
//           // Если поле не валидно, колбэк вернёт true
//       // Обход массива прекратится и вся функция
//       // hasInvalidInput вернёт true
  
//       return !inputElement.validity.valid;
//     })
//   }; 
  
//   const toggleButtonState = (inputList, buttonElement) => {
//     // Если есть хотя бы один невалидный инпут
//     if (hasInvalidInput(inputList)) {
//       // сделай кнопку неактивной
//       buttonElement.setAttribute('disabled', true);
//       buttonElement.classList.add(enableValidation.inactiveButtonClass);
//     } else {
//           // иначе сделай кнопку активной
//       buttonElement.removeAttribute('disabled', true);
//       buttonElement.classList.remove(enableValidation.inactiveButtonClass);
//     }
//   }; 
  
  
  
  
//   const isValid = (formElement, inputElement) => {
//     if (inputElement.validity.patternMismatch) {
//         // встроенный метод setCustomValidity принимает на вход строку
//         // и заменяет ею стандартное сообщение об ошибке
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//         // если передать пустую строку, то будут доступны
//         // стандартные браузерные сообщения
//     inputElement.setCustomValidity("");
//   }
  
//   if (!inputElement.validity.valid) {
//     // теперь, если ошибка вызвана регулярным выражением,
//         // переменная validationMessage хранит наше кастомное сообщение
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
//   }; 
  
  
//   const setEventListeners = (formElement) => {
//     // Находим все поля внутри формы,
//     // сделаем из них массив методом Array.from
//     const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  
//     const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
  
//     // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
//     toggleButtonState(inputList, buttonElement);
  
    
  
//     // Обойдём все элементы полученной коллекции
//     inputList.forEach((inputElement) => {
//       // каждому полю добавим обработчик события input
//       inputElement.addEventListener('input', () => {
//         // Внутри колбэка вызовем isValid,
//         // передав ей форму и проверяемый элемент
//         isValid(formElement, inputElement)
//         toggleButtonState(inputList, buttonElement);
//       });
//     });
//   }; 
  
  
//     // Найдём все формы с указанным классом в DOM,
//     // сделаем из них массив методом Array.from
//     const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  
//     // Переберём полученную коллекцию
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//         // У каждой формы отменим стандартное поведение
//         evt.preventDefault();
//       });
  
//       // Для каждой формы вызовем функцию setEventListeners,
//       // передав ей элемент формы
//       setEventListeners(formElement);
//     });
  
   
//   };



  