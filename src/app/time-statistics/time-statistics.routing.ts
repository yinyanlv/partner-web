import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TimeStatisticsComponent} from './time-statistics.component';

const routes: Routes = [{
  path: '',
  component: TimeStatisticsComponent
}];

export const TimeStatisticsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
