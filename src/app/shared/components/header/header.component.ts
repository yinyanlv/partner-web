import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import * as screenfull from 'screenfull';

import {GlobalStateService} from '../../services/global-state.service';
import {ConfirmDialogService} from '../../services/confirm-dialog.service';
import {HeaderService} from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {

  isHideNotification: boolean;
  isHideSettingsFab: boolean;
  userInfo: any;

  @Output()
  toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  toggleOptionsFab: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  toggleNotification: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private globalStateService: GlobalStateService,
    private confirmDialogService: ConfirmDialogService,
    private headerService: HeaderService
  ) {
  }

  ngOnInit() {

    this.userInfo = this.globalStateService.userInfo;
    this.isHideNotification = this.globalStateService.options.isHideNotification;
    this.isHideSettingsFab = this.globalStateService.options.isHideSettingsFab;
  }

  doSearch(e) {

    this.headerService.showMessage('该功能尚未实现，敬请期待');
  }

  toggleFullScreen() {

    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  goToUserCenter() {

    this.router.navigateByUrl('/user/info');
  }

  toggleNotificationStatus() {
    this.isHideNotification = !this.isHideNotification;
    this.globalStateService.setOptionsItem('isHideNotification', this.isHideNotification);
  }

  toggleOptionsFabStatus() {
    this.isHideSettingsFab = !this.isHideSettingsFab;
    this.globalStateService.setOptionsItem('isHideSettingsFab', this.isHideSettingsFab);
    this.toggleOptionsFab.emit(this.isHideSettingsFab);
  }

  confirmLogout() {

    this.confirmDialogService.show({
      content: '您确定要退出该系统？'
    }, (data) => {

      if (data) {

        this.headerService.logout().subscribe((res) => {

          if (res.success) {
            this.headerService.showMessage('退出登录成功', () => {
              this.globalStateService.isLogin = false;
              this.globalStateService.userInfo = null;
              this.router.navigate(['/login']);
            });
          } else {

            this.headerService.showMessage(res.message, () => {
              this.router.navigate(['/login']);
            });
          }
        });
      }
    });
  }
}
