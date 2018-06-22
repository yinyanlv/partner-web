import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AutofillMonitor, AutofillEvent} from '@angular/cdk/text-field';

import {BaseComponent} from '../shared/etc/base-component';
import {LoginService} from './login.service';
import {GlobalStateService} from '../shared/services/global-state.service';
import {USERNAME_REGEX} from '../shared/etc/regex';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {

  hasAutofilled: boolean = false;
  isSubmitting: boolean = false;
  isShowError: boolean = false;
  errorMessage: string = '';
  form: FormGroup;

  @ViewChild('password', {read: ElementRef})
  password: ElementRef;

  @ViewChild('formWrapper', {read: ElementRef})
  private formWrapper: ElementRef;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private loginService: LoginService,
    private globalStateService: GlobalStateService,
    private router: Router,
    private route: ActivatedRoute,
    private autofill: AutofillMonitor
  ) {
    super();
  }

  ngOnInit() {

    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.pattern(USERNAME_REGEX), Validators.minLength(2), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      remember: [true]
    });

    // fix: in Chrome browser, it does not allow access to the value of the password field after autofill (before user click on the page)
    this.autofill.monitor(this.password.nativeElement)
      .subscribe((e: AutofillEvent) => {

        if (e.isAutofilled) {

          this.hasAutofilled = true;
        }
      });

    this.renderer.listen(this.formWrapper.nativeElement, 'click', () => {
      this.isShowError = false;
      this.errorMessage = '';
    });
  }

  onSubmit() {

    this.isShowError = false;
    this.errorMessage = '';

    if (this.form.valid) {

      this.isSubmitting = true;

      this.loginService.login(this.form.value).subscribe((res) => {

        if (res.success) {

          this.globalStateService.isLogin = true;
          this.globalStateService.userInfo = res.data;
          this.router.navigate([this.route.snapshot.queryParams.redirectTo || '']);
        } else {

          this.isShowError = true;
          this.errorMessage = res.message;
        }
      }, (res) => {

        this.isShowError = true;
        this.errorMessage = res.message;
      }, () => {

        this.isSubmitting = false;
      });
    }
  }

  ngOnDestroy() {

    this.autofill.stopMonitoring(this.password.nativeElement);
  }

  checkErrorMatch(name: string, type: string): boolean {

    return this.form.controls[name].touched && this.form.controls[name].hasError(type);
  }
}
