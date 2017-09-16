/*
*Nombre del módulo: Empleado
*Dirección física: src\app\empleados\componentes\empleado.component.ts
*Objetivo: Permite ver los datos de un empleado
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmpleadosService, Empleado, Grupo, Politica } from './../servicios/';

declare var Materialize: any;

@Component({
  templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit {
  empleado: Empleado;

  errorMessage: string;
  showMessage: boolean;

  constructor(private empleadosService: EmpleadosService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.showMessage = false;

    // Obtiene el id del empleado
    let id = this.route.snapshot.params['id'];

    // Obtener al empleado
    this.empleadosService.obtener(id).subscribe(
      empleado => {
        this.empleado = empleado;
      }
    );
  }

  guardar(){
    // Mostrar mensajes.
    this.showMessage = true;
    this.errorMessage = null;

    // Guardar las politicas asignadas
    this.empleadosService.asignarPoliticas(this.empleado).subscribe(
      message => {
        this.showMessage= false;
        Materialize.toast("Politicas guardadas", 3000);
      },
      error => {
        this.showMessage= false;
        this.errorMessage = "Error al crear la adquisición";
      }
    );
  }

}
