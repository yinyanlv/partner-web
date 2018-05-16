import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent {

  @Input()
  isShowSettings: boolean = false;

  toggleOptionsStatus() {

    this.isShowSettings = !this.isShowSettings;
  }
}
