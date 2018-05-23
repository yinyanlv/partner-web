import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MaterialModule} from '../shared/modules/material.module';
import {ForgotRoutingModule} from './forgot.routing';
import {ForgotComponent} from './forgot.component';
import {ForgotService} from './forgot.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ForgotRoutingModule
  ],
  declarations: [
    ForgotComponent
  ],
  providers: [
    ForgotService
  ]
})
export class ForgotModule { }
