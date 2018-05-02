import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

import {MaterialModule} from './material.module';
import {NormalLayoutComponent} from '../components/normal-layout/normal-layout.component';
import {HeaderComponent} from '../components/header/header.component';
import {OptionsComponent} from '../components/options/options.component';

const components = [
  NormalLayoutComponent,
  HeaderComponent,
  OptionsComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoadingBarRouterModule,
    MaterialModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class ComponentsModule {

}
