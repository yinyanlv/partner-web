import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {GlobalStateService} from '../../services/global-state.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {

  status: any;

  @Input()
  isShowSettings: boolean = false;

  @Output()
  onSettingsChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private globalStateService: GlobalStateService
  ) {
  }

  ngOnInit() {

    this.status = this.globalStateService.status;
  }

  toggleOptionsStatus() {

    this.isShowSettings = !this.isShowSettings;
  }

  changeSettings() {

    this.globalStateService.status = this.status;

    this.onSettingsChange.emit(this.status);
  }
}
