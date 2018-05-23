import {Injectable} from '@angular/core';

import {BaseHttp} from '../shared/etc/base-http';

@Injectable()
export class ForgotService extends BaseHttp {

  forgot(params: any) {

    return this.observableCreator.create((observer) => {

      setTimeout(() => {
        if (params.email === '1@qq.com') {
          observer.next({
            success: true
          });
        } else {
          observer.next({
            success: false,
            message: '该邮箱未曾在本站注册'
          });
        }
      }, 3000);
    });
  }
}
