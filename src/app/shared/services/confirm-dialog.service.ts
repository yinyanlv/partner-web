import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material'

import {ConfirmDialogComponent} from '../../shared/components/dialog/confirm/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  show(options: any, callback: Function) {

    let dialogRef: MatDialogRef<ConfirmDialogComponent, any> = this.dialog.open(ConfirmDialogComponent, {
      data: options
    });

    if (callback) {

      dialogRef.afterClosed().subscribe((data) => {
        callback(data);
      });
    }
  }
}
