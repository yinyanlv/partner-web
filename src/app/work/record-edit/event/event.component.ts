import {Component, OnInit, forwardRef} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ControlValueAccessor} from '@angular/forms/src/directives';
import {MatFormFieldControl} from '@angular/material';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => {
      EventComponent
    }),
    multi: true
  }]
})
export class EventComponent implements OnInit, ControlValueAccessor {

  private _startTime: string;
  private _endTime: string;
  private _note: string;
  onChangeCallback = (value) => {};
  onTouchedCallback = (value) => {};

  constructor() { }

  ngOnInit() {
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(value: string) {
    this._startTime = value;
    this.onChangeCallback({
      startTime: this._startTime,
      endTime: this._endTime,
      note: this._note
    });
  }

  get endTime() {
    return this._endTime;
  }

  set endTime(value: string) {
    this._endTime = value;
    this.onChangeCallback({
      startTime: this._startTime,
      endTime: this._endTime,
      note: this._note
    });
  }

  get note() {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
    this.onChangeCallback({
      startTime: this._startTime,
      endTime: this._endTime,
      note: this._note
    });
  }

  writeValue(value: any) {

    this._startTime = value.startTime;
    this._endTime = value.endTime;
    this._note = value.note;
  }

  registerOnChange(fn) {

    this.onChangeCallback = fn;
  }

  registerOnTouched(fn) {

    this.onTouchedCallback = fn;
  }
}
