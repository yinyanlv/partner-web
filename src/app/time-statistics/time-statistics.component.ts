import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import {CalendarEvent, CalendarDateFormatter} from 'angular-calendar';
import * as startOfDay from 'date-fns/start_of_day';

import {CalendarDialogComponent} from './calendar-dialog/calendar-dialog.component';
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

  private calendarMode: string = 'month';
  private date: Date = new Date();
  private locale: string = 'zh';
  private timeCount: number = 33;
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

  private dialogRef: MatDialogRef<CalendarDialogComponent, any>;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  onClickDay(event) {

    console.log(event);
    // this.dialogRef = this.dialog.open(CalendarDialogComponent, {
    //   data: event
    // });
    //
    // this.dialogRef.afterClosed().subscribe((data) => {
    // });
  }
}
