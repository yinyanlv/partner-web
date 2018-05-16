import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CalendarDateFormatter, CalendarEvent} from 'angular-calendar';
import * as startOfDay from 'date-fns/start_of_day';

import {CalendarDialogComponent} from './calendar-dialog/calendar-dialog.component';
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

  public calendarMode: string = 'month';
  public date: Date = new Date();
  public locale: string = 'zh';
  public timeCount: number = 0;
  public events: Array<CalendarEvent> = [];
  private dialogRef: MatDialogRef<CalendarDialogComponent>;
  public isLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private service: WorkService
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

      if (!data) return;

      if (data.isUpdate) {

        if (data.timeCount) {  // 更新
          event.day.events[0].meta = data.timeCount;
        } else {  // 删除
          event.day.events[0] = null;
          event.day.badgeTotal = 0;
        }
      } else {  // 增加

        this.events = this.events.concat({
          start: startOfDay(data.date),
          title: data.timeCount + '小时',
          meta: data.timeCount
        });
      }

      this.updateTimeCount();
    });
  }

  updateTimeCount() {
    let sum = 0;

    this.events.forEach((item) => {

      sum += item.meta;
    });

    this.timeCount = sum;
  }

  changeCalendarMode(mode: string) {

    this.calendarMode = mode;
    this.getEvents();
  }

  getEvents() {

    this.isLoading = true;

    setTimeout(() => {
      this.events = this.service.getEvents();
      this.updateTimeCount();
      this.isLoading = false;
    }, 1000);
  }
}
