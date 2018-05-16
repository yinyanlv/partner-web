import {Component} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: [
    './normal-layout.component.scss'
  ]
})
export class NormalLayoutComponent {

  navMode: string;
  isShowSettingsFab: boolean;

  constructor(private media: ObservableMedia) {

    media.asObservable().subscribe((change: MediaChange) => {

      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {

        this.navMode = 'over';
      } else {
        this.navMode = 'side';
      }
    });
  }

  ngOnInit() {

  }

  toggleOptionsFab(isShow) {

    this.isShowSettingsFab = isShow;
  }
}
