import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {GlobalStateService} from './global-state.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(
    private globalState: GlobalStateService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.globalState.isLogin) {
      this.router.navigate(['login'], {
        queryParams: {
          redirectTo: state.url
        }
      });

      return false;
    }

    return true;
  }
}
