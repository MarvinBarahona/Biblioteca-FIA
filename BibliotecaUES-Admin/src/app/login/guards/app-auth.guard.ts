import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';
import { AuthService } from './../servicios';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let res = false;
    let token = this.cookieService.get('token');

    if (!token) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    else {
      let user = this.cookieService.getObject('user');
      if (!user) {
        this.authService.verify(token).subscribe(
          u => {
            user = u;
            this.cookieService.putObject('user', u);
          },
          error => {
            this.cookieService.remove('token');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          }
        );
      }

      if(user){
        let i = user['policies'].indexOf(next.data['politica']);

        if(i == -1) this.router.navigate(['error403']);
        else res = true;
      }
    }

    return res;
  }
}
