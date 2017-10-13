/*
*Nombre del guard: app-auth
*Dirección: /src/app/login/guards/app-auth.guard.ts
*Objetivo: No permite acceder a la información sin loguearse.
*/

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
    // Recuperar el token de los cookies.
    let token = this.cookieService.get('token');

    // Si no hay token, redirigir al logueo.
    if (!token) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    else {
      // Recuperar el objeto Usuario de los cookies.
      let user = this.cookieService.getObject('usuario');

      // Si no hay usuario, verificar el token.
      if (!user) {
        this.authService.verificar(token).subscribe(
          // Recuperarción exitosa: poner el objeto en los cookies.
          u => {
            user = u;
            this.cookieService.putObject('usuario', u);
          },
          // Error al recuperar: redirigir al login.
          error => {
            this.cookieService.remove('token');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          }
        );
      }

      // Si hay usuario o se recuperar con éxito
      if(user){
        // Determinar si en las políticas del usuario está la política necesaria para acceder.
        let i = user['politicas'].indexOf(next.data['politica']);

        // Si no está la política, redirigir al sitio del 'Permiso denegado'.
        if(i == -1) this.router.navigate(['/error403']);
        else res = true;
      }
    }

    return res;
  }
}
