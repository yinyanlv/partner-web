import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-event-edit',
  templateUrl: 'event-edit.component.html',
  styleUrls: ['event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  public timeCount: string | number;
  public date: Date;
  private isUpdate: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EventEditComponent>,
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
}
