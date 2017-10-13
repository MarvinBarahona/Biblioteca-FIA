/*
*Nombre del componente: app
*Dirección: /src/app/app.component.ts
*Objetivo: Definición del componente principal
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: string;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(){
    // Recupera el usuario de las cookies y coloca su nombre en el nav.
    let u = this.cookieService.getObject('usuario');
    if(u) this.usuario = u['nombre'];
  }

  // Método: cerrarSesión
  // Objetivo: Cierra la sesión del usuario al remover todos los cookies guardados.
  cerrarSesion() {
    this.cookieService.removeAll();
    // Redirige al login.
    window.location.href = "./login";
  }
}
