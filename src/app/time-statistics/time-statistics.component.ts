import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import {CalendarEvent, CalendarDateFormatter} from 'angular-calendar';

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
  private events: Array<CalendarEvent> = null;
  private dialogConfig: MatDialogConfig = {
    width: '400px'
  };
  private dialogRef: MatDialogRef<CalendarDialogComponent>;

  constructor(
    private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  dayClicked(e) {
    console.log(e);

    this.dialogRef = this.dialog.open(CalendarDialogComponent, this.dialogConfig);

    this.dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }
}
