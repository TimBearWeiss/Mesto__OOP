export class Popup {
  constructor(selector){
    this.popup = document.querySelector(selector);
    this._closePopupEsc = this._closePopupEsc.bind(this);
  }

  _closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  openPopup() {
    this.popup.classList.add('popup_opened');    
    document.addEventListener('keydown', this._closePopupEsc);
  }
       
  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupEsc);
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





