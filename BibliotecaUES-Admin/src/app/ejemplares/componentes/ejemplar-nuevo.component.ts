/*
*Nombre del componente: ejemplar-nuevo
*Dirección física: src\app\ejemplares\componentes\ejemplar-nuevo.component.ts
*Objetivo: Crear un nuevo ejemplar
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { EjemplaresService, NuevoEjemplar, Libro } from './../servicios';

declare var Materialize: any;

@Component({
  templateUrl: './ejemplar-nuevo.component.html',
  styles: [`
    .modal-fixed-footer{
      height: 600px;
      width: 800px;
    }

    .btnSelect{
      margin-top: 50px;
    }
  `]
})

export class EjemplarNuevoComponent implements OnInit {
  modalSeleccion = new EventEmitter<string | MaterializeAction>();
  modalCancel = new EventEmitter<string|MaterializeAction>();
  ejemplar: NuevoEjemplar;

  showMessage: boolean = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private ejemplaresService: EjemplaresService
  ){}

  ngOnInit() {
    // Crear un nuevo ejemplar y asignarle un nuevo libro.
    this.ejemplar = new NuevoEjemplar;
    this.ejemplar.libro = new Libro;
  }

  // Método: onNotify
  // Objetivo: Escucha el evento emitido por el componente libro-seleccion
  onNotify(libro: Libro): void {
    this.ejemplar.libro = libro;
    Materialize.toast("'" + libro.titulo + "' asignado al nuevo ejemplar", 3000, 'toastSuccess');
  }

  // Método: crear
  // Objetivo: crear un nuevo ejemplar, ya sea compra o donación.
  crear(){
    // Mostrar mensaje de espera.
    this.showMessage = true;
    this.errorMessage = null;

    // Selecciona el método de creación dependiendo del motivo de la creación.
    switch(this.ejemplar.tipo){
      // Para la compra de un ejemplar
      case "Compra":{
        this.ejemplaresService.crearCompra(this.ejemplar).subscribe(
          message => {
            Materialize.toast("Ejemplar creado", 3000, 'toastSuccess');
            this.router.navigate(['/ejemplares']);
          },
          error => {
            this.showMessage= false;
            if(error.status == 422){
              this.errorMessage = "El código de barras ingresado ya está en uso";
            }
            else{
              this.errorMessage = "Error al crear el ejemplar";
            }
          }
        );
        break;
      }

      // Para la donación de un ejemplar
      case "Donación":{
        this.ejemplaresService.crearDonacion(this.ejemplar).subscribe(
          message => {
            Materialize.toast("Ejemplar creado", 3000, 'toastSuccess');
            this.router.navigate(['/ejemplares']);
          },
          error => {
            this.showMessage= false;
            if(error.status == 422){
              this.errorMessage = "El código de barras ingresado ya está en uso";
            }
            else{
              this.errorMessage = "Error al crear el ejemplar";
            }
          }
        );
        break;
      }
      default:{}
    }
  }

  // Métodos para la ventana modal de selección de selección de libro
  openSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['open'] });
  }
  closeSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['close'] });
  }

  // Métodos para la ventana modal de confirmación de cancelación
  openCancel() {
    this.modalCancel.emit({action:"modal",params:['open']});
  }
  closeCancel() {
    this.modalCancel.emit({action:"modal",params:['close']});
  }

  // Método: cancel
  // Objetivo: cerrar la ventana modal y regresar a la ventana anterior.
  cancel(){
    this.closeCancel();
    this.router.navigate(['/ejemplares']);
  }
}
