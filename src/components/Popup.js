export class Popup {
  constructor(selector){
    this.popup = document.querySelector(selector); 
  }


  openPopup = () => {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._closePopupEsc(evt);
    });
  }
       
  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupEsc);
  }

  _closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  listeners() {
    this.popup.addEventListener('click', evt => {
    evt.target.classList.contains('popup__close-button') ? this.closePopup() : false;
  }); 

    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup();
      };
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(selector){
      super(selector);
      this.picturePopup = document.querySelector('.popup__picture');
  }

  openPopup(element) {    
    this.picturePopup.src = element.src;
    this.picturePopup.alt = element.alt;
    this.caption.textContent = element.alt;
    super.openPopup();
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, submitCallBack){
      super(selector);
      this.submitCallBack = submitCallBack;
      this.form = this.popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputList = this.popup.querySelectorAll('.popup__input');
    return inputList;
  }

  listeners() {
    this.form.addEventListener('submit', this.submitCallBack);
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    super.listeners();
  }

  closePopup() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    super.closePopup();
  };
}

