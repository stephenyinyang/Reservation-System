import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate{


  constructor(private auth: AuthService,  private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const currentUser = this.auth.currentUserValue;

    if (currentUser.role === 'Admin') {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}
