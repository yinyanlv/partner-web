import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/observable';
import {CalendarEvent} from 'angular-calendar';
import * as startOfDay from 'date-fns/start_of_day';

@Injectable()
export class TimeStatisticsService {

  constructor() { }

  private color = {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  };

  private events: Array<CalendarEvent> = [{
    start: startOfDay(new Date()),
    title: 'an event',
    color: this.color,
    meta: 1.5
  }];

  getEvents() {

    return Observable.create((observer) => {

      setTimeout(() => {
        observer.next(this.events);
      }, 500);
    });
  }
}
