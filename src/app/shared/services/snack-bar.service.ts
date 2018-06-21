import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {

  private options: any = {
    duration: 3000,
    verticalPosition: 'top'
  };

  private actionText: string = '知道了';

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  show(message: string, callback?: Function) {

    let snackBarRef = this.snackBar.open(message, this.actionText, this.options);

    if (callback) {
      snackBarRef.afterDismissed().subscribe(() => {
        callback();
      });
    }
  }
}
