import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'angular-calendar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DragulaModule} from 'ng2-dragula';

import {MaterialModule} from '../shared/modules/material.module';
import {WorkRoutingModule} from './work.routing';
import {WorkComponent} from './work.component';
import {WorkService} from './work.service';
import {RecordEditService} from './record-edit/record-edit.service';
import { RecordEditComponent } from './record-edit/record-edit.component';
import { EventComponent } from './record-edit/event/event.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot(),
    FlexLayoutModule,
    DragulaModule,
    MaterialModule,
    WorkRoutingModule
  ],
  declarations: [
    WorkComponent,
    RecordEditComponent,
    EventComponent
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
