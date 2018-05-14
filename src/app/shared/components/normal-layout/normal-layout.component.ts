import {Component, ViewChild, ComponentRef, NgZone} from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

const SMALL_WIDTH_BREAKPOINT = '960px';

@Component({
  selector: 'normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: [
    './normal-layout.component.scss'
  ]
})
export class NormalLayoutComponent {

  private scrollBarConfig: PerfectScrollbarConfigInterface = {};
  private mqlEvent: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT})`);

  @ViewChild(PerfectScrollbarDirective) scrollBar: PerfectScrollbarDirective;

  constructor(
    private zone: NgZone
  ) {

    this.mqlEvent.addListener((mql) => {
      zone.run(() => {
        this.mqlEvent = mql;
      });
    })
  }

  ngOnInit() {

  }

  getNavMode() {
console.log(this.mqlEvent.matches);
console.log(this.mqlEvent.matches);
    return this.mqlEvent.matches ? 'over' : 'side';
  }
}
