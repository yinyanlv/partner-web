import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartsModule} from 'ng2-charts';

import {MaterialModule} from '../shared/modules/material.module';
import {HomeRoutingModule} from './home.routing';
import {HomeComponent} from './home.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ChartsModule,
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
