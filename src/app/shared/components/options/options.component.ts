import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {

  @Input()
  isShowOptions: boolean = false;

  toggleOptionsStatus() {

    this.isShowOptions = !this.isShowOptions;
  }
}
