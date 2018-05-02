import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {NotFoundComponent} from './not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NotFoundComponent
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
