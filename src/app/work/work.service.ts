import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CalendarEvent} from 'angular-calendar';
import {utc} from 'moment';

import {BaseHttp} from '../shared/etc/base-http';

@Injectable()
export class WorkService extends BaseHttp {

  originalData: any = [];

  getRecords(params): Observable<any> {

    return this.http.post(this.apiPrefix + '/work-record/get-records', params, {
      withCredentials: true
    })
      .pipe(map((res: any) => {
        if (res.success) {

          let events = [];

          this.originalData = res.data;

          res.data.forEach((item: any) => {

            events.push({
              start: utc(item.date).local().toDate(),
              end: utc(item.date).local().toDate(),
              title: '',
              meta: {
                recordId: item.id,
                overtime: item.overtime,
                note: ''
              }
            });

            item.events.forEach((event) => {

              let temp: CalendarEvent = {
                start: utc(event.startTime).local().toDate(),
                end: utc(event.endTime).local().toDate(),
                title: '',
                meta: {
                  recordId: item.id,
                  overtime: item.overtime,
                  note: event.note
                }
              };

              events.push(temp);
            });
          });

          res.data = events;
        }

        return res;
      }));
  }
}
