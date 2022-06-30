import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExistingUserGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (currentUser) => {
        if (currentUser) {
          this.router.navigate(['home']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
