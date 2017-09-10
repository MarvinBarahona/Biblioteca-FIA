/*
*Nombre del módulo:
*Dirección física:
*Objetivo:
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

@Component({
  templateUrl: './adquisicion-nueva.component.html'
})
export class AdquisicionNuevaComponent implements OnInit {

  modalSeleccion = new EventEmitter<string | MaterializeAction>();
  modalCancel = new EventEmitter<string|MaterializeAction>();

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

  ngOnInit() {
  }

}
