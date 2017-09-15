/*
*Nombre del módulo: app
*Dirección: /src/app/app.component.ts
*Objetivo: Vista compartida por el resto de componentes
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

  constructor(private router: Router, private cookieService: CookieService) { }

  cerrarSesion() {
    this.cookieService.removeAll();
    window.location.href = "./login";
  }

  ngOnInit(){
    let u = this.cookieService.getObject('usuario');
    if(u) this.usuario = u['nombre'];
  }
}
