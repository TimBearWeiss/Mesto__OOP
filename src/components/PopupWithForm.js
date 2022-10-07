import {Popup} from './Popup'
export class PopupWithForm extends Popup {
    constructor(selector, submitCallBack){
        super(selector);
        this.submitCallBack = submitCallBack;
        this.form = this.popup.querySelector('.popup__form');
    }
  
    _getInputValues() {
      const inputList = this.popup.querySelectorAll('.popup__input');
      const obj = {};

      inputList.forEach(input => obj[input.name] = input.value)
      // for(let i = 0; i < inputList.length; i++) {
      //   obj[i] = inputList[i].value;
      // }
      return obj;
    }
  
    listeners() {
      this.form.addEventListener('submit', () => {
        this.submitCallBack(this._getInputValues())
      });
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