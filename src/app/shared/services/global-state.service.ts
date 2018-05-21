import {Injectable} from '@angular/core';

@Injectable()
export class GlobalStateService {

  set isLogin(state: boolean) {

    localStorage.setItem('isLogin', state.toString());
  }

  get isLogin() {

    return localStorage.getItem('isLogin') && localStorage.getItem('isLogin') !== 'false';
  }
}
