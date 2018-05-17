import { Injectable } from '@angular/core';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import * as startOfDay from 'date-fns/start_of_day';

@Injectable()
export class WorkService {

  constructor() { }

  private actions: CalendarEventAction[] = [{
    label: '<i class="material-icons">add_circle</i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
    }
  }, {
    label: '<i class="material-icons">edit</i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
    }
  }, {
    label: '<i class="material-icons">delete_outline</i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
    }
  }];

  private events: Array<CalendarEvent> = [{
    start: startOfDay(new Date()),
    title: '1.5小时',
    meta: 1.5,
    actions: this.actions
  }];

  getEvents() {

    return this.events;
  }
}