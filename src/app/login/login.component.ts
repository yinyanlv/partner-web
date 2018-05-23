import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AutofillMonitor, AutofillEvent} from '@angular/cdk/text-field';

import {BaseComponent} from '../shared/etc/base-component';
import {LoginService} from './login.service';
import {GlobalStateService} from '../shared/services/global-state.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {

  hasAutofilled: boolean = false;
  isShowError: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  form: FormGroup;

  @ViewChild('username', {read: ElementRef})
  username: ElementRef;

  @ViewChild('password', {read: ElementRef})
  password: ElementRef;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private globalStateService: GlobalStateService,
    private router: Router,
    private route: ActivatedRoute,
    private autofill: AutofillMonitor,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit() {

    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      rememberMe: [null]
    });

    // fix: in Chrome browser, it does not allow access to the value of the password field after autofill (before user click on the page)
    this.autofill.monitor(this.password.nativeElement)
      .subscribe((e: AutofillEvent) => {

        if (e.isAutofilled) {

          this.hasAutofilled = true;
        }
      });
  }

  onSubmit() {

    this.isShowError = false;

    if (this.form.valid) {
      this.isSubmitting = true;
      this.loginService.login(this.form.value).subscribe((res) => {

        this.isSubmitting = false;

        if (res.success) {

          this.globalStateService.isLogin = true;

          this.router.navigate([this.route.snapshot.queryParams.redirectTo || '']);
        } else {

          this.isShowError = true;
          this.errorMessage = res.message;
        }
      });
    }
  }

  ngOnDestroy() {

    this.autofill.stopMonitoring(this.password.nativeElement);
  }
}
