import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CalendarDateFormatter, CalendarEvent} from 'angular-calendar';
import * as startOfMonth from 'date-fns/start_of_month';
import * as endOfMonth from 'date-fns/end_of_month';

import {GlobalStateService} from '../shared/services/global-state.service';
import {RecordEditComponent} from './record-edit/record-edit.component';
import {CustomCalendarDateFormatter} from '../shared/etc/custom-calendar-date-formatter';
import {WorkService} from './work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomCalendarDateFormatter
  }]
})
export class WorkComponent implements OnInit {

  calendarMode: string = 'month';
  date: Date = new Date();
  locale: string = 'zh';
  events: Array<CalendarEvent> = [];
  overtimeCount: number = 0;
  eventCount: number = 0;
  private dialogRef: MatDialogRef<RecordEditComponent>;

  constructor(
    private dialog: MatDialog,
    private globalStateService: GlobalStateService,
    private workService: WorkService
  ) {
  }

  ngOnInit() {

    this.loadRecords();
  }

  onClickDay(event) {

    this.openEditDialog(event);
  }

  openEditDialog(event) {

    if (event && event.day && !event.day.inMonth) return;

    this.dialogRef = this.dialog.open(RecordEditComponent, {
      data: {
        date: event.day.date,
        events: event.day.events
      }
    });

    this.dialogRef.afterClosed().subscribe((data) => {

      if (data) {

        this.workService.showMessage(data.message);

        this.loadRecords();
      }
    });
  }

  updateMonthCount() {

    let overTimeSum = 0;
    let eventSum = 0;

    this.workService.originalData.forEach((item: any) => {

      overTimeSum += item.overtime * 1000;
      eventSum += item.events.length;
    });

    this.overtimeCount = overTimeSum / 1000;
    this.eventCount = eventSum;
  }

  loadRecords() {

    let username = this.globalStateService.userInfo.username;

    this.workService.getRecords({
      username: username,
      startDate: startOfMonth(this.date),
      endDate: endOfMonth(this.date)
    }).subscribe((res) => {

      if (res.success) {

        this.events = res.data;
        this.updateMonthCount();
      } else {
        this.workService.showMessage(res.message);
      }
    });
  }
}
