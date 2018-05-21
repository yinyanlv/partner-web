import {Injectable} from '@angular/core';

import {BaseHttp} from '../shared/etc/base-http';

@Injectable()
export class LoginService extends BaseHttp {

  login(params: any) {

    console.log(params);
  }
}
