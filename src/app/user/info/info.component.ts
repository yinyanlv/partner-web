import { Component, OnInit } from '@angular/core';

import {GlobalStateService} from '../../shared/services/global-state.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  userInfo: any;

  constructor(
    private globalStateService: GlobalStateService
  ) {
  }

  ngOnInit() {

    this.userInfo = this.globalStateService.userInfo;
  }
}
