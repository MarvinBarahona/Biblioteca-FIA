/*
*Nombre del módulo: Gestión de ejemplares
*Dirección física: src\app\ejemplares\componentes\ejemplar-nuevo.component.ts
*Objetivo: Crear un nuevo ejemplar
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
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

  constructor(private router: Router){}

  ngOnInit() {
    this.ejemplar = new NuevoEjemplar;
    this.ejemplar.libro = new Libro;
  }

  onNotify(libro: Libro): void {
    this.ejemplar.libro = libro;
    Materialize.toast("'" + libro.titulo + "' asignado al nuevo ejemplar", 3000);
  }

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
}
