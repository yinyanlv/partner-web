import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '../shared/modules/material.module';
import {UserComponent} from './user.component';
import {UserRoutingModule} from './user.routing';
import {InfoComponent} from './info/info.component';
import {SettingsComponent} from './settings/settings.component';
import {SettingsService} from './settings/settings.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    InfoComponent,
    SettingsComponent
  ],
  providers: [
    SettingsService
  ]
})
export class UserModule {
}
