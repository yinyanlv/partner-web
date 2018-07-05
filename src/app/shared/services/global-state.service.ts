import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class GlobalStateService {

  public isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  set isLogin(state: boolean) {

    if (!this.isPlatformBrowser) {
      return;
    }

    localStorage.setItem('isLogin', state.toString());
  }

  get isLogin() {

    if (!this.isPlatformBrowser) {
      return;
    }

    return localStorage.getItem('isLogin') && localStorage.getItem('isLogin') !== 'false';
  }

  get userInfo() {

    if (!this.isPlatformBrowser) {
      return;
    }

    let user = localStorage.getItem('userInfo');

    return user ? JSON.parse(user) : {};
  }

  set userInfo(user: any) {

    if (!this.isPlatformBrowser) {
      return;
    }

    localStorage.setItem('userInfo', user ? JSON.stringify(user) : '');
  }

  get options() {

    if (!this.isPlatformBrowser) {
      return;
    }

    let options = localStorage.getItem('options');

    return options ? JSON.parse(options) : {};
  }

  set options(options: any) {

    if (!this.isPlatformBrowser) {
      return;
    }

    localStorage.setItem('options', options ? JSON.stringify(options) : '');
  }

  setOptionsItem(key: string, value: any) {

    if (!this.isPlatformBrowser) {
      return;
    }

    let options = this.options;

    options[key] = value;

    localStorage.setItem('options', JSON.stringify(options));
  }

  getOptionsItem(key: string) {

    if (!this.isPlatformBrowser) {
      return;
    }

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

    if (!this.isPlatformBrowser) {
      return;
    }

    let status = localStorage.getItem('status');

    return status ? JSON.parse(status) : {};
  }

  set status(status: any) {

    if (!this.isPlatformBrowser) {
      return;
    }

    localStorage.setItem('status', status ? JSON.stringify(status) : '');
  }
}
