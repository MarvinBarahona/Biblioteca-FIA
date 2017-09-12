/*
*Nombre del módulo: Gestión de adquisiciones
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

  constructor(private router: Router) { }

  ngOnInit() {
    this.adquisicion = new NuevaAdquisicion;
    this.adquisicion.ejemplares = new Array<NuevoEjemplar>();
  }

  onNotify(libro: Libro){
    let nuevo: boolean = true;

    this.adquisicion.ejemplares.forEach( function(e){
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

  eliminarEjemplar(ejemplar: NuevoEjemplar){
    let i = this.adquisicion.ejemplares.indexOf(ejemplar);
    if(i > -1) this.adquisicion.ejemplares.splice(i, 1);
  }

  openSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['open'] });
  }
  closeSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['close'] });
  }

  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }
}
