import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartsModule} from 'ng2-charts';

import {MaterialModule} from '../shared/modules/material.module';
import {DashboardRoutingModule} from './dashboard.routing';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ChartsModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
