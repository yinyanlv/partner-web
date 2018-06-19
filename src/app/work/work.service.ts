import { Injectable } from '@angular/core';
import {CalendarEvent} from 'angular-calendar';

@Injectable()
export class WorkService {

  constructor() { }

  private events: Array<CalendarEvent> = [{
    start: new Date(),
    end: new Date(),
    title: '',
    meta: {
      recordId: '',
      overtime: 2,
      note: '王大崔'
    }
  }, {
    start: new Date(),
    end: new Date(),
    title: '',
    meta: {
      recordId: '',
      overtime: 2,
      note: 'hhe'
    }
  }];

  getRecords() {

    return this.events;
  }
}
