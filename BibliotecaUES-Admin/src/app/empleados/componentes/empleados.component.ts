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

declare var Materialize: any;

@Component({
  templateUrl: './empleados.component.html',
  styles: [`
    .modal{
      height: 200px;
      width: 500px;
    }
  `]
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[];
  nombre: string;
  empleado: Empleado;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalEliminar = new EventEmitter<string | MaterializeAction>();

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

  // Método: eliminar
  // Objetivo: Eliminar un empleado.
  eliminar(){
    this.closeEliminar();
    this.empleadosService.eliminar(this.empleado).subscribe(
      message => {
        let i = this.empleados.indexOf(this.empleado);
        if(i > -1) this.empleados.splice(i, 1);
        Materialize.toast("Empleado eliminado", 3000, "toastSuccess");
      },
      error => {
        Materialize.toast("Error al eliminar empleado", 3000, "toastError");
      }
    );
  }

  // Métodos para la ventana modal de selección de selección de libro
  openEliminar(empleado: Empleado) {
    this.nombre = empleado.nombre;
    this.empleado = empleado;
    this.modalEliminar.emit({ action: "modal", params: ['open'] });
  }
  closeEliminar() {
    this.modalEliminar.emit({ action: "modal", params: ['close'] });
  }
}
