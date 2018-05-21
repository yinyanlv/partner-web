import {Injectable} from '@angular/core';

import {BaseHttp} from '../shared/etc/base-http';

@Injectable()
export class LoginService extends BaseHttp {

  login(params: any) {

    return this.observableCreator.create((observer) => {

      if (params.username === 'admin' && params.password === '111111') {
        observer.next({
          success: true
        });
      } else {
        observer.next({
          success: false,
          message: '用户名或密码错误'
        });
      }
    });
  }
}
