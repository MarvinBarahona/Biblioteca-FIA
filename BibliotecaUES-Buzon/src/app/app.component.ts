/*
*Nombre del componente: app
*Dirección física: src/app/app.component.ts
*Objetivo: Componente base.
**/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: string;

  constructor(private router: Router) { }

  ngOnInit(){
    // Recuperar el nombre del usuario y colocarlo en la pantalla.
    let u = JSON.parse(sessionStorage.getItem('usuario'));
    if(u) this.usuario = u['nombre'];
  }

  //Método: cerrarSesion
  //Objetivo: Eliminar los datos del usuario y redirigir al logueo
  cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "./login";
  }


}
