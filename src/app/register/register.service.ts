import {Injectable} from '@angular/core';

import {BaseHttp} from '../shared/etc/base-http';

@Injectable()
export class RegisterService extends BaseHttp {

  register(params: any) {

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
}
