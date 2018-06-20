import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CalendarDateFormatter, CalendarEvent} from 'angular-calendar';
import * as getYear from 'date-fns/get_year';
import * as getMonth from 'date-fns/get_month';

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
  private dialogRef: MatDialogRef<RecordEditComponent>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private workService: WorkService,
    private globalStateService: GlobalStateService
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
      width: '1100px',
      data: {
        date: event.day.date,
        events: event.day.events
      }
    });

    this.dialogRef.afterClosed().subscribe((data) => {

      if (data) {

        this.snackBar.open(data.message, '知道了', {
          duration: 3000,
          verticalPosition: 'top'
        });

        this.loadRecords();
      }
    });
  }

  updateTimeCount() {
    let sum = 0;

    this.workService.originalData.forEach((item: any) => {

      sum += item.overtime;
    });

    this.overtimeCount = sum;
  }

  loadRecords() {

    let username = this.globalStateService.userInfo.username;

    this.workService.getRecords({
      username: username,
      year: getYear(this.date),
      month: getMonth(this.date) + 1
    }).subscribe((res) => {

      this.events = res.data;

      this.updateTimeCount();
    }, (res) => {

      this.snackBar.open(res.message, '知道了', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
}
