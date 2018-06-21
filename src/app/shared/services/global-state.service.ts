import {Injectable} from '@angular/core';

@Injectable()
export class GlobalStateService {

  set isLogin(state: boolean) {

    localStorage.setItem('isLogin', state.toString());
  }

  get isLogin() {

    return localStorage.getItem('isLogin') && localStorage.getItem('isLogin') !== 'false';
  }

  get userInfo() {

    let user = localStorage.getItem('userInfo');

    return user ? JSON.parse(user) : {};
  }

  set userInfo(user: any) {

    localStorage.setItem('userInfo', user ? JSON.stringify(user) : '');
  }

  get options() {

    let options = localStorage.getItem('options');

    return options ? JSON.parse(options) : {};
  }

  set options(options: any) {

    localStorage.setItem('options', options ? JSON.stringify(options) : '');
  }

  setOptionsItem(key: string, value: any) {

    let options = this.options;

    options[key] = value;

    localStorage.setItem('options', JSON.stringify(options));
  }

  getOptionsItem(key: string) {

    let options = this.options;
    let value = options[key];

    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }

    return value;
  }

  get status() {

    let status = localStorage.getItem('status');

    return status ? JSON.parse(status) : {};
  }

  set status(status: any) {

    localStorage.setItem('status', status ? JSON.stringify(status) : '');
  }
}
