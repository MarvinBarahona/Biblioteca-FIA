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
    // Obtiene el id de la adquisición
    let id = this.route.snapshot.params['id'];
    
    this.empleado.grupo = new Grupo;
    this.empleado.politicas = new Array<Politica>();
    this.showMessage = false;
  }

}
