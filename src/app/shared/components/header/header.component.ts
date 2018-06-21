import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import * as screenfull from 'screenfull';

import {GlobalStateService} from '../../services/global-state.service';
import {SnackBarService} from '../../services/snack-bar.service';
import {ConfirmDialogComponent} from '../../components/dialog/confirm/confirm-dialog.component';
import {HeaderService} from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {

  isShowNotification: boolean = true;
  isShowSettingsFab: boolean = true;
  userInfo: any;
  private dialogRef: MatDialogRef<ConfirmDialogComponent>;

  @Output()
  toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  toggleOptionsFab: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  toggleNotification: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private globalStateService: GlobalStateService,
    private snackBarService: SnackBarService,
    private headerService: HeaderService
  ) {
  }

  ngOnInit() {

    this.userInfo = this.globalStateService.userInfo;
    this.toggleOptionsFab.emit(this.isShowSettingsFab);
  }

  doSearch(e) {

    this.snackBarService.show('该功能尚未实现，敬请期待');
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
    this.isShowNotification = !this.isShowNotification;
  }

  toggleOptionsFabStatus() {
    this.isShowSettingsFab = !this.isShowSettingsFab;
    this.toggleOptionsFab.emit(this.isShowSettingsFab);
  }

  confirmLogout() {

    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        content: '您确定要退出该系统？'
      }
    });

    this.dialogRef.afterClosed().subscribe((data) => {

      if (data) {

        this.headerService.logout().subscribe((res) => {

          if (res.success) {
            this.globalStateService.isLogin = false;
            this.globalStateService.userInfo = null;
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }
}
