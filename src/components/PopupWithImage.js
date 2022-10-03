import {Popup} from './Popup'
export class PopupWithImage extends Popup {
    constructor(selector, link, name){
        super(selector);
        this._link = link;
        this._name = name;
        this._popupImage = document.querySelector('.popup__picture');
        this._popupDescription = document.querySelector('.popup__caption');
    }
  
    openPopup() {  
      this._popupImage.src = this._link;
      this._popupImage.alt = this._name;
      this._popupDescription.textContent = this._name;
      super.openPopup();
    }
  }