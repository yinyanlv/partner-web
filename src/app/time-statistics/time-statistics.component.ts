import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CalendarDateFormatter, CalendarEvent} from 'angular-calendar';
import {Observable} from 'rxjs/Observable';

import {CalendarDialogComponent} from './calendar-dialog/calendar-dialog.component';
import {CustomCalendarDateFormatter} from '../shared/etc/custom-calendar-date-formatter';
import {TimeStatisticsService} from './time-statistics.service';

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
  private events$: Observable<Array<CalendarEvent>>;
  private dialogRef: MatDialogRef;

  constructor(
    private dialog: MatDialog,
    private service: TimeStatisticsService
  ) {
  }

  ngOnInit() {

    this.getEvents();
  }

  onClickDay(event) {

    this.dialogRef = this.dialog.open(CalendarDialogComponent, {
      data: event
    });

    this.dialogRef.afterClosed().subscribe((data) => {
    });
  }

  changeCalendarMode(mode: string) {

    this.calendarMode = mode;
    this.getEvents();
  }

  getEvents() {

    this.events$ = this.service.getEvents();
  }
}
