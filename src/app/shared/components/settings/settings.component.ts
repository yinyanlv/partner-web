import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent {

  status: any = {
    menuCollapsed: false,
    menuCompact: false,
    appBoxed: false,
    appDark: false
  };

  @Input()
  isShowSettings: boolean = false;

  @Output()
  onSettingsChange: EventEmitter<any> = new EventEmitter<any>();

  toggleOptionsStatus() {

    this.isShowSettings = !this.isShowSettings;
  }

  changeSettings() {

    this.onSettingsChange.emit(this.status);
  }
}
