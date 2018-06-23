import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SnackBarService} from '../../shared/services/snack-bar.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class BaseHttp {

  protected apiPrefix: String = '';
  protected observableCreator = Observable;

  constructor(
    public http: HttpClient,
    private snackBarService: SnackBarService
  ) {
    this.apiPrefix = environment.apiPrefix;
  }

  showMessage(message: string, callback?: Function) {

    if (message) {

      let fn = callback ? () => {
        callback();
      } : null;

      this.snackBarService.show(message, fn);
    }
  }
}
