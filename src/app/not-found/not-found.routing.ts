import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './not-found.component';

const routes: Routes = [{
  path: '',
  component: NotFoundComponent
}];

export const NotFoundRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
