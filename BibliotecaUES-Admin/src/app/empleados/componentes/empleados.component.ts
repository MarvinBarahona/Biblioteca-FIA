/*
*Nombre del módulo: Empleados
*Dirección física: src\app\empleados\componentes\empleados.component.ts
*Objetivo: Permite ver una tabla con todos los empleados.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { Empleado } from './../servicios/';

@Component({
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[];
  empleadoEliminar: Empleado;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  modalEliminar = new EventEmitter<string | MaterializeAction>();

  constructor( private router: Router){
    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10,15,20]
    };
  }

  ngOnInit() {
    this.empleados = new Array<Empleado>();
    this.empleadoEliminar = new Empleado;
  }

  // Redirige a la vista de empleado
  linkEmpleado(empleado: Empleado){
    this.router.navigate(["/empleados/" + empleado.id])
  }

  // Eliminar un empleado.
  eliminarEmpleado(empleado: Empleado){
    this.empleadoEliminar = empleado;
    this.openEliminar();
  }

  // Para el modal de eliminar
  openEliminar() {
    this.modalEliminar.emit({ action: "modal", params: ['open'] });
  }
  closeEliminar() {
    this.modalEliminar.emit({ action: "modal", params: ['close'] });
  }
}
