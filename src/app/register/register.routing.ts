import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register.component';

const routes: Routes = [{
  path: '',
  component: RegisterComponent
}];

export const RegisterRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
