import {Component, OnInit, forwardRef, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, AbstractControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, Validator} from '@angular/forms';
import {ControlValueAccessor} from '@angular/forms/src/directives';
import {MatFormFieldControl} from '@angular/material';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EventComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EventComponent),
    multi: true
  }]
})
export class EventComponent implements OnInit, ControlValueAccessor, Validator {

  private _startTime: string = '';
  private _endTime: string = '';
  private _note: string = '';
  onChange = (_: any) => {};
  onTouched = (_: any) => {};
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      startTime: [this._startTime, [Validators.required]],
      endTime: [this._endTime, [Validators.required]],
      note: [this._note]
    }, {
      validator: this.validateTime()
    });
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(value: string) {
    this._startTime = value;
    this.onChange(this.getData());
  }

  get endTime() {
    return this._endTime;
  }

  set endTime(value: string) {
    this._endTime = value;
    this.onChange(this.getData());
  }

  get note() {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
    this.onChange(this.getData());
  }

  private getData() {

    return {
      startTime: this._startTime,
      endTime: this._endTime,
      note: this._note
    };
  }

  private validateTime() {

    return (group: FormGroup) => {
      let startTime = group.controls['startTime'].value;
      let endTime = group.controls['endTime'].value;

      if (!startTime || !endTime) return;

      let date = new Date();
      let startTimeList = startTime.split(':');
      let endTimeList = endTime.split(':');

      startTime = new Date(date.setHours(startTimeList[0], startTimeList[1]));
      endTime = new Date(date.setHours(endTimeList[0], endTimeList[1]));

      if (endTime < startTime) {
        return {
          time: '结束时间早于开始时间'
        };
      }
    };
  }

  writeValue(data: any) {

    if (data) {
      this._startTime = data.startTime || '';
      this._endTime = data.endTime || '';
      this._note = data.startTime || '';
    }
  }

  registerOnChange(fn) {

    this.onChange = fn;
  }

  registerOnTouched(fn) {

    this.onTouched = fn;
  }

  validate(control: AbstractControl) {

    if (this.form.valid) {
      return null;
    } else {
      return {
        event: true
      };
    }
  }
}
