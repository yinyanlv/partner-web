import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CalendarEvent} from 'angular-calendar';

import {BaseHttp} from '../shared/etc/base-http';

@Injectable()
export class WorkService extends BaseHttp {

  originalData: any = [];

  getRecords(params): Observable<any> {

    return this.http.get(this.apiPrefix + '/work-record/get-records', {
      params: params
    }).pipe(map((res: any) => {
      if (res.success) {

        let events = [];

        this.originalData = res.data;

        res.data.forEach((item: any) => {

          item.events.forEach((event) => {

            let temp: CalendarEvent = {
              start: new Date(event.startTime),
              end: new Date(event.endTime),
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
