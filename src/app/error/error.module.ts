import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ErrorRoutingModule} from './error.routing';
import {ErrorComponent} from './error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorRoutingModule
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule {
}
