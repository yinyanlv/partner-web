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
}
