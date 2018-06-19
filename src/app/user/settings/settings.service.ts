import {Injectable} from '@angular/core';

import {BaseHttp} from '../../shared/etc/base-http';

@Injectable()
export class SettingsService extends BaseHttp {

  updateUserInfo(username: string, params: any) {

    params.username = username;

    return this.http.put(this.apiPrefix + '/user/update', params);
  }

  updatePassword(username: string, params: any) {

    params.username = username;

    return this.http.put(this.apiPrefix + '/modify-password', params);
  }
}
