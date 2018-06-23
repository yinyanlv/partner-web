import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {ForgotService} from './forgot.service';
import {EMAIL_REGEX} from '../shared/etc/regex';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  isSubmitting: boolean;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgotService: ForgotService
  ) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]]
    });
  }

  onSubmit() {

    this.form.controls['email'].setErrors(null);

    if (this.form.valid) {

      return this.forgotService.showMessage('该功能尚未实现，敬请期待');
    }
  }

  checkErrorMatch(name: string, type: string): boolean {

    return this.form.controls[name].touched && this.form.controls[name].hasError(type);
  }
}
