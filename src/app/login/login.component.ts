import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
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

  isValid: boolean;
  isShowError: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  form: FormGroup;

  @ViewChild('password', {read: ElementRef})
  password: ElementRef;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private globalStateService: GlobalStateService,
    private router: Router,
    private route: ActivatedRoute,
    private autofill: AutofillMonitor
  ) {
    super();
  }

  ngOnInit() {

    this.autofill.monitor(this.password.nativeElement)
      .subscribe((e: AutofillEvent) => {

        if (e.isAutofilled) {

          this.isValid = this.form.valid;

          console.log(this.isValid);
        }
      });

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

          this.isShowError = false;
          this.errorMessage = '';

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

    // this.autofill.stopMonitoring(this.password.nativeElement);
  }
}
