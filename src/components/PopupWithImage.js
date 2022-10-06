import {Popup} from './Popup'
export class PopupWithImage extends Popup {
    constructor(selector){
        super(selector);
        this._popupImage = document.querySelector('.popup__picture');
        this._popupDescription = document.querySelector('.popup__caption');
    }
  
    openPopup(link, name) {  
      this._popupImage.src = link;
      this._popupImage.alt = name;
      this._popupDescription.textContent = name;
      super.openPopup();
    }
  }