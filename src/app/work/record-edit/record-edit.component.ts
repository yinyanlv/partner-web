import { Component, OnInit, Inject, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as format from 'date-fns/format';
import * as startOfDay from 'date-fns/start_of_day';

import {GlobalStateService} from '../../shared/services/global-state.service';
import {ConfirmDialogService} from '../../shared/services/confirm-dialog.service';
import {RecordEditService} from './record-edit.service';
import {EventComponent} from './event/event.component';

@Component({
  selector: 'app-event-edit',
  templateUrl: 'record-edit.component.html',
  styleUrls: ['record-edit.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => {
      EventComponent
    }),
    multi: true
  }]
})
export class RecordEditComponent implements OnInit {

  recordId: string;
  overtime: string | number;
  date: Date;
  events: Array<any>;
  originData: any = null;
  isShowDeleteBtn: boolean = false;
  aaa = {};

  constructor(
    public dialogRef: MatDialogRef<RecordEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private globalStateService: GlobalStateService,
    private confirmDialogService: ConfirmDialogService,
    private recordEditService: RecordEditService,
  ) {
  }

  ngOnInit() {
    this.originData = Object.assign({}, this.data);
    this.initData();
    this.isShowDeleteBtn = this.events.length > 0 || this.overtime > 0;
  }

  doSave() {
    let params = this.getParams();

    if (params.id) {

      this.updateRecord(params);
    } else {

      this.createRecord(params);
    }
  }

  createRecord(params) {

    delete params.id;

    this.recordEditService.createRecord(params).subscribe((res) => {

      if (res.success) {

        this.dialogRef.close({
          message: '记录创建成功'
        });
      } else {

        this.recordEditService.showMessage(res.message);
      }
    });
  }

  updateRecord(params) {

    this.recordEditService.updateRecord(params).subscribe((res) => {

      if (res.success) {

        this.dialogRef.close({
          message: '记录更新成功'
        });
      } else {

        this.recordEditService.showMessage(res.message);
      }
    });
  }

  deleteRecord() {

    this.confirmDialogService.show({
      content: `您确定要删除该条工作记录？`
    }, (data) => {

      if (data) {

        let params = this.getParams();

        this.recordEditService.deleteRecord({
          recordId: params.id,
          username: params.username
        }).subscribe((res) => {

          if (res.success) {

            this.dialogRef.close({
              message: '记录删除成功'
            });
          } else {

            this.recordEditService.showMessage(res.message);
          }
        });
      }
    });
  }

  initData() {

    this.date = this.data.date;

    if (this.data.events && this.data.events[0] && this.data.events[0].meta) {

      this.recordId = this.data.events[0].meta.recordId;
      this.overtime = this.data.events[0].meta.overtime;

      let eventList = this.data.events.slice(1, this.data.events.length);

      this.events = eventList.map((item) => {
        let temp: any = {};

        temp.startTime = format(item.start, 'HH:mm');
        temp.endTime = format(item.end, 'HH:mm');
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
    params.date = startOfDay(this.date);
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

    this.confirmDialogService.show({
      content: `您确定要删除事务${index + 1}？`
    }, (data) => {

      if (data) {
        this.events.splice(index, 1);
      }
    });
  }
}
