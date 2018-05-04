import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TimeStatisticsRoutingModule} from './time-statistics.routing';
import { TimeStatisticsComponent } from './time-statistics.component';

@NgModule({
  imports: [
    CommonModule,
    TimeStatisticsRoutingModule
  ],
  declarations: [TimeStatisticsComponent]
})
export class TimeStatisticsModule { }
