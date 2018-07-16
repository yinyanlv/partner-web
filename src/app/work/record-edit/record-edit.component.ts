import {Component, OnInit, Inject, ViewChildren, QueryList} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DragulaService} from 'ng2-dragula';
import * as startOfDay from 'date-fns/start_of_day';

import {GlobalStateService} from '../../shared/services/global-state.service';
import {ConfirmDialogService} from '../../shared/services/confirm-dialog.service';
import {RecordEditService} from './record-edit.service';
import {EventComponent} from './event/event.component';

@Component({
  selector: 'app-event-edit',
  templateUrl: 'record-edit.component.html',
  styleUrls: ['record-edit.component.scss']
})
export class RecordEditComponent implements OnInit {

  private recordId: string;
  private overtime: string | number;
  private date: Date;
  private events: Array<any>;
  originData: any = null;
  isShowDeleteBtn: boolean = false;
  form: FormGroup;

  @ViewChildren(EventComponent)
  eventCmpList: QueryList<EventComponent>;

  constructor(
    public dialogRef: MatDialogRef<RecordEditComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dragulaService: DragulaService,
    private globalStateService: GlobalStateService,
    private confirmDialogService: ConfirmDialogService,
    private recordEditService: RecordEditService,
  ) {
  }

  ngOnInit() {
    this.originData = Object.assign({}, this.data);
    this.initData();
    this.isShowDeleteBtn = !!this.recordId;

    this.form = this.fb.group({
      date: [{value: this.date, disabled: true}],
      overtime: [this.overtime, [Validators.min(0.01), Validators.max(24)]],
      events: this.fb.array(this.events)
    });

    this.dragulaService.dropModel.subscribe(() => {
      this.form.get('events').updateValueAndValidity();
    });
  }

  get eventsModel() {

    return (this.form.get('events') as FormArray).controls;
  }

  doSave() {

    if (this.form.valid) {

      let overtime = this.form.get('overtime');

      if (!overtime.value && overtime.value !== 0 && this.form.value.events.length === 0) {

        overtime.setErrors({required: true});
        overtime.markAsTouched();
        return;
      }

      let params = this.getParams();

      if (params.id) {

        this.updateRecord(params);
      } else {

        this.createRecord(params);
      }
    } else {

      this.form.get('overtime').markAsTouched();
      this.eventCmpList.forEach((item) => {

        item.markAsTouched();
      });
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
      this.overtime = this.data.events[0].meta.overtime ? this.data.events[0].meta.overtime : null;

      let eventList = this.data.events.slice(1, this.data.events.length);

      this.events = eventList.map((item) => {
        let temp: any = {};

        temp.startTime = item.start;
        temp.endTime = item.end;
        temp.note = item.meta.note;

        return temp;
      });
    } else {
      this.recordId = '';
      this.overtime = null;
      this.events = [];
    }
  }

  getParams() {
    let params: any = {};
    let formValue = this.form.value;

    params.id = this.recordId;
    params.username = this.globalStateService.userInfo.username;
    params.date = startOfDay(this.date);
    params.overtime = formValue.overtime ? formValue.overtime : 0;
    params.events = formValue.events.map((item) => {
      let temp: any = {};

      temp.recordId = Number(this.recordId);
      temp.startTime = new Date(this.date);
      temp.endTime = new Date(this.date);
      temp.note = item.note;

      return temp;
    });

    return params;
  }

  addEvent() {

    let events = this.form.get('events') as FormArray;

    events.push(this.fb.control(null));
  }

  deleteEvent(index) {

    let events = this.form.get('events') as FormArray;

    events.removeAt(index);
  }
}
