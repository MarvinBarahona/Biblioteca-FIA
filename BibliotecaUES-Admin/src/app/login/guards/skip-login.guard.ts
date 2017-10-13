/*
*Nombre del guard: skip-login
*Dirección: /src/app/login/guards/skip-login.guard.ts
*Objetivo: permite saltar el logueo si ya hay un usuario registrado.
*/

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
    // Recupera el token.
    let token = this.cookieService.get('token');

    // Si ya hay token, intenta saltarlo.
    if (token){
      // Verifica al usuario.
      this.authService.verificar(token).subscribe(
        u => {
          this.cookieService.putObject('usuario', u);
          res = false;
          this.router.navigate(['/']);
        },
        // Si hay error, quita el token.
        error => {
          this.cookieService.remove('token');
        }
      );
    }

    return res;
  }
}
