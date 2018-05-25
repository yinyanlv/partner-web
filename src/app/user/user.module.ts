import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '../shared/modules/material.module';
import { UserComponent } from './user.component';
import {UserRoutingModule} from './user.routing';
import { InfoComponent } from './info/info.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    InfoComponent,
    SettingsComponent
  ]
})
export class UserModule { }
