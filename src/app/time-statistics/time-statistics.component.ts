import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import {CalendarEvent, CalendarDateFormatter, CalendarEventAction} from 'angular-calendar';
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
  private actions: Array<CalendarEventAction> = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        // this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        // this.handleEvent('Deleted', event);
      }
    }
  ];
  private events: Array<CalendarEvent> = [{
    start: startOfDay(new Date()),
    title: 'an event',
    color: this.color,
    action: this.actions
  }];
  private dialogConfig: MatDialogConfig = {
    width: '400px'
  };
  private dialogRef: MatDialogRef<CalendarDialogComponent>;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  dayClicked(e) {

    this.dialogRef = this.dialog.open(CalendarDialogComponent, this.dialogConfig);

    this.dialogRef.afterClosed().subscribe((data) => {

    });
  }
}
