import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {RegisterService} from './register.service';
import {USERNAME_REGEX, EMAIL_REGEX} from '../shared/etc/regex';

let password = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
let confirmPassword = new FormControl(null, CustomValidators.equalTo(password));

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isSubmitting: boolean;
  isShowError: boolean = false;
  errorMessage: string = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.pattern(USERNAME_REGEX), Validators.minLength(2), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  onSubmit() {

    this.isShowError = false;

    if (this.form.valid) {

      this.isSubmitting = true;

      this.registerService.register(this.form.value).subscribe((res) => {

        this.isSubmitting = false;

        if (res.success) {

        } else {

          this.isShowError = true;
          this.errorMessage = res.message;
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
