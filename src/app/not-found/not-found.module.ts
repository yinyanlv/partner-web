import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {NotFoundRoutingModule} from './not-found.routing';
import {NotFoundComponent} from './not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NotFoundRoutingModule
  ],
  declarations: [
    NotFoundComponent
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
