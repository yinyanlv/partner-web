import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ForgotComponent} from './forgot.component';

const routes: Routes = [{
  path: '',
  component: ForgotComponent
}];

export const ForgotRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
