import {Component, NgZone} from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = '960px';

@Component({
  selector: 'normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: [
    './normal-layout.component.scss'
  ]
})
export class NormalLayoutComponent {

  private mqlEvent: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT})`);

  constructor(
    private zone: NgZone
  ) {

    this.mqlEvent.addListener((mql) => {
      zone.run(() => {
        this.mqlEvent = mql;
      });
    });
  }

  ngOnInit() {

  }

  getNavMode() {
    return this.mqlEvent.matches ? 'over' : 'side';
  }
}
