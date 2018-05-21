import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {BaseComponent} from '../shared/etc/base-component';
import {LoginService} from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      rememberMe: [null]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginService.login(this.form.value);
    }
  }
}
