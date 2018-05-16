import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkComponent} from './work.component';

const routes: Routes = [{
  path: '',
  component: WorkComponent
}];

export const WorkRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
