import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '../shared/modules/material.module';
import { UserComponent } from './user.component';
import {UserRoutingModule} from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    UserRoutingModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
