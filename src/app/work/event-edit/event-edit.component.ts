import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as format from 'date-fns/format';

import {ConfirmDialogComponent} from '../../shared/components/dialog/confirm/confirm-dialog.component';

@Component({
  selector: 'app-event-edit',
  templateUrl: 'event-edit.component.html',
  styleUrls: ['event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  timeCount: string | number;
  date: Date;
  events: Array<any>;
  private isUpdate: boolean = false;
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public dialogRef: MatDialogRef<EventEditComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {

    this.date = this.data.date;
    this.events = this.getTime(this.data.events);
    this.timeCount = this.data.timeCount;

    if (this.events && this.events.length > 0 || this.timeCount > 0) {
      this.isUpdate = true;
    }
  }

  updateEvent() {

    this.dialogRef.close({
      isUpdate: this.isUpdate,
      date: this.date,
      events: this.setTime(this.date, this.events),
      timeCount: this.timeCount
    });
  }

  addEvent() {
    this.events.push({
      start: new Date(),
      end: new Date(),
      title: ''
    });
  }

  deleteEvent(event, index) {

    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        content: `您确定要删除事务${index + 1}？`
      }
    });

    this.confirmDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.events.splice(index, 1);
      }
    });
  }

  getTime(events: Array<any>) {

    if (!events) return [];

    return events.map((item) => {

      return {
        start: format(item.start, 'hh:mm'),
        end: format(item.end, 'hh:mm'),
        title: item.title
      };
    });
  }

  setTime(date: Date, events: Array<any>) {

    let copiedDate = new Date(date.getTime());

    if (!events) return [];

    return events.map((item) => {

      let [startHour, startMinute] = item.start.split(':');
      let [endHour, endMinute] = item.end.split(':');

      return {
        start: date.setHours(startHour, startMinute),
        end: copiedDate.setHours(endHour, endMinute),
        title: item.title
      };
    });
  }
}
