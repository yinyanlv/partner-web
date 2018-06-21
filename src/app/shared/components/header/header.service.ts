import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseHttp} from '../../etc/base-http';

@Injectable()
export class HeaderService extends BaseHttp {

  logout(): Observable<any> {

    return this.http.get(this.apiPrefix + '/logout', {
      withCredentials: true
    });
  }
}
