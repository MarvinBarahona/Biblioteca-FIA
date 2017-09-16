/*
*Nombre del módulo: Gestión de ejemplares
*Dirección física: src\app\ejemplares\componentes\ejemplar-nuevo.component.ts
*Objetivo: Crear un nuevo ejemplar
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";

import { EjemplaresService, NuevoEjemplar, Libro } from './../servicios';

declare var Materialize: any;

@Component({
  selector: 'ejemplar-nuevo',
  templateUrl: './ejemplar-nuevo.component.html'
})

export class EjemplarNuevoComponent implements OnInit {
  modalSeleccion = new EventEmitter<string | MaterializeAction>();
  modalCancel = new EventEmitter<string|MaterializeAction>();
  ejemplar: NuevoEjemplar;

  showMessage: boolean = false;
  errorMessage: string;

  constructor(private router: Router, private ejemplaresService: EjemplaresService){}

  ngOnInit() {
    // Crear un nuevo ejemplar y asignarle y nuevo libro.
    this.ejemplar = new NuevoEjemplar;
    this.ejemplar.libro = new Libro;
  }

  onNotify(libro: Libro): void {
    // Escucha el evento emitido por el componente libro-seleccion
    this.ejemplar.libro = libro;
    Materialize.toast("'" + libro.titulo + "' asignado al nuevo ejemplar", 3000);
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
            Materialize.toast("Ejemplar creado", 3000);
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
            Materialize.toast("Ejemplar creado", 3000);
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

  // Para las ventanas modales
  openSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['open'] });
  }
  closeSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['close'] });
  }

  openCancel() {
    this.modalCancel.emit({action:"modal",params:['open']});
  }
  closeCancel() {
    this.modalCancel.emit({action:"modal",params:['close']});
  }

  cancel(){
    this.closeCancel();
    this.router.navigate(['/ejemplares']);
  }
}
