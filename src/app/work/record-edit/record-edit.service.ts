import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseHttp} from '../../shared/etc/base-http';

@Injectable()
export class RecordEditService extends BaseHttp {

  createRecord(params): Observable<any> {

    return this.http.post(this.apiPrefix + '/work-record/create', params);
  }

  updateRecord(params): Observable<any> {

    return this.http.put(this.apiPrefix + '/work-record/update', params);
  }

  deleteRecord(params): Observable<any> {

    return this.http.delete(this.apiPrefix + '/work-record/delete', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: params
    });
  }
}
