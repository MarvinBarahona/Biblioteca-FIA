/*
*Nombre del componente: sugerencia
*Dirección física: src/app/sugerencias/componentes/sugerencia.component.ts
*Objetivo: Mostrar el detalle de una sugerencia.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

// import {  } from './../servicios';

@Component({
  templateUrl: './sugerencia.component.html',
  styles: [`
    .modal{
      height: 300px;
      width: 500px;
    }
  `]
})
export class SugerenciaComponent implements OnInit {

  modalAprobar = new EventEmitter<string | MaterializeAction>();
  modalDenegar = new EventEmitter<string | MaterializeAction>();

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  // Métodos para la ventana modal para aprobar sugerencia
  openAprobar() {
    this.modalAprobar.emit({action:"modal",params:['open']});
  }
  closeAprobar() {
    this.modalAprobar.emit({action:"modal",params:['close']});
  }

  // Método: aprobar
  // Objetivo: Aprobar el ejemplar.
  aprobar(){
    this.closeAprobar();
  }

  // Métodos para la ventana modal para denegar sugerencia
  openDenegar() {
    this.modalDenegar.emit({action:"modal",params:['open']});
  }
  closeDenegar() {
    this.modalDenegar.emit({action:"modal",params:['close']});
  }

  // Método: denegar
  // Objetivo: Denegar sugerencia.
  denegar(){
    this.closeDenegar();
  }
}
