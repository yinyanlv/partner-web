import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NormalLayoutComponent} from './shared/components/normal-layout/normal-layout.component';
import {SessionLayoutComponent} from './shared/components/session-layout/session-layout.component';

const routes: Routes = [{
  path: '',
  component: NormalLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'time-statistics',
    loadChildren: './time-statistics/time-statistics.module#TimeStatisticsModule'
  }]
}, {
  path: '',
  component: SessionLayoutComponent,
  children: [{
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  }]
}, {
  path: '',
  component: SessionLayoutComponent,
  children: [{
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  }]
}, {
  path: '',
  component: SessionLayoutComponent,
  children: [{
    path: 'forgot',
    loadChildren: './forgot/forgot.module#ForgotModule'
  }]
}, {
  path: '',
  component: SessionLayoutComponent,
  children: [{
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '',
  component: SessionLayoutComponent,
  children: [{
    path: '**',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  }]
}];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});
