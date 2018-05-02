import {NgModule} from '@angular/core';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialModule {

}

