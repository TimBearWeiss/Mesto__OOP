import {Popup} from './Popup'
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