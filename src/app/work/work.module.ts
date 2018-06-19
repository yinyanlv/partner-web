import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'angular-calendar';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '../shared/modules/material.module';
import {WorkRoutingModule} from './work.routing';
import {WorkComponent} from './work.component';
import {WorkService} from './work.service';
import {RecordEditService} from './record-edit/record-edit.service';
import { RecordEditComponent } from './record-edit/record-edit.component';

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
    RecordEditComponent
  ],
  entryComponents: [
    RecordEditComponent
  ],
  providers: [
    WorkService,
    RecordEditService
  ]
})
export class WorkModule {
}
