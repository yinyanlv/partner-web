import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss']
})
export class CalendarDialogComponent implements OnInit {

  private timeCount: string | number;
  private date: Date;
  private isUpdate: boolean = false;

  constructor(
    private dialogRef: MatDialogRef,
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
