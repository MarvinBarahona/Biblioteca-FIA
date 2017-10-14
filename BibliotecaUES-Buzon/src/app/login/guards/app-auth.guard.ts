/*
*Nombre del componente: app-auth
*Dirección física: src/app/login/guards/app-auth.guard.ts
*Objetivo: No permite acceder a la información sin loguearse.
**/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../servicios';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let res = false;

    // Recuperar el token del storage
    let token = sessionStorage.getItem('token');

    // Recuperar el objeto Usuario del storage
    let user = JSON.parse(sessionStorage.getItem('usuario'));

    // Si no hay token, redirigir al logueo.
    if (!token || !user) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    else {
      // Determinar si en las políticas del usuario está la política necesaria para acceder.
      let i = user['politicas'].indexOf(next.data['politica']);

      // Si no está la política, redirigir al sitio del 'Permiso denegado'.
      if (i == -1) this.router.navigate(['/error403']);
      else res = true;
    }

    return res;
  }
}
