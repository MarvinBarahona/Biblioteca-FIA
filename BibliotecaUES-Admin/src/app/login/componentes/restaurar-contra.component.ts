/*
*Nombre del módulo: restaurar contraseña
*Dirección: /src/app/login/componentes/restaurar-contra.component.ts
*Objetivo: permite al usuario restaurar su contraseña. 
*/

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './restaurar-contra.component.html'
})

export class RestaurarContraComponent implements OnInit {
  correo: string;

  message: string;
  errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
