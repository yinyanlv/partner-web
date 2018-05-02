import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotComponent} from './forgot/forgot.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';

import {NormalLayoutComponent} from './shared/components/normal-layout/normal-layout.component';

const routes: Routes = [{
  path: '',
  component: NormalLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }]
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'forgot',
  component: ForgotComponent
}, {
  path: 'error',
  component: ErrorComponent
}, {
  path: '**',
  component: NotFoundComponent
}];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});
