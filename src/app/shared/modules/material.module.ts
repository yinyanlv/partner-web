import {NgModule} from '@angular/core';
import {MatCardModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatIconModule, MatFormFieldModule} from '@angular/material';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatCheckboxModule
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

