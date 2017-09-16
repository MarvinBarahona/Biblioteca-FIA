/*
*Nombre del módulo: Empleado nuevo
*Dirección física: src\app\empleados\componentes\empleado-nuevo.component.ts
*Objetivo: Permite la creación de un nuevo empleado.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { Empleado, Grupo } from './../servicios/';

@Component({
  templateUrl: './empleado-nuevo.component.html'
})
export class EmpleadoNuevoComponent implements OnInit {
  empleado: Empleado;
  genero: string;
  grupos: Grupo[];

  showMessage: boolean;
  errorMessage: string;

  modalCancel = new EventEmitter<string | MaterializeAction>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.empleado = new Empleado;
    this.genero = "F";
    this.showMessage = false;
  }

  // Para el modal de cancelar
  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }

  cancel(){
    this.closeCancel();
    this.router.navigate(['/empleados']);
  }
}
