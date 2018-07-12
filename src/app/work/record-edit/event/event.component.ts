import {Component, OnInit, forwardRef} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validators,
  Validator
} from '@angular/forms';
import {ControlValueAccessor} from '@angular/forms/src/directives';
import {AmazingTimePickerService} from 'amazing-time-picker';

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

  startTime: string = '';
  endTime: string = '';
  propagateChange = (_: any) => {
  };
  propagateTouched = (_: any) => {
  };
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private timePicker: AmazingTimePickerService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      note: [null]
    }, {
      validator: this.validateTime()
    });
  }

  openStartTimePicker() {

    let amazingTimePicker = this.timePicker.open({
      time: this.startTime,
      locale: 'ch'
    });

    amazingTimePicker.afterClose().subscribe((time) => {
      this.startTime = time;
      this.form.get('startTime').patchValue(this.startTime, {
        emitModelToViewChange: false
      });
      this.propagateChange(this.getData());
    });
  }

  openEndTimePicker() {

    let amazingTimePicker = this.timePicker.open({
      time: this.endTime,
      locale: 'ch'
    });
    amazingTimePicker.afterClose().subscribe((time) => {
      this.endTime = time;
      this.form.get('endTime').patchValue(this.endTime, {
        emitModelToViewChange: false
      });
      this.propagateChange(this.getData());
    });
  }

  onNoteChange() {
    this.propagateChange(this.getData());
  }

  getData() {
    return this.form.value;
  }

  private validateTime() {

    return (group: FormGroup) => {

      if (!this.startTime || !this.endTime) return;

      let date = new Date();
      let startTimeList: Array<string> = this.startTime.split(':');
      let endTimeList: Array<string> = this.endTime.split(':');

      let startTime = new Date(date.setHours(startTimeList['0'], startTimeList['1']));
      let endTime = new Date(date.setHours(endTimeList['0'], endTimeList['1']));

      if (endTime < startTime) {
        return {
          timeRange: true
        };
      }
    };
  }

  writeValue(data: any) {

    if (data) {

      this.startTime = data.startTime;
      this.endTime = data.endTime;
      this.form.patchValue(data);
    }
  }

  registerOnChange(fn) {

    this.propagateChange = fn;
  }

  registerOnTouched(fn) {

    this.propagateTouched = fn;
  }

  validate(control: AbstractControl) {

    if (this.form.hasError('timeRange')) {

      return {
        timeRange: true
      };
    } else {

      let startTime = this.form.get('startTime');
      let endTime = this.form.get('endTime');

      if (startTime.hasError('required') && endTime.hasError('required')) {

        return {
          startRequired: true,
          endRequired: true
        };
      }

      if (startTime.hasError('required')) {

        return {
          startRequired: true
        };
      }

      if (endTime.hasError('required')) {

        return {
          endRequired: true
        };
      }
    }
  }

  markAsTouched() {
    this.form.get('startTime').markAsTouched();
    this.form.get('endTime').markAsTouched();
  }
}
