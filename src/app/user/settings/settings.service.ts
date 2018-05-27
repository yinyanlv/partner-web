import {Injectable} from '@angular/core';

import {BaseHttp} from '../../shared/etc/base-http';

@Injectable()
export class SettingsService extends BaseHttp {

  updateUserInfo(params: any) {

    return this.observableCreator.create((observer) => {

      setTimeout(() => {
        if (params.username !== 'admin') {
          observer.next({
            success: true
          });
        } else {
          observer.next({
            success: false,
            message: '该用户名已被注册'
          });
        }
      }, 3000);
    });
  }

  updatePassword(params: any) {

    return this.observableCreator.create((observer) => {

      setTimeout(() => {
        if (params.oldPassword === '111111') {
          observer.next({
            success: true
          });
        } else {
          observer.next({
            success: false,
            message: '输入的原密码不正确'
          });
        }
      }, 3000);
    });
  }
}