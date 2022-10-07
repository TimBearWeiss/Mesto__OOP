export class UserInfo {
    constructor ({nameSelector, professionSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._professionElement = document.querySelector(professionSelector);
        this._user = {
          name: this._nameElement.textContent,
          about: this._professionElement.textContent,
        };
      }


      getUserInfo () {
        return this._user
      }
    
      setUserInfo ({name, about}) {
        if (name) {
          this._user.name = name;
          this._nameElement.textContent = name;
        }
        if (about) {
          this._user.about = about;
          this._professionElement.textContent = about;
        }
      }
  }