
const enableValidation = (enableValidation) => {

    // Функция, которая добавляет класс с ошибкой
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    inputElement.classList.add(enableValidation.inputErrorClass);
    errorElement.classList.add(enableValidation.errorClass);
  };
  
  
  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableValidation.inputErrorClass);
    errorElement.classList.remove(enableValidation.errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
  };
  
  const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }; 
  
  const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(enableValidation.inactiveButtonClass);
    } else {
          // иначе сделай кнопку активной
      buttonElement.removeAttribute('disabled', true);
      buttonElement.classList.remove(enableValidation.inactiveButtonClass);
    }
  }; 
  
  
  
  
  const isValid = (formElement, inputElement) => {
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
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
  }; 
  
  
  const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
  
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement);
  
    
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  
  
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  
   
  };

  export {enableValidation};


  