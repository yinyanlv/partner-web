import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseHttp} from '../shared/etc/base-http';

@Injectable()
export class LoginService extends BaseHttp {

  login(params: any): Observable<any> {
    params.remember = !!params.remember;
    return this.http.post(this.apiPrefix + '/login', params, {
      withCredentials: true
    });
  }
}
