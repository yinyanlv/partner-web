import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {USERNAME_REGEX, EMAIL_REGEX} from '../../shared/etc/regex';
import {SettingsService} from './settings.service';

let newPassword = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
let confirmNewPassword = new FormControl(null, CustomValidators.equalTo(newPassword));

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isUserInfoSubmitting: boolean;
  isShowUserInfoError: boolean = false;
  userInfoErrorMessage: string = '';
  userInfoForm: FormGroup;
  isPasswordSubmitting: boolean;
  isShowPasswordError: boolean = false;
  passwordErrorMessage: string = '';
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {

    this.userInfoForm = this.fb.group({
        username: [null, [Validators.required, Validators.pattern(USERNAME_REGEX), Validators.minLength(2), Validators.maxLength(20)]],
        nickname: [null, [Validators.maxLength(50)]],
        email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]]
      });

    this.passwordForm = this.fb.group({
      oldPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword
    });
  }

  saveUserInfo() {

    this.isShowUserInfoError = false;

    if (this.userInfoForm.valid) {

      this.isUserInfoSubmitting = true;

      this.settingsService.updateUserInfo(this.userInfoForm.value).subscribe((res) => {

        this.isShowUserInfoError = false;

        if (res.success) {

        } else {

          this.isShowUserInfoError = true;
          this.userInfoErrorMessage = res.message;
        }

        this.isUserInfoSubmitting = false;
      }, null, () => {

        this.isUserInfoSubmitting = false;
      });
    }
  }

  resetUserInfo() {
    this.userInfoForm.reset();
  }

  savePassword() {

    this.isShowPasswordError = false;

    if (this.passwordForm.valid) {

      this.isShowPasswordError = true;

      this.settingsService.updatePassword(this.passwordForm.value).subscribe((res) => {

        this.isShowPasswordError = false;

        if (res.success) {

        } else {

          this.isShowPasswordError = true;
          this.passwordErrorMessage = res.message;
        }

        this.isPasswordSubmitting = false;
      }, null, () => {

        this.isPasswordSubmitting = false;
      });
    }
  }

  resetPasswordForm() {
    this.passwordForm.reset();
  }

  checkErrorMatch(form: FormGroup, name: string, type: string): boolean {

    return form.controls[name].touched && form.controls[name].hasError(type);
  }
}
