import { Injectable } from '@angular/core';
import {CalendarEvent} from 'angular-calendar';

@Injectable()
export class WorkService {

  constructor() { }

  private events: Array<CalendarEvent> = [{
    start: new Date(),
    end: new Date(),
    title: '王大崔'
  }, {
    start: new Date(),
    end: new Date(),
    title: '呵呵'
  }];

  getEvents() {

    return this.events;
  }
}
