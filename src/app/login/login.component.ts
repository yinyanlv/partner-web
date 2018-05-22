import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {BaseComponent} from '../shared/etc/base-component';
import {LoginService} from './login.service';
import {GlobalStateService} from '../shared/services/global-state.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  isShowError: boolean = false;
  isSubmitting: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private globalStateService: GlobalStateService,
    private router: Router,
    private route: ActivatedRoute
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
      this.isSubmitting = true;
      this.loginService.login(this.form.value).subscribe((res) => {

        if (res.success) {
          this.globalStateService.isLogin = true;

          this.router.navigate([this.route.snapshot.queryParams.redirectTo || '']);
        }
      });
    }
  }
}
