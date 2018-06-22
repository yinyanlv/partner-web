import {Component, OnInit} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

import {GlobalStateService} from '../../services/global-state.service';

@Component({
  selector: 'normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: [
    './normal-layout.component.scss'
  ]
})
export class NormalLayoutComponent implements OnInit {

  navMode: string = 'side';
  isHideSettingsFab: boolean;
  isMenuOpened: boolean = true;

  settingsStatus: any = {
    menuCollapsed: false,
    menuCompact: false,
    appBoxed: false,
    appDark: false
  };

  constructor(
    private media: ObservableMedia,
    private globalStateService: GlobalStateService
  ){
  }

  ngOnInit() {

    this.media.asObservable().subscribe((change: MediaChange) => {

      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {

        this.navMode = 'over';
      } else {

        this.navMode = 'side';
      }
    });

    this.settingsStatus = this.globalStateService.status;
    this.isHideSettingsFab = this.globalStateService.options.isHideSettingsFab;
  }

  toggleOptionsFab(isHide) {

    this.isHideSettingsFab = isHide;
  }

  changeSettings(status) {

    this.settingsStatus = status;
  }
}
