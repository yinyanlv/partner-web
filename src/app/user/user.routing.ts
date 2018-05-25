import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './user.component';
import {InfoComponent} from './info/info.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'info',
    component: InfoComponent
  }, {
    path: 'settings',
    component: SettingsComponent
  }]
}];

export const UserRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
