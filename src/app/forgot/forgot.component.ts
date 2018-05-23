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
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]]
    });
  }

  onSubmit() {

    this.form.controls['email'].setErrors(null);

    if (this.form.valid) {

      this.isSubmitting = true;

      this.forgotService.forgot(this.form.value).subscribe((res) => {

        this.isSubmitting = false;

        if (res.success) {

        } else {

          this.form.controls['email'].setErrors({
            notExists: res.message || '该邮箱未曾在本站注册'
          });
        }

      }, null, () => {

        this.isSubmitting = false;
      });
    }
  }

  checkErrorMatch(name: string, type: string): boolean {

    return this.form.controls[name].touched && this.form.controls[name].hasError(type);
  }
}
