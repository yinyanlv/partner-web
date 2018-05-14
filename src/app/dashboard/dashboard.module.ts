import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {DashboardRoutingModule} from './dashboard.routing';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
