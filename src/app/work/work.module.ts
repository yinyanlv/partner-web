import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'angular-calendar';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '../shared/modules/material.module';
import {WorkRoutingModule} from './work.routing';
import {WorkComponent} from './work.component';
import {WorkService} from './work.service';
import { EventEditComponent } from './event-edit/event-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule.forRoot(),
    FlexLayoutModule,
    MaterialModule,
    WorkRoutingModule
  ],
  declarations: [
    WorkComponent,
    EventEditComponent
  ],
  entryComponents: [
    EventEditComponent
  ],
  providers: [
    WorkService
  ]
})
export class WorkModule {
}
