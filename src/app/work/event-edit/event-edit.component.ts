import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ConfirmDialogComponent} from '../../shared/components/dialog/confirm/confirm-dialog.component';

@Component({
  selector: 'app-event-edit',
  templateUrl: 'event-edit.component.html',
  styleUrls: ['event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  timeCount: string | number;
  date: Date;
  events: Array<any> = [{}, {}];
  private isUpdate: boolean = false;
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private dialogRef: MatDialogRef<EventEditComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {

    this.date = this.data.day.date;
    this.timeCount = this.data.day.events && this.data.day.events[0] && this.data.day.events[0].meta;

    if (this.timeCount) {
      this.isUpdate = true;
    }
  }

  updateEvent() {
    this.dialogRef.close({
      isUpdate: this.isUpdate,
      date: this.date,
      timeCount: this.timeCount
    });
  }

  addEvent() {
    this.events.push({});
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
}
