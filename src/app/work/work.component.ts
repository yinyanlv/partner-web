import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarDateFormatter, CalendarEvent} from 'angular-calendar';
import 'rxjs/Rx';

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
  timeCount: number = 0;
  events: Array<CalendarEvent> = [];
  private dialogRef: MatDialogRef<RecordEditComponent>;
  isLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private workService: WorkService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((e) => {
    });

    this.getRecords();
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
        events: event.day.events,
        timeCount: this.timeCount
      }
    });

    this.dialogRef.afterClosed().subscribe((data) => {

      this.events = data.events;
      // this.updateTimeCount();
    });
  }

  updateTimeCount() {
    let sum = 0;

    this.events.forEach((item) => {

      sum += item.meta;
    });

    this.timeCount = sum;
  }

  getRecords() {

    this.isLoading = true;

    setTimeout(() => {
      this.events = this.workService.getRecords();
      this.updateTimeCount();
      this.isLoading = false;
    }, 1000);
  }
}
