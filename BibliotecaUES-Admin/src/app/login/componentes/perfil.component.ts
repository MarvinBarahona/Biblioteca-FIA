/*
*Nombre del módulo: mi perfil
*Dirección: /src/app/login/componentes/perfil.component.ts
*Objetivo: permite al usuario revisar sus datos
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { Usuario } from './../servicios';

@Component({
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ){}

  ngOnInit(){
    // Recuperar al usuario de los cookies
    this.usuario = <Usuario> this.cookieService.getObject('usuario');
  }

  // Método: restaurar
  // Objetivo: Redirigir a la vista de restauración de contraseña
  restaurar(){
    this.router.navigate(["/restaurar", {email: this.usuario.correo}]);
  }

}
