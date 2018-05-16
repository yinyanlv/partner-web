import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isShowNotification: boolean = true;
  isShowSettingsFab: boolean = true;

  @Output()
  toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  toggleOptionsFab: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  toggleNotification: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {

    this.toggleOptionsFab.emit(this.isShowSettingsFab);
  }

  toggleFullScreen() {

    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  goToUserCenter() {

    this.router.navigateByUrl('/user');
  }

  toggleNotificationStatus() {
    this.isShowNotification = !this.isShowNotification;
  }

  toggleOptionsFabStatus() {
    this.isShowSettingsFab = !this.isShowSettingsFab;
    this.toggleOptionsFab.emit(this.isShowSettingsFab);
  }
}
