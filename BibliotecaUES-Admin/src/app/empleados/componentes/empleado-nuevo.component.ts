/*
*Nombre del componente: empleado-nuevo
*Dirección física: src\app\empleados\componentes\empleado-nuevo.component.ts
*Objetivo: Permite la creación de un nuevo empleado.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { EmpleadosService, GruposService, Empleado, Grupo } from './../servicios/';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './empleado-nuevo.component.html'
})

export class EmpleadoNuevoComponent implements OnInit {
  // Variables del formulario
  empleado: Empleado;
  grupos: Grupo[];

  showMessage: boolean;
  errorMessage: string;

  modalCancel = new EventEmitter<string | MaterializeAction>();

  constructor(
    private router: Router,
    private empleadosService: EmpleadosService,
    private gruposService: GruposService
  ) { }

  ngOnInit() {
    // Inicializando el objeto
    this.empleado = new Empleado;
    this.empleado.grupo = new Grupo;
    this.showMessage = false;

    // Llama al servicio
    this.gruposService.obtenerGrupos().subscribe(
      grupos => {
        // Asigna los grupos
        this.grupos = grupos;
        // Para que no se seleccione ninguna por defecto
        this.empleado.grupo.id = null;
      }
    );
  }

// Método: crear
// Objetivo: Permite la creación de un nuevo empleado
  crear(){
    // Mostrar mensaje de espera.
    this.showMessage = true;
    this.errorMessage = null;

    // Asigna el id del grupo seleccionado
    this.grupos.forEach((grupo) => {
      if(this.empleado.grupo.nombre === grupo.nombre) this.empleado.grupo.id = grupo.id;
    });

    this.empleadosService.crear(this.empleado).subscribe(
      message => {
        Materialize.toast("Empleado creado", 3000, 'toastSuccess');
        this.router.navigate(['/empleados']);
      },
      error => {
        this.showMessage= false;
        if(error.status == 422){
          this.errorMessage = "El correo ingresado ya está en uso";
        }
        else{
          this.errorMessage = "Error al crear el empleado";
        }
      }
    );
  }

  // Métodos para el manejo del modal de confirmar cancelación.
  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }

  // Método: cancel
  // Objetivo: cerrar el modal y retornar a la vista anterior
  cancel(){
    this.closeCancel();
    this.router.navigate(['/empleados']);
  }
}
