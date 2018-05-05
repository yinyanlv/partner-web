import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeZh from '@angular/common/locales/zh';
import {CalendarModule} from 'angular-calendar';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '../shared/modules/material.module';
import {TimeStatisticsRoutingModule} from './time-statistics.routing';
import {TimeStatisticsComponent} from './time-statistics.component';
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';

registerLocaleData(localeZh);

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    FlexLayoutModule,
    MaterialModule,
    TimeStatisticsRoutingModule
  ],
  declarations: [
    TimeStatisticsComponent,
    CalendarDialogComponent
  ],
  entryComponents: [
    CalendarDialogComponent
  ]
})
export class TimeStatisticsModule {
}
