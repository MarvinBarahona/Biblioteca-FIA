/*
*Nombre del componente: empleados
*Dirección física: src\app\empleados\componentes\empleados.component.ts
*Objetivo: Permite ver una tabla con todos los empleados.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { EmpleadosService, Empleado } from './../servicios/';

@Component({
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router
  ){
    // Opciones de datatable
    this.dtOptions = {
      paging: false,
      searching: false,
      language: {
        "emptyTable": "Sin registros disponibles en la tabla",
        "info": " ",
        "infoEmpty": ""
      }
    };
  }

  ngOnInit() {
    // Llama al servicio
    this.empleadosService.obtenerTodos().subscribe(
      empleados => {
        // Asigna las adquisiciones y refresca la tabla
        this.empleados = empleados;
        this.dtTrigger.next();
      }
    );
  }

  // Método: linkEmpleado
  // Objetivo: Redirige a la vista de empleado
  linkEmpleado(empleado: Empleado){
    this.router.navigate(["/empleados/" + empleado.id])
  }
}
