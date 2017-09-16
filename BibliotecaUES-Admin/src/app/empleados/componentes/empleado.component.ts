/*
*Nombre del módulo: Empleado
*Dirección física: src\app\empleados\componentes\empleado.component.ts
*Objetivo: Permite ver los datos de un empleado
**/

import { Component, OnInit } from '@angular/core';

import { Empleado, Grupo, Politica } from './../servicios/';

@Component({
  templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit {
  empleado: Empleado;

  errorMessage: string;
  showMessage: boolean;

  constructor() { }

  ngOnInit() {
    this.empleado = new Empleado;
    this.empleado.grupo = new Grupo;
    this.empleado.politicas = new Array<Politica>();
    this.showMessage = false;
  }

}
