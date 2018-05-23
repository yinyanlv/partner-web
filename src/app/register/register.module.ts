import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MaterialModule} from '../shared/modules/material.module';
import {RegisterRoutingModule} from './register.routing';
import {RegisterComponent} from './register.component';
import {RegisterService} from './register.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    RegisterRoutingModule
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule { }
