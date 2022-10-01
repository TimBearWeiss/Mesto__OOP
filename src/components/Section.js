export class Section {
  constructor({ data, renderer }, selector) {
      this._initialArray = data;
      this._renderer = renderer; // renderer — это функция
        
      this._container = document.querySelector(selector);
    }
  
  _clear () {
    this._container.innerHTML = '';
  }
  
  addItem (element) {
    this._container.prepend(element);
  }
  
  renderItems (items, payload) {
    this._clear()
    items.forEach(item => {
      this._renderer(item, payload)
    })
  }
}

  