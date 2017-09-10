import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';
import { AuthService } from './../servicios';

@Injectable()
export class SkipLoginGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let res = true;
    let token = this.cookieService.get('token');

    if (token){
      this.authService.verificar(token).subscribe(
        u => {
          this.cookieService.putObject('usuario', u);
          res = false;
          this.router.navigate(['/']);
        },
        error => {
          this.cookieService.remove('token');
        }
      );
    }

    return res;
  }
}
