import {Injectable} from '@angular/core';

import {BaseHttp} from '../../etc/base-http';

@Injectable()
export class HeaderService extends BaseHttp {

  logout() {

    return this.observableCreator.create((observer) => {
      observer.next({
        success: true
      });
    });
  }
}
