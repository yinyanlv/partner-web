import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {MaterialModule} from './material.module';
import {NormalLayoutComponent} from '../components/normal-layout/normal-layout.component';
import {HeaderComponent} from '../components/header/header.component';
import {MenuComponent} from '../components/menu/menu.component';
import {OptionsComponent} from '../components/options/options.component';

const components = [
  NormalLayoutComponent,
  HeaderComponent,
  MenuComponent,
  OptionsComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    LoadingBarRouterModule,
    PerfectScrollbarModule,
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
