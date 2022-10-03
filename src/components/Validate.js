export class FormValidator {
  constructor (data, formElement) {
    this.formSelector = data.formSelector;
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.formElement = formElement;
    this.inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    this.buttonElement = this.formElement.querySelector(this.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const formError = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this.errorClass);
  }
  
  _hideInputError = (inputElement) => {
    const formError = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    formError.textContent = "";
    formError.classList.remove(this.errorClass);
  }

  _hasInvalidInput = () => {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.setAttribute('disabled', false);
    } else {
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.removeAttribute('disabled');
    }
  } 

  _isValid = (inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners = () => {    
    this._toggleButtonState(this.inputList, this.buttonElement);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this.inputList, this.buttonElement);
      });
    });
  }

  enableValidation () {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}