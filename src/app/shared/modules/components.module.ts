import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {MaterialModule} from './material.module';
import {NormalLayoutComponent} from '../components/normal-layout/normal-layout.component';
import {SessionLayoutComponent} from '../components/session-layout/session-layout.component';
import {HeaderComponent} from '../components/header/header.component';
import {MenuComponent} from '../components/menu/menu.component';
import {NotificationComponent} from '../components/notification/notification.component';
import {SettingsComponent} from '../components/settings/settings.component';
import {ConfirmDialogComponent} from '../components/dialog/confirm/confirm-dialog.component';

const components = [
  NormalLayoutComponent,
  SessionLayoutComponent,
  HeaderComponent,
  MenuComponent,
  NotificationComponent,
  SettingsComponent,
  ConfirmDialogComponent
];

const entryComponents = [
  ConfirmDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    LoadingBarRouterModule,
    PerfectScrollbarModule,
    MaterialModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  entryComponents: [
    ...entryComponents
  ]
})
export class ComponentsModule {

}
