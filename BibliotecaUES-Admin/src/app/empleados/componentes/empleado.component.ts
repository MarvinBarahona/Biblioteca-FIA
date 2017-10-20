/*
*Nombre del componente: empleado
*Dirección física: src\app\empleados\componentes\empleado.component.ts
*Objetivo: Permite ver los datos de un empleado
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { EmpleadosService, Empleado, Grupo, Politica } from './../servicios/';

declare var Materialize: any;

@Component({
  templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit {
  empleado: Empleado;

  errorMessage: string;
  showMessage: boolean;
  modalCancel = new EventEmitter<string | MaterializeAction>();

  constructor(
    private empleadosService: EmpleadosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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

  // Método: guardar
  // Objetivo: permite guardar las políticas asignadas al empleado
  guardar(){
    // Mostrar mensajes.
    this.showMessage = true;
    this.errorMessage = null;

    // Guardar las politicas asignadas
    this.empleadosService.asignarPoliticas(this.empleado).subscribe(
      message => {
        this.showMessage= false;
        Materialize.toast("Politicas guardadas", 3000, 'toastSuccess');
      },
      error => {
        this.showMessage= false;
        this.errorMessage = "Error al crear la adquisición";
      }
    );
  }

  // Métodos para el manejo de la ventana modal de confirmación de cancelación.
  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }

  // Método: cancel
  // Objetivo: Cerrar la ventana modal y retornar a la vista anterior.
  cancel(){
    this.closeCancel();
    this.router.navigate(['/empleados']);
  }
}
