/*
*Nombre del módulo: mi perfil
*Dirección: /src/app/login/componentes/perfil.component.ts
*Objetivo: permite al usuario revisar sus datos
*/
import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie';
import { Usuario } from './../servicios';

@Component({
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;

  constructor(private cookieService: CookieService){}

  ngOnInit(){
    this.usuario = <Usuario> this.cookieService.getObject('usuario');
  }

}
