import {Component, OnInit, forwardRef} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ControlValueAccessor} from '@angular/forms/src/directives';
import {MatFormFieldControl} from '@angular/material';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, ControlValueAccessor {

  private _startTime: string;
  private _endTime: string;
  private _note: string;
  onChangeCallback = (value) => {};
  onTouchedCallback = (value) => {};

  private originalData: any;

  constructor() { }

  ngOnInit() {
  }

  get startTime() {
    return this.originalData.startTime;
  }

  set startTime(value: string) {
    this.originalData.startTime = value;
    this.onChangeCallback(this.originalData);
  }

  get endTime() {
    return this.originalData.endTime;
  }

  set endTime(value: string) {
    this.originalData.endTime = value;
    this.onChangeCallback(this.originalData);
  }

  get note() {
    return this._note;
  }

  set note(value: string) {
    this.originalData.note = value;
    this.onChangeCallback(this.originalData);
  }

  writeValue(data: any) {

    console.log(data);
    this.originalData = data;
  }

  registerOnChange(fn) {

    this.onChangeCallback = fn;
  }

  registerOnTouched(fn) {

    this.onTouchedCallback = fn;
  }
}
