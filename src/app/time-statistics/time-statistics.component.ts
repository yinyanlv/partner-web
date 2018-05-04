import { Component, OnInit } from '@angular/core';
import {CalendarEvent, CalendarDateFormatter} from 'angular-calendar';

import {CustomCalendarDateFormatter} from '../shared/etc/custom-calendar-date-formatter';

@Component({
  selector: 'app-time-statistics',
  templateUrl: './time-statistics.component.html',
  styleUrls: ['./time-statistics.component.scss'],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomCalendarDateFormatter
  }]
})
export class TimeStatisticsComponent implements OnInit {

  calendarMode: string = 'month';

  date: Date = new Date();

  locale: string = 'zh';

  events: Array<CalendarEvent> = null;

  constructor() { }

  ngOnInit() {
  }

}
