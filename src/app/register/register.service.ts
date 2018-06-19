import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseHttp} from '../shared/etc/base-http';

@Injectable()
export class RegisterService extends BaseHttp {

  register(params: any): Observable<any> {

    return this.http.post(this.apiPrefix + '/register', params);
  }
}
