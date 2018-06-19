import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as format from 'date-fns/format';

import {GlobalStateService} from '../../shared/services/global-state.service';
import {RecordEditService} from './record-edit.service';
import {ConfirmDialogComponent} from '../../shared/components/dialog/confirm/confirm-dialog.component';

@Component({
  selector: 'app-event-edit',
  templateUrl: 'record-edit.component.html',
  styleUrls: ['record-edit.component.scss']
})
export class RecordEditComponent implements OnInit {

  recordId: string;
  overtime: string | number;
  date: Date;
  events: Array<any>;
  originData: any = null;
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public dialogRef: MatDialogRef<RecordEditComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private recordEditService: RecordEditService,
    private globalStateService: GlobalStateService
  ) {
  }

  ngOnInit() {
    this.originData = Object.assign({}, this.data);
    this.initData();
  }

  doSave() {
    let params = this.getParams();

    if (params.id) {

      if (params.overtime || params.events.length > 0) {

        this.updateRecord(params);
      } else {

        this.deleteRecord(params);
      }
    } else {

      this.createRecord(params);
    }

  }

  createRecord(params) {

    delete params.id;

    this.recordEditService.createRecord(params).subscribe((res) => {

      console.log(res);
    });
  }

  updateRecord(params) {

    this.recordEditService.updateRecord(params).subscribe((res) => {

      console.log(res);
    });
  }

  deleteRecord(params) {

    this.recordEditService.deleteRecord(params).subscribe((res) => {

      console.log(res);
    });
  }

  initData() {

    this.date = this.data.date;

    if (this.data.events && this.data.events[0] && this.data.events[0].meta) {

      this.recordId = this.data.events[0].meta.recordId;
      this.overtime = this.data.events[0].meta.overtime;

      this.events = this.data.events.map((item) => {
        let temp: any = {};

        temp.startTime = format(item.start, 'hh:mm');
        temp.endTime = format(item.end, 'hh:mm');
        temp.note = item.meta.note;

        return temp;
      });
    } else {
      this.recordId = '';
      this.overtime = '';
      this.events = [];
    }
  }

  getParams() {
    let params: any = {};

    params.id = this.recordId;
    params.username = this.globalStateService.userInfo.username;
    params.date = this.date;
    params.overtime = this.overtime;
    params.events = this.events.map((item) => {
      let temp: any = {};
      let startTime = item.startTime.split(':');
      let endTime = item.endTime.split(':');

      temp.recordId = Number(this.recordId);
      temp.startTime = new Date(this.date.setHours(startTime[0], startTime[1]));
      temp.endTime = new Date(this.date.setHours(endTime[0], endTime[1]));
      temp.note = item.note;

      return temp;
    });

    return params;
  }

  addEvent() {
    this.events.push({
      startTime: '',
      endTime: '',
      note: ''
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

  setTime(date: Date, events: Array<any>) {

    let copiedDate = new Date(date.getTime());

    if (!events) return [];

    return events.map((item) => {

      let [startHour, startMinute] = item.start.split(':');
      let [endHour, endMinute] = item.end.split(':');

      return {
        start: date.setHours(startHour, startMinute),
        end: copiedDate.setHours(endHour, endMinute),
        note: item.note,
        meta: {
          overtime: this.overtime
        }
      };
    });
  }
}
