import { Injectable } from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import * as startOfDay from 'date-fns/start_of_day';

@Injectable()
export class WorkService {

  constructor() { }

  private events: Array<CalendarEvent> = [{
    start: startOfDay(new Date()),
    title: '1.5小时',
    meta: 1.5
  }];

  getEvents() {

    return this.events;
  }
}
