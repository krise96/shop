import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { shouldBeAdmin } = route.data;
    const defautReturn = () => this.router.parseUrl('/');
    if (shouldBeAdmin) {
      if (this.authService.isLoginnedAndAdmin()) {
        return true;
      }
      return defautReturn();
    } else {
      if (this.authService.isLoginnedAndNotAdmin()) {
        return true;
      }
      return defautReturn();
    }
  }
}
