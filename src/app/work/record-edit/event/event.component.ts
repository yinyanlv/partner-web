import {Component, OnInit, forwardRef} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validators,
  Validator
} from '@angular/forms';
import {ControlValueAccessor} from '@angular/forms/src/directives';

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

  propagateChange = (_: any) => {
  };
  propagateTouched = (_: any) => {
  };
  group: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.group = this.fb.group({
      note: [null, [Validators.required]]
    });
  }

  onNoteChange() {
    this.propagateChange(this.group.value);
  }

  writeValue(data: any) {

    if (data) {
      this.group.patchValue(data);
    }
  }

  registerOnChange(fn) {

    this.propagateChange = fn;
  }

  registerOnTouched(fn) {

    this.propagateTouched = fn;
  }

  validate(control: AbstractControl) {

    let result = {};

    if (this.group.get('note').hasError('required')) {

      Object.assign(result, {
        noteRequired: true
      });
    }

    return Object.keys(result).length > 0 ? result : null;
  }

  markAsTouched() {

    this.group.get('note').markAsTouched();
  }
}
