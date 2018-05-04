import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ErrorComponent} from './error.component';

const routes: Routes = [{
  path: '',
  component: ErrorComponent
}];

export const ErrorRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
