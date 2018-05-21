import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NormalLayoutComponent} from './shared/components/normal-layout/normal-layout.component';
import {SessionLayoutComponent} from './shared/components/session-layout/session-layout.component';
import {RouteGuardService} from './shared/services/route-guard.service';

const routes: Routes = [{
  path: '',
  component: NormalLayoutComponent,
  canActivate: [RouteGuardService],
  children: [{
    path: '',
    loadChildren: './home/home.module#HomeModule'
  }, {
    path: 'work',
    loadChildren: './work/work.module#WorkModule'
  }, {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
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
