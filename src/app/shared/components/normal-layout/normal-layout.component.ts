import {Component, ViewChild} from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: [
    './normal-layout.component.scss'
  ]
})
export class NormalLayoutComponent {

  private scrollBarConfig: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarDirective) scrollBar: PerfectScrollbarDirective;

  ngOnInit() {

  }
}
