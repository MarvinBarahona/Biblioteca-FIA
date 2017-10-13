/*
*Nombre del componente: adquisicion-nueva
*Dirección física: src\app\adquisiciones\componentes\adquisicion-nueva.component.ts
*Objetivo: Crear nuevas adquisiciones
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { AdquisicionesService, NuevaAdquisicion, NuevoEjemplar, Libro } from './../servicios';

declare var Materialize: any;

@Component({
  templateUrl: './adquisicion-nueva.component.html'
})

export class AdquisicionNuevaComponent implements OnInit {
  adquisicion: NuevaAdquisicion;

  modalSeleccion = new EventEmitter<string | MaterializeAction>();
  modalCancel = new EventEmitter<string | MaterializeAction>();

  errorMessage: string;
  showMessage: boolean = false;

  constructor(
    private router: Router,
    private adquisicionesService: AdquisicionesService
  ) { }

  ngOnInit() {
    // Crear el nuevo objeto de adquisición
    this.adquisicion = new NuevaAdquisicion;
    this.adquisicion.ejemplares = new Array<NuevoEjemplar>();
  }

  // Método: onNotify
  // Objetivo: Escuchar al evento emitido por el componente libro-seleccion
  onNotify(libro: Libro){
    let nuevo: boolean = true;

    this.adquisicion.ejemplares.forEach((e) => {
      if(e.libro.isbn === libro.isbn) nuevo = false;
    });

    if(nuevo){
      let ejemplar = new NuevoEjemplar;
      ejemplar.libro = libro;
      ejemplar.cantidad = 1;
      this.adquisicion.ejemplares.push(ejemplar);

      Materialize.toast("'" + libro.titulo + "' agregado a la adquisición", 3000);
    }
  }

  // Método: eliminarEjemplar
  // Objetivo: eliminar un ejemplar de la tabla de ejemplares a crear.
  eliminarEjemplar(ejemplar: NuevoEjemplar){
    let i = this.adquisicion.ejemplares.indexOf(ejemplar);
    if(i > -1) this.adquisicion.ejemplares.splice(i, 1);
  }

  // Método: crear
  // Objetivo: crear una nueva adquisición, por donación o compra.
  crear(){
    // Mostrar mensajes.
    this.showMessage = true;
    this.errorMessage = null;

    // Llamar al servicio
    this.adquisicionesService.crear(this.adquisicion).subscribe(
      message => {
        this.showMessage= false;
        Materialize.toast("Adquisición creada", 3000);
        this.router.navigate(['/adquisiciones']);
      },
      error => {
        this.showMessage= false;
        this.errorMessage = "Error al crear la adquisición";
      }
    );
  }

  // Métodos para el manejo de la ventana modal de selección de libros.
  openSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['open'] });
  }
  closeSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['close'] });
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
    this.router.navigate(['/adquisiciones']);
  }
}
